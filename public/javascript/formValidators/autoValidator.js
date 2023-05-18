const qs = (element) => document.querySelector(element);

window.addEventListener("load", () => {
	let form = qs("#form");
	let marca = qs("#marca");
	let modelo = qs("#modelo");
	let anio = qs("#anio");
	let color = qs("#color");
	let sucursal = qs("#sucursal");
	let imagen = qs("#inputFile");
	let regExExtensions = /(.jpg|.jpeg|.png|.gif)$/i;

	marca.addEventListener("blur", () => {
		switch (true) {
			case marca.value.length == 0:
				errorMarca.innerHTML = "El campo del marca es obligatorio";
				marca.classList.add("is-invalid");
				break;
			case marca.value.length <= 2:
				errorMarca.innerHTML =
					"El campo marca debe tener al menos 3 caracteres";
				marca.classList.add("is-invalid");
				break;
			default:
				marca.classList.remove("is-invalid");
				marca.classList.add("is-valid");
				errorMarca.innerHTML = "";
				break;
		}
	});
	modelo.addEventListener("blur", () => {
		switch (true) {
			case modelo.value.length == 0:
				errorModelo.innerHTML = "El campo del Modelo es obligatorio";
				modelo.classList.add("is-invalid");
				break;
			case modelo.value.length <= 2:
				errorModelo.innerHTML =
					"El campo Modelo debe tener al menos 3 caracteres";
				modelo.classList.add("is-invalid");
				break;
			default:
				modelo.classList.remove("is-invalid");
				modelo.classList.add("is-valid");
				errorModelo.innerHTML = "";
				break;
		}
	});
	anio.addEventListener("blur", () => {
		switch (true) {
			case anio.value.length == 0:
				errorAnio.innerHTML = "El campo del Año es obligatorio";
				anio.classList.add("is-invalid");
				break;
			case anio.value.length !== 4:
				errorAnio.innerHTML = "Ingrese un valor de 4 dígitos";
				anio.classList.add("is-invalid");
				break;
			default:
				anio.classList.remove("is-invalid");
				anio.classList.add("is-valid");
				errorAnio.innerHTML = "";
				break;
		}
	});
	color.addEventListener("blur", () => {
		switch (true) {
			case color.value.length == 0:
				errorColor.innerHTML = "El campo del Color es obligatorio";
				color.classList.add("is-invalid");
				break;
			case color.value.length <= 2:
				errorColor.innerHTML =
					"El campo Color debe tener al menos 3 caracteres";
				color.classList.add("is-invalid");
				break;
			default:
				color.classList.remove("is-invalid");
				color.classList.add("is-valid");
				errorColor.innerHTML = "";
				break;
		}
	});
	sucursal.addEventListener("blur", () => {
		switch (true) {
			case sucursal.value.length == 0:
				errorSucursal.innerHTML = "Seleccione una sucursal";
				sucursal.classList.add("is-invalid");
				break;
			default:
				sucursal.classList.remove("is-invalid");
				sucursal.classList.add("is-valid");
				errorSucursal.innerHTML = "";
				break;
		}
	});
	imagen.addEventListener("change", () => {
		switch (true) {
			case !regExExtensions.exec(imagen.value):
				errorImagen.innerHTML = "Archivo no permitido";
				imagen.classList.add("is-invalid");
				imagen.value = "";
				break;
			default:
				imagen.classList.remove("is-invalid");
				imagen.classList.add("is-valid");
				errorImagen.innerHTML = "";
				break;
		}
	});
	
	form.addEventListener("submit", (e) => {
		let errors = false;
		e.preventDefault();
		let elementosForm = form.elements;
		for (let i = 0; i < elementosForm.length - 2; i++) {
			if (
				elementosForm[i].value.length == 0 ||
				elementosForm[i].classList.contains("is-invalid")
			) {
				elementosForm[i].classList.add("is-invalid");
				errorForm.innerHTML = "Revisa los campos señalados";
				errors = true;
			}
		}
		if (!errors) {
			errorForm.innerHTML = "";
			alert("Carga realizada correctamente");
			form.submit();
		}
	});
});
