const nombre = document.getElementById('nombre');
const noCueta = document.getElementById('noCuenta');

const usuario = JSON.parse(localStorage.getItem("Usuario"));

nombre.innerHTML = `<a href="#">${usuario.nombre}</a>`;
noCueta.innerHTML = `<a href="#">No ${usuario.noCuenta}</a>`;

//Variable fecha para registrar la fecha de la transacción.
let fecha = new Date();
let fechaFormato = fecha.toLocaleDateString();

//..............ESTE CODIGO ES PARA INGRESAR SALDO..............
document.getElementById('form_deposito').addEventListener('submit', function (e) {

	var ingreso = parseFloat(document.getElementById('deposito').value);

	//Objeto que almacena el ingreso y la fecha de la transacción.
	var item = {
		ingreso,
		fechaFormato
	}

	if (isNaN(ingreso)) {

		swal('Porfavor ingresar cantidad a depositar!!');

	} else {

		ingresarSaldo(item);
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

	e.preventDefault();
	document.getElementById('form_deposito').reset();
});

//Función para agregar saldo y guardarlo en localStorage.
function ingresarSaldo(item) {

	if (localStorage.getItem("Usuario") !== null){
		//SE OBTIENE USUARIO DE LOCALSTORAGE.
		const usuario = JSON.parse(localStorage.getItem("Usuario"));

		usuario.saldoInicial += item.ingreso; //SE SUMA EL INGRESO AL SALDO INICIAL

		usuario.zIngreso.push(item);
		//SE VUELVE A GUARDAR EN LOCALSTORAGE.
		localStorage.setItem('Usuario', JSON.stringify(usuario));

	} 
}

//Función para crear comprobante de ingreso de saldo
function crearPDF(item){

	const tIngreso = item.ingreso.toString();
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
	doc.text("Ingreso de saldo: " + "$" + tIngreso, 10, 70);

	doc.setFontSize(22);
	doc.text("Fecha de ingreso: " + tFecha, 10, 80);

	doc.line(10, 85, 200, 85);

	doc.setFontSize(22);
	doc.text("Saldo actual: " + "$" +tSaldo.toString(), 10, 95);

	doc.save("Comprobante de ingreso.pdf");
}
