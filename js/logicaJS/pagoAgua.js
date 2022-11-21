
const nombre = document.getElementById('nombre');
const noCueta = document.getElementById('noCuenta');

const usuario = JSON.parse(localStorage.getItem("Usuario"));

nombre.innerHTML = `<a href="#">${usuario.nombre}</a>`;
noCueta.innerHTML = `<a href="#">No ${usuario.noCuenta}</a>`;

//Variable fecha para registrar la fecha de la transacción.
let fecha = new Date();
let fechaFormato = fecha.toLocaleDateString();

document.getElementById('form_agua').addEventListener('submit', function(e){

	var pago = parseFloat(document.getElementById('agua').value);

	//Objeto que almacena el pago y la fecha de la transacción.
	var item = {
		pago,
		fechaFormato
	}

	if (isNaN(pago)) {

		swal('Porfavor ingresar cantidad a depositar!!');

	} else {

		pagarAgua(item);
		
	}

	e.preventDefault();
	document.getElementById('form_agua').reset();
});

//Función para pagar factura de agua y guardarlo en localStorage.
function pagarAgua(item){

	if (localStorage.getItem("Usuario") !== null) {

		const usuario = JSON.parse(localStorage.getItem("Usuario"));

		if (item.pago > usuario.saldoInicial){

			swal('No tienes saldo suficiente');

		} else if (usuario.saldoInicial >= item.pago){

			usuario.saldoInicial -= item.pago; //SE RESTA LA CANTIDAD AL SALDO INICIAL.
			usuario.zAgua.push(item);

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

	const tPago = item.pago.toString();
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
	doc.text("Pago de agua: " + "$" + tPago, 10, 70);

	doc.setFontSize(22);
	doc.text("Fecha de pago: " + tFecha, 10, 80);

	doc.line(10, 85, 200, 85);

	doc.setFontSize(22);
	doc.text("Saldo actual: " + "$" +tSaldo.toString(), 10, 95);

	doc.save("Comprobante de pago.pdf");
}

