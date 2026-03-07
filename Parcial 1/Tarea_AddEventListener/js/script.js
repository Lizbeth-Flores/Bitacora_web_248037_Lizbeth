let contenido = document.querySelector("#contenedor_contenido");
const boton = document.querySelector("#boton");
const img1 = document.querySelector("#img1");
const img2 = document.querySelector("#img2");
const titulo = document.querySelector("#titulo");

let mostrarimagen1 = true;

boton.addEventListener("click", () => {
    if (mostrarimagen1) {
        img1.style.display = "none";
        img2.style.display = "block";
        mostrarimagen1 = false;
    } else {
        img1.style.display = "block";
        img2.style.display = "none";
        mostrarimagen1 = true;
    }
});

titulo.addEventListener("dblclick", () => {
    titulo.style.color = "white";
});

contenedor.addEventListener("mouseover", () => {
    contenedor.style.border = "3px solid pink";
});

contenedor.addEventListener("mouseout", () => {
    contenedor.style.border = "3px solid gray";
});

