const nombre =
    document.querySelector("#input_txt_nombre");
const apellido =
    document.querySelector("#input_txt_apellido");
const boton_guardar =
    document.querySelector("#boton_guardar");

const Usuarios = [
    {
        nombre: "Izzy",
        apellido: "Flores",
        correo: "izzy123@gmail.com",
        constraseña: "1234567890",
    },
    {
        nombre: "Jesús",
        apellido: "Flores",
        correo: "chu123@gmail.com",
        constraseña: "1234567890",
    },
    {
        nombre: "Mateo",
        apellido: "Flores",
        correo: "mateTomate123@gmail.com",
        constraseña: "1234567890",
    },
    {
        nombre: "MeiXiang",
        apellido: "Moreno",
        correo: "mei123@gmail.com",
        constraseña: "1234567890",
    }
];

boton_guardar.addEventListener("click", (e) => {
    e.preventDefault();

    //la forma tradicional y más común de acceder a los ddatos de un formulario es por medio de referenciar los campos que se quieran leer por un id y luego acceder a su valor por medio del .value
    const nuevoNombre = document.querySelector("#input_txt_nombre");
    const nuevoApellido = document.querySelector("#input_txt_apellido");
    const nuevoCorreo = document.querySelector("#input_txt_correo");
    const nuevaContraseña = document.querySelector("#input_txt_contraseña");

    //crea un nuevo objeto usuario
    const usuario = new Usuario(nombre.value,
        apellido.value);
    console.log(usuario);
    //metodod de el objeto document que se 
    //encarga de crear elementos
    const nombre_info = document.createElement("h2");
    nombre_info.textContent = usuario.nombre;
    document.body.appendChild(nombre_info);

    guardarDatos(usuario);

    guardarDatos = () => {
        console.log("modificando funcion")
    };

    guardarDatos();

    Usuarios.push({
        nombre: nuevoNombre.value,
        apellido: nuevoApellido.value,
        correo: nuevoCorreo.value,
        contraseña: nuevaContraseña.value
    })

    console.log(Usuarios)

})

function cambiarNumero(event) {
    const numeroElementos = event.target.value;
    const contenido = document.querySelector("#contenedor_correos");
    contenido.innerHTML = " "; //limpia la etiqueta y su contenido antes de agregar
    for (let i = 1; i <= numeroElementos; i++) {
        //se agrega contenido usando la insercion de html por medio del 
        //innerHTML, que agregara todo lo que esta dentro de htmlAgregar
        //este metodo reemplaza todo o que esta dentro de la etiqueta por 
        //lo nuevo que se quiere agregar

        const htmlAgregar = `<label for="correo-${i}">Ingrese el correo ${i}</label>
            <input type="email" name="correo-${i}" id="correo-${i}">
            <br>`;

        contenido.innerHTML += htmlAgregar;
    }

    //Mi intento jejej
    //nst contenido2 = document.querySelector("#contenedor_contraseñas");
    //contenido.innerHTML = " "; 
    //for (let i = 1; i <= numeroElementos; i++) {
    //  const htmlAgregar = `<label for="contraseñas-${i}">Ingrese la contraseña ${i}</label>
    //    <input type="number" name="contraseña-${i}" id="contraseña-${i}">
    //  <br>`;

    //contenido.innerHTML += htmlAgregar;
    //}
}

//definimos una clase con sus propiedades y metodos.
class Usuario {
    constructor(nom, ape) {
        this.nombre = nom;
        this.apellido = ape;
    }

    MostrarDatos() {
        console.log(`Nombre: ${this.nombre}\n Apellido: ${this.apellido}`);
    }
}

//creando un objeto y lo estamos asignando a una cosntante 
let usuario2 = {
    Nombre: "Izzy",
    Apellido: "Flores",
    Edad: 19,
    MostrarDatos: () => {
        console.log(`Nombre: ${usuario2.Nombre} \nApellido: ${usuario2.Apellido}\nEdad: ${usuario2.Edad}`)
    }
}

//nos permite guardar funciones dentro de una variable o constante
let guardarDatos = (usuario) => {
    //llamamos un metodo definidio en una clase
    usuario.MostrarDatos();
    usuario2.MostrarDatos();
    usuario2.Nombre = "nuevo nombre";
    usuario2.MostrarDatos();
}

document.addEventListener("DOMContentLoaded", () => {
    const contenedor_usuarios = document.querySelector("#contenedor_usuarios");

    for (let i = 0; i < Usuarios.length; i++) {
        const contenedor_usuario = createElement("div");

        contenedor_usuario.id = "contenedor_usuario";

        const nombre = document.createElement("label");
        nombre.textContent = "Nombre";

        const contenidoNombre = document.createElement("span");
        contenidoNombre.textContent = Usuarios[i].nombre;;

        const apellido = document.createElement("label");
        apellido.textContent = "Apellido";

        const contenidoApellido = document.createElement("span");
        contenidoApellido.textContent = Usuarios[i].apellido;

        contenedor_usuario.onclick = (event) => {
            //console.log(Usuarios[i].nombre);
            //event.stopInmediatePropagation();
            const correo = document.createElement("input");
            correo.placeholder = "Ingresa el correo";
            correo.type = "email";

            const contraseña = document.createElement("Input");
            contraseña.placeholder = "Ingresa la contraseña";
            contraseña.type = "password";

            contenedor_usuario.appendChild(correo);
            contenedor_usuario.appendChild(contraseña);

            console.log(Usuarios[i].nombre);
            console.log(Usuarios[i].apellido);
            console.log(Usuarios[i].contraseña);
        }

        contenedor_usuario.appendChild(nombre);
        contenedor_usuario.appendChild(contenidoNombre);
        contenedor_usuario.appendChild(apellido);
        contenedor_usuario.appendChild(contenidoApellido);

        contenedor_usuarios.appendChild(contenedor_usuario);
    }
})