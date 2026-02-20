let elementoUno = document.querySelector("#elementoUno");
let elementoDos = document.querySelector("#elementoDos");
let elementoTres = document.querySelector("#elementoTres");
let elementoCuatro = document.querySelector("#elementoCuatro");
let elementoCinco = document.querySelector("#elementoCinco")
const perrito = document.querySelector("#perrito");
const texto = document.querySelector("#elementoDos h1");
const SegundoPerrito = document.querySelector("#elementoTres img");
const textoCuatro = document.querySelector("#elementoCuatro h2");
const PrimerPerrito = document.querySelector("#elementoCinco img");

window.addEventListener("scroll", (event) => {
    perrito.style.right = window.scrollY * .5 + "px";
})

elementoDos.addEventListener("click", () => {
    elementoDos.style.backgroundColor = "lightblue";
    elementoDos.style.transform = "scale(1.2)";
});

window.addEventListener("load", () => {
    elementoTres.style.border = "5px solid orange";
});

elementoCuatro.addEventListener("mousemove", (event) => {
    elementoCuatro.style.transform = `translateX(${event.clientX * 0.05}px)`;
});

window.addEventListener("scroll", () => {
    elementoCinco.style.transform = `rotate(${window.scrollY * 0.1}deg)`;
});