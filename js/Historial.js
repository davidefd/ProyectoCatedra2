
const cuadro = document.getElementById('historial'); //Variable para mostrar los registros en la página HTML.
const nombre = document.getElementById('nombre');
const noCueta = document.getElementById('noCuenta');

//Variable que almacena los registros de localStorage.
const usuario = JSON.parse(localStorage.getItem("Usuario"));

nombre.innerHTML = `<a href="#">${usuario.nombre}</a>`;
noCueta.innerHTML = `<a href="#">No ${usuario.noCuenta}</a>`;

const mostrarHistorial = () => {

    cuadro.innerHTML = '';

    usuario.zIngreso.forEach(element => {

        cuadro.innerHTML += `
            <div class="alert alert-primary carta" role="alert">
            <p><b>Ingreso de saldo: </b>$${element.ingreso.toFixed(2)}</p>
            <p><b>${element.fechaFormato}</b></p>
            </div>
            `;
    });

    usuario.zRetiro.forEach(element => {
    
        cuadro.innerHTML += `
            <div class="alert alert-primary carta" role="alert">
            <p><b>Retiro de saldo: </b>$${element.retiro.toFixed(2)}</p>
            <p><b>${element.fechaFormato}</b></p>
            </div>
            `;
    });

    usuario.zAgua.forEach(element => {

        cuadro.innerHTML += `
            <div class="alert alert-primary carta" role="alert">
            <p><b>Pago de agua: </b>$${element.pago.toFixed(2)}</p>
            <p><b>${element.fechaFormato}</b></p>
            </div>
            `;
    });

    usuario.zLuz.forEach(element => {

        cuadro.innerHTML += `
            <div class="alert alert-primary carta" role="alert">
            <p><b>Pago de luz: </b>$${element.pago.toFixed(2)}</p>
            <p><b>${element.fechaFormato}</b></p>
            </div>
            `;
    });

    usuario.zInternet.forEach(element => {

        cuadro.innerHTML += `
            <div class="alert alert-primary carta" role="alert">
            <p><b>Pago de internet: </b>$${element.pago.toFixed(2)}</p>
            <p><b>${element.fechaFormato}</b></p>
            </div>
            `;
    });

    usuario.zTelefono.forEach(element => {

        cuadro.innerHTML += `
            <div class="alert alert-primary carta" role="alert">
            <p><b>Pago de teléfono: </b>$${element.pago.toFixed(2)}</p>
            <p><b>${element.fechaFormato}</b></p>
            </div>
            `;
    });   
}

document.addEventListener('DOMContentLoaded', mostrarHistorial);