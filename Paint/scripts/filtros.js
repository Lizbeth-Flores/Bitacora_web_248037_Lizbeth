//Es la funcion principal que exporta los botones que harán funcionar a los filtros
export function configurarFiltros(canvas, ctx) {
    const btnBlancoNegro = document.querySelector("#blancoNegro");
    const btnRojos = document.querySelector("#rojos");
    const btnVerdes = document.querySelector("#verdes");
    const btnAzul = document.querySelector("#azul");
    const btnSepia = document.querySelector("#sepia");

    let filtroActivo = null;

    //Esta funcion de aquí es la que se va a encargar de aplicar cada uno de los filtros
    function aplicarFiltro(callback) {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
            let r = data[i];
            let g = data[i + 1];
            let b = data[i + 2];
            let a = data[i + 3];

            const [nr, ng, nb, na] = callback(r, g, b, a);

            data[i] = nr;
            data[i + 1] = ng;
            data[i + 2] = nb;
            data[i + 3] = na;
        }

        ctx.putImageData(imgData, 0, 0);
    }

    //Apartir de aquí cada botón aplica cada uno de los filtros, adempas estan configurados por el color
    btnBlancoNegro.addEventListener("click", () => {
        filtroActivo = (r, g, b, a) => {
            const gris = (r + g + b) / 3;
            return [gris, gris, gris, a];
        };
        aplicarFiltro(filtroActivo);
    });

    btnRojos.addEventListener("click", () => {
        filtroActivo = (r, g, b, a) => [r + 50, g * 0.8, b * 0.8, a];
        aplicarFiltro(filtroActivo);
    });

    btnVerdes.addEventListener("click", () => {
        filtroActivo = (r, g, b, a) => [r * 0.8, g + 50, b * 0.8, a];
        aplicarFiltro(filtroActivo);
    });

    btnAzul.addEventListener("click", () => {
        filtroActivo = (r, g, b, a) => [r * 0.8, g * 0.8, b + 50, a];
        aplicarFiltro(filtroActivo);
    });

    btnSepia.addEventListener("click", () => {
        filtroActivo = (r, g, b, a) => {
            const nuevoRojo = (r * 0.393) + (g * 0.769) + (b * 0.189);
            const nuevoVerde = (r * 0.349) + (g * 0.686) + (b * 0.168);
            const nuevoAzul = (r * 0.272) + (g * 0.534) + (b * 0.131);
            return [nuevoRojo, nuevoVerde, nuevoAzul, a];
        };
        aplicarFiltro(filtroActivo);
    });

    return () => filtroActivo;
}