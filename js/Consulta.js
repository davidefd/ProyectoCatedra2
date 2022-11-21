const nombre = document.getElementById('nombre');
const noCueta = document.getElementById('noCuenta');

//Variable para mostrar el saldo actual en HTML.
var elemento = document.getElementById('consulta');

//Variable que almacena los registros de localStorage.
const usuario = JSON.parse(localStorage.getItem("Usuario"));

nombre.innerHTML = `<a href="#">${usuario.nombre}</a>`;
noCueta.innerHTML = `<a href="#">No ${usuario.noCuenta}</a>`;

elemento.innerHTML = `<h3 class="m-3 text-center">Saldo corriente : $${usuario.saldoInicial.toFixed(2)}</h3>`;

