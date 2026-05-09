//Con esto unimos por medio de importación a todos JS para que puedan funcionar
import { Cuadrado, Linea, Sticker, Circulo, Rombo, Pincel, Borrador } from "./figuras.js";
import { colorLinea, colorRelleno, grozorLinea } from "./estilos.js";
import { configurarBotones } from "./herramientas.js";
import { configurarFiltros } from "./filtros.js";

//Todaaas estas de aquí son las variables principales 
const canvas = document.querySelector("#lienzo");
const ctx = canvas.getContext("2d");

let elementos = []; //Guarda los avances del dibujo
let elementoActual = null; //muestra los avances actuales del dibujo
let presionado = false; //detecta el mouse
let imagenSeleccionada = null; //esto de aquí guarda la imagen para el sticker
//Esto es una configuración inicial, el de filtros los prepará para que se puedan usar y el de "configurarBotones" es para conectar a los mismos botones
const obtenerFiltroActivo = configurarFiltros(canvas, ctx);
configurarBotones(canvas, ctx, elementos);

//Estas herramientas no están activas porque solo una a la vez se van ir activando
const opciones = {
    pincel: false,
    linea: false,
    circulo: false,
    cuadro: false,
    rombo: false,
    borrador: false,
    sticker: false,
};

//Es para que el mouse inicie en cero y pueda ir haciendo las figuras
const posicionesCursor = {
    iniciales: { x: 0, y: 0 },
    finales: { x: 0, y: 0 }
};

//Esto nos ayuda  a que no se repitan o junten las herramientas
function copiarPosiciones(pos) {
    return {
        iniciales: { x: pos.iniciales.x, y: pos.iniciales.y },
        finales: { x: pos.finales.x, y: pos.finales.y }
    };
}

document.querySelector("#btn_pincel").addEventListener("click", () => cambiarOpcion("pincel"));
document.querySelector("#btn_linea").addEventListener("click", () => cambiarOpcion("linea"));
document.querySelector("#btn_cuadro").addEventListener("click", () => cambiarOpcion("cuadro"));
document.querySelector("#btn_circulo").addEventListener("click", () => cambiarOpcion("circulo"));
document.querySelector("#btn_rombo").addEventListener("click", () => cambiarOpcion("rombo"));
document.querySelector("#btn_sticker").addEventListener("click", () => {
    cambiarOpcion("sticker");
    document.querySelector("#archivo").click();
});
document.querySelector("#btn_borrador").addEventListener("click", () => cambiarOpcion("borrador"));

// Esta funciona trabajando junto a "copiarPosiciones" para apagar las herramientas que no se usan
function cambiarOpcion(opcion) {
    for (let clave in opciones) opciones[clave] = false;
    opciones[opcion] = true;
}

//Es para seleccionar la foto y que se pueda usar
const inputArchivo = document.querySelector("#archivo");
inputArchivo.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
        imagenSeleccionada = event.target.result;
    };
    reader.readAsDataURL(file);
});

//Son los eventos que vamos a usar en el mouse para que sea funcionable 
canvas.addEventListener("mousedown", alPresionarClick);
canvas.addEventListener("mousemove", mientrasPrecionaClick);
canvas.addEventListener("mouseup", alSoltarClick);

//Guarda la posición inicial y hace funcionar al pincel y al borrador
function alPresionarClick(event) {
    posicionesCursor.iniciales.x = event.offsetX;
    posicionesCursor.iniciales.y = event.offsetY;
    presionado = true;

    if (opciones.pincel) {
        elementoActual = new Pincel(colorLinea, grozorLinea < 1 ? 1 : grozorLinea);
        elementoActual.agregarPunto(event.offsetX, event.offsetY);
    }
    else if (opciones.borrador) {
        elementoActual = new Borrador(grozorLinea < 1 ? 1 : grozorLinea);
        elementoActual.agregarPunto(event.offsetX, event.offsetY);
    }
    else {
        elementoActual = null;
    }
}

//Esta actualiza la posición, y hace funcionar a las demás figuras
function mientrasPrecionaClick(event) {
    if (!presionado) return;

    posicionesCursor.finales.x = event.offsetX;
    posicionesCursor.finales.y = event.offsetY;

    RenderizarElementos();

    if (opciones.pincel || opciones.borrador) {
        elementoActual.agregarPunto(event.offsetX, event.offsetY);
        elementoActual.Dibujar(ctx);
    } else {
        let preview = null;

        if (opciones.linea) preview = new Linea(copiarPosiciones(posicionesCursor), colorLinea, grozorLinea);
        else if (opciones.cuadro) preview = new Cuadrado(copiarPosiciones(posicionesCursor), colorLinea, colorRelleno, grozorLinea);
        else if (opciones.circulo) preview = new Circulo(copiarPosiciones(posicionesCursor), colorLinea, colorRelleno, grozorLinea);
        else if (opciones.rombo) preview = new Rombo(copiarPosiciones(posicionesCursor), colorLinea, colorRelleno, grozorLinea);
        else if (opciones.sticker && imagenSeleccionada) {
            preview = new Sticker(
                copiarPosiciones(posicionesCursor),
                imagenSeleccionada
            );
        }

        if (preview) preview.Dibujar(ctx);
    }
}

//Termine de agregar la figura por ejemplo al soltar click y lo muestra en el canvas
function alSoltarClick(event) {
    presionado = false;

    posicionesCursor.finales.x = event.offsetX;
    posicionesCursor.finales.y = event.offsetY;

    if (opciones.pincel || opciones.borrador) {
        elementos.push(elementoActual);
    }
    else if (opciones.linea) {
        elementos.push(new Linea(copiarPosiciones(posicionesCursor), colorLinea, grozorLinea));
    }
    else if (opciones.cuadro) {
        elementos.push(new Cuadrado(copiarPosiciones(posicionesCursor), colorLinea, colorRelleno, grozorLinea));
    }
    else if (opciones.circulo) {
        elementos.push(new Circulo(copiarPosiciones(posicionesCursor), colorLinea, colorRelleno, grozorLinea));
    }
    else if (opciones.rombo) {
        elementos.push(new Rombo(copiarPosiciones(posicionesCursor), colorLinea, colorRelleno, grozorLinea));
    }
    else if (opciones.sticker && imagenSeleccionada) {
        elementos.push(
            new Sticker(
                copiarPosiciones(posicionesCursor),
                imagenSeleccionada
            )
        );
    }

    elementoActual = null;
    RenderizarElementos();
}

//Hace que todo se visualice bien según las herramientas que se han usado
function RenderizarElementos() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let el of elementos) {
        el.Dibujar(ctx);
    }

    const filtroActivo = obtenerFiltroActivo();
    if (filtroActivo) {
        const filtro = filtroActivo();
        if (filtro) {
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imgData.data;

            for (let i = 0; i < data.length; i += 4) {
                const [r, g, b, a] = filtro(
                    data[i],
                    data[i + 1],
                    data[i + 2],
                    data[i + 3]
                );

                data[i] = r;
                data[i + 1] = g;
                data[i + 2] = b;
                data[i + 3] = a;
            }

            ctx.putImageData(imgData, 0, 0);
        }
    }
}

//Deja limpio el canva
function Limpiar() {
    elementos = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/**filtros color rojo
 
   const imgData = ctx.getImageData(0, 0, canvas.clientWidth, canvas.clientHeight);
   const data = imgData.data;
   for (let i = 0; i < data.length; i += 4) {
       let rojo = data[i] // rojo
       let verde = data[i + 1] //verde
       let azul = data[i + 2] //azul
       let alfa = data[i + 3] //transparencia
 
       data[i] = rojo + 50;
       data[i + 1] = verde * .8;
       data[i + 2] = azul * .8;
       data[i + 3] = alfa;
   }
 
   ctx.putImageData(imgData, 0, 0) */