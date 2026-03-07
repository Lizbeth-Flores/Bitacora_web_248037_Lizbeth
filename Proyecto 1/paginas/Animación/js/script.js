const boton = document.getElementById("boton");
const tarjeta = document.getElementById("tarjeta");
const formulario = document.getElementById("formulario");

boton.addEventListener("click", () => {
    tarjeta.style.transform = "rotate(45deg) translateY(300px)";
    tarjeta.style.opacity = "0";
    formulario.style.transform = "rotate(-45deg) translateY(300px)";
    formulario.style.opacity = "0";
});