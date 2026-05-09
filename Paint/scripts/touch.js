//Selecciona el canva para realizar lo que sigue
const canvas = document.querySelector("#lienzo");

//En lugar de buscar la posición del mouse, lo va ahacer con el dedo 
function simularMouse(tipo, touchEvent) {
    //Son las coordenadas del canvas en la pantalla
    const rect = canvas.getBoundingClientRect();
    const touch = touchEvent.changedTouches[0];

    //Son la posión relatica del toque dentro del lienzo
    const offsetX = touch.clientX - rect.left;
    const offsetY = touch.clientY - rect.top;

    //Crea los eventos del mouse de una manera falsa, así el programa cree que es el mouse pero en realidad es el dedo
    const mouseEvent = new MouseEvent(tipo, {
        bubbles: true,
        cancelable: true,
        clientX: touch.clientX,
        clientY: touch.clientY
    });

    //Redefine los propiedades para que el evento similado tenga las coordenadas bien.
    Object.defineProperty(mouseEvent, "offsetX", {
        get: () => offsetX
    });

    Object.defineProperty(mouseEvent, "offsetY", {
        get: () => offsetY
    });

    //Envia las simulaciones al canva y lo recibe como si fuera el mouse
    canvas.dispatchEvent(mouseEvent);
}

//Imita los eventos del mouse que estan en el canvas.js pero con el touch
canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    simularMouse("mousedown", e);
});

canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    simularMouse("mousemove", e);
});

canvas.addEventListener("touchend", (e) => {
    e.preventDefault();
    simularMouse("mouseup", e);
});