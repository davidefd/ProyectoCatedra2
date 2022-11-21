const nombre = document.getElementById('nombre');
const noCueta = document.getElementById('noCuenta');

const usuario = JSON.parse(localStorage.getItem("Usuario"));

nombre.innerHTML = `<a href="#">${usuario.nombre}</a>`;
noCueta.innerHTML = `<a href="#">No ${usuario.noCuenta}</a>`;

//Variable fecha para registrar la fecha de la transacción.
let fecha = new Date();
let fechaFormato = fecha.toLocaleDateString();

//..............ESTE CODIGO ES PARA RETIRAR SALDO..............
document.getElementById('form_retiro').addEventListener('submit', function (e) {

	var retiro = parseFloat(document.getElementById('retiro').value);

	//Objeto que almacena el retiro y la fecha de la transacción.
	var item = {
		retiro,
		fechaFormato
	}

	if (isNaN(retiro)) {

		swal('Porfavor ingresar cantidad a depositar!!');

	} else {

		retirarSaldo(item);

	}

	e.preventDefault();
	document.getElementById('form_retiro').reset();

});

//Función para retirar saldo y guardarlo en localStorage.
function retirarSaldo(item) {

	if (localStorage.getItem("Usuario") !== null) {

		const usuario = JSON.parse(localStorage.getItem("Usuario"));

		if (item.retiro > usuario.saldoInicial){

			swal('No tienes saldo suficiente');

		} else if (item.retiro == usuario.saldoInicial && usuario.saldoInicial < 4.99){

			swal('Solo puedes retirar cantidades superiores a 5$');

		} else {

			usuario.saldoInicial -= item.retiro; //SE RESTA LA CANTIDAD AL SALDO INICIAL.
			usuario.zRetiro.push(item);

			swal({
			title: "¿Desea imprimir comprobante?",
			buttons: true,
			dangerMode: true,
			})
			.then((value) => {
				if(value) {
					crearPDF(item);
				} else {

				}
			});
		}
		//SE VUELVE A GUARDAR EL USUARIO CON LOS CAMBIOS AL LOCALSTORAGE.
		localStorage.setItem('Usuario', JSON.stringify(usuario)); 

	}
}

//Función para crear comprobante de ingreso de saldo
function crearPDF(item){

	const tRetiro = item.retiro.toString();
	const tFecha = item.fechaFormato.toString();

	const usuario = JSON.parse(localStorage.getItem("Usuario"));
	const tUsuario = usuario.nombre;
	const tNoCuenta = usuario.noCuenta;
	const tSaldo = usuario.saldoInicial.toString();

	var doc = new jsPDF();

	doc.setFontSize(30);
	doc.text("Pokemón Bank", 10, 20);

	doc.setFontSize(30);
	doc.text("Comprobante de transacción", 10, 35);
	doc.line(10, 40, 200, 40);

	doc.setFontSize(22);
	doc.text("Nombre: " + tUsuario.toString(), 10, 50);

	doc.setFontSize(22);
	doc.text("No Cuenta: " + tNoCuenta.toString(), 10, 60);

	doc.setFontSize(22);
	doc.text("Retiro de saldo: " + "$" + tRetiro, 10, 70);

	doc.setFontSize(22);
	doc.text("Fecha de ingreso: " + tFecha, 10, 80);

	doc.line(10, 85, 200, 85);

	doc.setFontSize(22);
	doc.text("Saldo actual: " + "$" +tSaldo.toString(), 10, 95);

	doc.save("Comprobante de retiro.pdf");
}

