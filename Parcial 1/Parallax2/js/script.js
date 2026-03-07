const titulo = document.querySelector("#titulo");
const perrito = document.querySelector("#perrito");
const hojas = document.querySelector("#hojas")

window.addEventListener("scroll", (event) => {
    titulo.style.right = window.scrollY * .3 + "px";
    perrito.style.right = window.scrollY * .5 + "px";
    hojas.style.bottom = window.scrollY * .3 + "px"; 
})