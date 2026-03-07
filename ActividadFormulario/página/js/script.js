const url = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";

function crearTarjetas(nasa) {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");

    const imagen = document.createElement("img");
    imagen.src = nasa.url;

    const titulo = document.createElement("h2");
    titulo.textContent = nasa.title;

    tarjeta.appendChild(titulo);
    tarjeta.appendChild(imagen);

    document.getElementById("tarjeta").appendChild(tarjeta);
}

fetch(url)
    .then(respuesta => respuesta.json())
    .then(datos => {
        crearTarjetas(datos);
    })
    .catch(error => console.error(error));

function cerrarSesion() {
  localStorage.removeItem("usuarioLogeado");
  alert("Sesión cerrada");
  window.location.href = "../index.html";
}