// Para poder hacer cambios en las imagenes 
const fondo = document.querySelector("#fondo");
const montañas = document.querySelector("#montañas");

window.addEventListener("scroll", () => {
  let scrollY = window.scrollY;

  // Montañas suben hacia arriba con  el scroll
  montañas.style.transform = `translateY(-${scrollY * 0.3}px)`;
});