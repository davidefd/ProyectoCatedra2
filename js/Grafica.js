const nombre = document.getElementById('nombre');
const noCueta = document.getElementById('noCuenta');

const usuario = JSON.parse(localStorage.getItem("Usuario"));

nombre.innerHTML = `<a href="#">${usuario.nombre}</a>`;
noCueta.innerHTML = `<a href="#">No ${usuario.noCuenta}</a>`;

var ctx = document.getElementById("myChart").getContext("2d");

var myChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: ['Depósito', 'Retiro', 'Energía', 'Internet', 'Telefonía', 'Agua'],
        datasets: [{
            label: 'Porcentaje de Transacciones',
            data: [
                mostrarPorcentajeIngreso(), 
                mostrarPorcentajeRetiro(), 
                mostrarPorcentajeLuz(), 
                mostrarPorcentajeInternet(), 
                mostrarPorcentajeTelefono(), 
                mostrarPorcentajeAgua()
            ],
            backgroundColor: [
                'rgb(66, 134, 244)',
                'rgb(74, 135, 72)',
                'rgb(229, 89, 50)',
                'rgb(128, 0, 128)',
                'rgb(234, 190, 63)',
                'rgb(0, 0, 0)'
            ]
        }]
    },
    options: {
        scales:{
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

function mostrarPorcentajeIngreso(){

    var dato1 = 0;
    var dato2 = 0;

    for(let i = 0; i < usuario.zIngreso.length; i++){

        dato1 += usuario.zIngreso[i].ingreso;

    }

    dato2 = dato1 * 0.1;

    return dato2;
}

function mostrarPorcentajeRetiro(){

    var dato1 = 0;
    var dato2 = 0;

    for(let i = 0; i < usuario.zRetiro.length; i++){

        dato1 += usuario.zRetiro[i].retiro;

    }

    dato2 = dato1 * 0.1;

    return dato2;
}

function mostrarPorcentajeAgua(){

    var dato1 = 0;
    var dato2 = 0;

    for(let i = 0; i < usuario.zAgua.length; i++){

        dato1 += usuario.zAgua[i].pago;

    }

    dato2 = dato1 * 0.1;

    return dato2;
}

function mostrarPorcentajeLuz(){

    var dato1 = 0;
    var dato2 = 0;

    for(let i = 0; i < usuario.zLuz.length; i++){

        dato1 += usuario.zLuz[i].pago;

    }

    dato2 = dato1 * 0.1;

    return dato2;
}

function mostrarPorcentajeInternet(){

    var dato1 = 0;
    var dato2 = 0;

    for(let i = 0; i < usuario.zInternet.length; i++){

        dato1 += usuario.zInternet[i].pago;

    }

    dato2 = dato1 * 0.1;

    return dato2;
}

function mostrarPorcentajeTelefono(){

    var dato1 = 0;
    var dato2 = 0;

    for(let i = 0; i < usuario.zTelefono.length; i++){

        dato1 += usuario.zTelefono[i].pago;

    }

    dato2 = dato1 * 0.1;

    return dato2;
}