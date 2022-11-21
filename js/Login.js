import { usuario } from "./Persona.js";

document.getElementById('form_login').addEventListener('submit', function (e) {

	//Variables para realizar la verificación del usuario.
	var usuar = document.getElementById("username").value;
    var password = document.getElementById("password").value;

	if (
		/*
		Condicion que evalua si no existe registro en localStorage, 
		si no existe registro lo crea la primera vez que usuario ingresa a la aplicación.
		*/
		JSON.parse(localStorage.getItem("Usuario")) === null &&
		usuar === "Ash Ketchum" &&
		password === "1234"

	) {
		swal({
		title: "!Bienvenido!",
		icon: "success",
		})
		.then((value) => {
			if (value) {
				window.location = "Inicio.html";
				localStorage.setItem("Usuario", JSON.stringify(usuario));
			} else {

			}
		});
		
	} else if (

		/*
		Condicion que evalua si existe registro en localStorage, 
		si existe registro permite ingresar al usuario.
		*/
		JSON.parse(localStorage.getItem("Usuario")) !== null &&
		usuar === "Ash Ketchum" &&
		password === "1234"

	) {
		swal({
		title: "!Bienvenido!",
		icon: "success",
		})
		.then((value) => {
			if (value) {
				window.location = "Inicio.html";
			} else {

			}
		});

	} else if (usuar !== "Ash Ketchum" && password === "1234") {

		//Condicion que evalua si nombre de usuario es correcto.
	
		swal("El nombre de usuario es incorrecto, vuelva a intentarlo!!!");

	} else if (usuar === "Ash Ketchum" && password !== "1234") {

		//Condicion que evalua si no PIN es correcto.

		swal("El PIN es incorrecto, vuelva a intentarlo!!!");

	} else if (usuar === "" && password === ""){

		//Condicion que evalua si los campos nombre de usuario y no PIN no esten vacíos. 

		swal("Error, favor ingresar usuario y contraseña!");

	} else if (usuar != "Ash Ketchum" && password != "1234"){

		//Condicion que evalua si nombre de usuario es  y no PIN son correctos.

		swal("El usuario y el PIN no son correctos");

	}
	
	e.preventDefault();
	document.getElementById('form_login').reset();

});



