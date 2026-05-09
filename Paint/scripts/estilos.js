//Se exportan las variables que se ven por defaut cuando se entra por primera vez a la página
export let colorLinea = "black";
export let colorRelleno = "white";
export let grozorLinea = 1;
export let lineasActivas = false;

//Aquí estan declarados los botones
const inputsColor = document.querySelectorAll("input[type='color']");
const grozorInput = document.querySelector("#grozor");
const lineasActivasInput = document.querySelector("#lineasActivas");
const noLineasActivasInput = document.querySelector("#noLineasActivas");

//Esto tambipen es para el defaut de l a página 
document.addEventListener("DOMContentLoaded", () => {
    const inputGrosor = document.querySelector("#grozor");

    inputGrosor.value = 1; 
    grozorLinea = 1;
});

//Cambia el color de la linea
inputsColor[0].addEventListener("input", (e) => {
    colorLinea = e.target.value;
});

//Este el de relleno
inputsColor[1].addEventListener("input", (e) => {
    colorRelleno = e.target.value;
});

//Es para el grozor de la linea
grozorInput.addEventListener("input", (e) => {
    grozorLinea = parseInt(e.target.value);
});

//Actualiza el valor de la linea según el canvas
lineasActivasInput.addEventListener("change", () => {
    lineasActivas = true;
});

//Es para fibujar las líneas sin borde
noLineasActivasInput.addEventListener("change", () => {
    lineasActivas = false;
});
