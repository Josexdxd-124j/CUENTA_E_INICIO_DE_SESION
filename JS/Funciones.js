const regNombre = /^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$/;
const regCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
const regCelular = /^[0-9]{7,12}$/;

let usuario = JSON.parse(localStorage.getItem("usuario")) || null;
let intentos = Number(localStorage.getItem("intentos")) || 0;
let bloqueado = localStorage.getItem("bloqueado") === "true";
// Función Mostrar/Ocultar Contraseña
function togglePass(id) {
    let campo = document.getElementById(id);
    let ojito = campo.nextElementSibling;
    if(campo.type === "password") {
        campo.type = "text";
        ojito.innerText = "🙈"; 
    } else {
        campo.type = "password";
        ojito.innerText = "👁️"; 
    }
}

function registrar() {
    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("usuario").value;
    let celular = document.getElementById("celular").value;
    let pass = document.getElementById("pass").value;
    if (!regNombre.test(nombre))
        return mostrar("mensaje", "Nombre inválido");
    if (!regCorreo.test(correo))
        return mostrar("mensaje", "Correo inválido");
    if (!regCelular.test(celular))
        return mostrar("mensaje", "Celular inválido");
    if (!regPass.test(pass))
        return mostrar("mensaje", "Contraseña insegura");
    usuario = { nombre, correo, celular, pass };
    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("intentos", 0);
    localStorage.setItem("bloqueado", false);
    mostrar("mensaje", "Usuario registrado correctamente ✔️");
}

function login() {
    if (bloqueado)
        return mostrar("mensajeLogin", "Cuenta bloqueada por intentos fallidos ❌");
    let correo = document.getElementById("loginUsuario").value;
    let pass = document.getElementById("loginPass").value;
    if (!usuario)
        return mostrar("mensajeLogin", "No existe ningún usuario registrado");
    if (correo === usuario.correo && pass === usuario.pass) {
        intentos = 0;
        localStorage.setItem("intentos", 0);
        mostrar("mensajeLogin", `Bienvenido al sistema, ${usuario.nombre} 😄`);
        return;
    }
    intentos++;
    localStorage.setItem("intentos", intentos);
    if (intentos >= 3) {
        bloqueado = true;
        localStorage.setItem("bloqueado", true);
        return mostrar("mensajeLogin", "Cuenta bloqueada por intentos fallidos ❌");
    }
    mostrar("mensajeLogin", "Usuario o contraseña incorrectos");
}

function recuperarClave() {
    let nueva = document.getElementById("nuevaPass").value;
    if (!regPass.test(nueva))
        return mostrar("mensajeRecuperar", "Contraseña insegura ❌");
    usuario.pass = nueva;
    localStorage.setItem("usuario", JSON.stringify(usuario));
    bloqueado = false;
    intentos = 0;
    localStorage.setItem("bloqueado", false);
    localStorage.setItem("intentos", 0);
    mostrar("mensajeRecuperar", "Contraseña actualizada ✔️ Ahora puede iniciar sesión.");
}
function mostrar(id, texto) {
    document.getElementById(id).innerText = texto;
}
