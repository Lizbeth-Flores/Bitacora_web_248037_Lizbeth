//Estás dos constantes guardan las referencias de los formularios
const formInicio = document.getElementById("formInicio");
const formRegistro = document.getElementById("formRegistro");

//Aquí esta el local storage que guarda a los usuarios que se vayan registrando
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

//En la clase usuario sirve para saber que datos guardan dentro del registro
class Usuario {
    constructor(nombre, apellido, correo, contraseña) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.contraseña = contraseña;
    }
}

//Aquí esta la primera función que esta intregada al segundo botón del formulario del Inicio de sesión. 
//Ayuda a ir a la página secundaria y también guarda los datos y los pone en el local storage
function leerDatos() {
    const datosForm = new FormData(formInicio);

    const datos = Object.fromEntries(datosForm.entries());

    //Parte del funcionamiento del local storage
    const usuario = usuarios.find(
        u => u.correo === datos.correo && u.contraseña === datos.contraseña
    );

    //Este if-else es para mostar los mensajes en la pantalla según sea el caso 
    if (usuario) {
        localStorage.setItem("usuarioLogeado", JSON.stringify(usuario));
        alert("Sesión iniciada correctamente");
        window.location.href = "página/indexFetch.html"; //Te lleva a la segunda página
    } else {
        alert("Correo o contraseña incorrectos"); //No se llenaron todos los datos :(
    }
}

//Esto de aquí va a ocultar el formulario de inicio y mostrará el otro
function irRegistro() {
    formInicio.style.display = "none";
    formRegistro.style.display = "block";
}

//Y todo lo contrario, este oculta el formulario de registro y muestra el otro 
function volverInicio() {
    formRegistro.style.display = "none";
    formInicio.style.display = "block";
}

//Esta es la otra función que esta ligada al tercer botón que tiene dos funciones. 
function registrarUsuario() {
    const datosForm = new FormData(formRegistro);
    const datos = Object.fromEntries(datosForm.entries());

    //Se asegura que el usuario se haya registrado bien 
    if (datos.contraseñaRegistro !== datos.contraseñaConfirmar) {
        alert("Las contraseñas no son iguales");
        return;
    }
    //Y guarda sus datos en el local storage
    const nuevoUsuario = new Usuario(
        datos.nombre,
        datos.apellido,
        datos.correoRegistro,
        datos.contraseñaRegistro,
        datos.contraseñaConfirmar
    );

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    //Te regresa al formulario de inicio 
    alert("Usuario registrado con éxito. Ahora inicia sesión.");
    volverInicio();
}

//Integrar al formulario de Inicio de sesión y registro:
// -Una petición usando Fetch a cualquier api que elijan (No la pokeapi)
// -Que la información de la petición se muestre una vez que el usuario haya usado sesión