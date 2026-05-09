//Exporta  los botones para hacerlos funcionar 
export function configurarBotones(canvas, ctx, figuras) {
    const btnlimpiar = document.querySelector("#btnlimpiar");
    const btnguardar = document.querySelector("#btnguardar");
    const btndeshacer = document.querySelector("#btndeshacer");
    const btnrehacer = document.querySelector("#btnrehacer");

    //Esto guarda el historial de los cambios que se van haciendo en el canvas
    const figurasEliminadas = [];

    //Permite poder seleccionar una imagen y también le da un tamaño
    const archivoInput = document.querySelector("#archivo");

    archivoInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {

                ctx.drawImage(img, 50, 50, 200, 200); //Para el tamaño
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });

    //Borra tooooddooo el canva
    if (btnlimpiar) {
        btnlimpiar.addEventListener("click", () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            figuras.length = 0;
        });
    }

    //Permite descargar la imagen del canva
    btnguardar.addEventListener("click", () => {
        const enlace = document.createElement("a");
        enlace.download = "dibujo.png";
        enlace.href = canvas.toDataURL();
        enlace.click();
    });

    //Quita la ultima acción que se hizo en el canva
    btndeshacer.addEventListener("click", () => {
        if (figuras.length > 0) {
            const figuraEliminada = figuras.pop();
            figurasEliminadas.push(figuraEliminada);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            figuras.forEach(figura => figura.Dibujar(ctx));
        }
    });

    //Regresa la ultima acción que se hizo
    btnrehacer.addEventListener("click", () => {
        if (figurasEliminadas.length > 0) {
            const figuraRecuperada = figurasEliminadas.pop();
            figuras.push(figuraRecuperada);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            figuras.forEach(figura => figura.Dibujar(ctx));
        }
    });
}