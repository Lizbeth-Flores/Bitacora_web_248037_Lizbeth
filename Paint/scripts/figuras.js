//Es la clase padre para tooodaaaas las figuras, nos sirve para guardar los cambios que pueden ser el color y el grosor de la linea
class Figura {
    constructor(posicionesCursor, color_linea, color_relleno, grozor_linea
    ) {
        this.posicionesCursor = posicionesCursor || {
            iniciales: { x: 0, y: 0 },
            finales: { x: 0, y: 0 }
        }
        this.color_linea = color_linea
        this.color_relleno = color_relleno
        this.grozor_linea = grozor_linea
    }
}

//Aquí se crea la figura del cuadrado, además que permite modificar los colores y el grosor
export class Cuadrado extends Figura {
    constructor(posicionesCursor = {},
        color_linea = "black",
        color_relleno = "black",
        grozor_linea = 1) {

        super(posicionesCursor, color_linea, color_relleno, grozor_linea);

        this.x = Math.min(this.posicionesCursor.iniciales.x, this.posicionesCursor.finales.x)
        this.y = Math.min(this.posicionesCursor.iniciales.y, this.posicionesCursor.finales.y);

        this.alto = Math.abs(this.posicionesCursor.finales.y - this.posicionesCursor.iniciales.y)
        this.ancho = Math.abs(this.posicionesCursor.finales.x - this.posicionesCursor.iniciales.x);

    }
    Dibujar(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color_relleno
        ctx.strokeStyle = this.color_linea
        ctx.lineWidth = this.grozor_linea

        ctx.fillRect(this.x, this.y, this.ancho, this.alto);
        ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
    }
}

//Hace lo mismo que el cuadrado pero usando otro tipo de contexto (ctx)
export class Circulo extends Figura {
    constructor(posicionesCursor, color_linea, color_relleno, grozor_linea) {
        super(posicionesCursor, color_linea, color_relleno, grozor_linea);
        this.x = (this.posicionesCursor.iniciales.x + this.posicionesCursor.finales.x) / 2;
        this.y = (this.posicionesCursor.iniciales.y + this.posicionesCursor.finales.y) / 2;
        this.radio = Math.max(
            Math.abs(this.posicionesCursor.finales.x - this.posicionesCursor.iniciales.x) / 2,
            Math.abs(this.posicionesCursor.finales.y - this.posicionesCursor.iniciales.y) / 2
        );
    }
    Dibujar(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color_relleno;
        ctx.strokeStyle = this.color_linea;
        ctx.lineWidth = this.grozor_linea;
        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
}

//Crea un rombo de manera más similar al cuadrado
export class Rombo extends Figura {
    constructor(posicionesCursor = {},
        color_linea = "black",
        color_relleno = "white",
        grozor_linea = 5) {

        super(posicionesCursor, color_linea, color_relleno, grozor_linea);
    }

    Dibujar(ctx) {
        const x1 = (this.posicionesCursor.iniciales.x + this.posicionesCursor.finales.x) / 2;
        const y1 = this.posicionesCursor.iniciales.y;

        const x2 = this.posicionesCursor.finales.x;
        const y2 = (this.posicionesCursor.iniciales.y + this.posicionesCursor.finales.y) / 2;

        const x3 = (this.posicionesCursor.iniciales.x + this.posicionesCursor.finales.x) / 2;
        const y3 = this.posicionesCursor.finales.y;

        const x4 = this.posicionesCursor.iniciales.x;
        const y4 = (this.posicionesCursor.iniciales.y + this.posicionesCursor.finales.y) / 2;

        ctx.beginPath();
        ctx.fillStyle = this.color_relleno;
        ctx.strokeStyle = this.color_linea;
        ctx.lineWidth = this.grozor_linea;

        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.lineTo(x4, y4);
        ctx.closePath();

        ctx.fill();
        ctx.stroke();
    }
}

//Esta de aquí solo hace una linea recta normal
export class Linea {
    constructor(posicionesCursor = {}, color_linea = "black", grozor_linea = 5) {
        this.posicionesCursor = posicionesCursor || {
            iniciales: { x: 0, y: 0 },
            finales: { x: 0, y: 0 }
        }
        this.color_linea = color_linea
        this.grozor_linea = grozor_linea
    }
    Dibujar(ctx) {
        ctx.beginPath()
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.strokeStyle = this.color_linea
        ctx.lineWidth = this.grozor_linea
        ctx.moveTo(this.posicionesCursor.iniciales.x, this.posicionesCursor.iniciales.y)
        ctx.lineTo(this.posicionesCursor.finales.x, this.posicionesCursor.finales.y)
        ctx.stroke()
    }
}

//Esto es para poder ir agregando el sticker cada que hace click, también hace la imagen chiquita
export class Sticker {
    constructor(posicionesCursor, urlImagen) {
        this.posicionesCursor = posicionesCursor || {
            iniciales: { x: 0, y: 0 },
            finales: { x: 0, y: 0 }
        },
            this.imagen = new Image();
        this.imagen.src = urlImagen;
    }
    Dibujar(ctx) {
        ctx.beginPath()
        ctx.drawImage(this.imagen, 0, 0, this.imagen.width, this.imagen.height,
            this.posicionesCursor.iniciales.x, this.posicionesCursor.iniciales.y, this.imagen.width / 2, this.imagen.height / 2
        )
    }
}

//Crea el pincel y va guardando los trazos
export class Pincel {
    constructor(color_linea = "black", grozor_linea = 5) {
        this.trazos = [];
        this.color_linea = color_linea;
        this.grozor_linea = grozor_linea;
    }
    agregarPunto(x, y) {
        this.trazos.push({ x, y });
    }
    Dibujar(ctx) {
        if (this.trazos.length < 2) return;
        ctx.beginPath();
        ctx.strokeStyle = this.color_linea;
        ctx.lineWidth = this.grozor_linea;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.moveTo(this.trazos[0].x, this.trazos[0].y);
        for (let i = 1; i < this.trazos.length; i++) {
            ctx.lineTo(this.trazos[i].x, this.trazos[i].y);
        }
        ctx.stroke();
    }
}

//Funciona de manera contraria al pincel
export class Borrador {
    constructor(grozor_linea = 20) {
        this.trazos = [];
        this.grozor_linea = grozor_linea;
    }
    agregarPunto(x, y) {
        this.trazos.push({ x, y });
    }
    Dibujar(ctx) {
        if (this.trazos.length < 2) return;

        ctx.save();
        ctx.globalCompositeOperation = "destination-out";

        ctx.beginPath();
        ctx.lineWidth = this.grozor_linea;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.moveTo(this.trazos[0].x, this.trazos[0].y);

        for (let i = 1; i < this.trazos.length; i++) {
            ctx.lineTo(this.trazos[i].x, this.trazos[i].y);
        }

        ctx.stroke();

        ctx.restore();
    }
}