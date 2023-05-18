const qs = (element) => document.querySelector(element);

window.addEventListener("load", () => {
	let form = qs("#form");
	let nombre = qs("#inputName");
	let direccion = qs("#inputAddress");
	let telefono = qs("#inputTel");
	let imagen = qs("#imagen");
	let regExExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
	let imagePreview = qs("#imagePreview");

	nombre.addEventListener("blur", () => {
		switch (true) {
			case nombre.value.length == 0:
				errorNombre.innerHTML = "El campo del nombre es obligatorio";
				nombre.classList.add("is-invalid");
				break;
			case nombre.value.length <= 2:
				errorNombre.innerHTML =
					"El campo nombre debe tener al menos 3 caracteres";
				nombre.classList.add("is-invalid");
				break;
			default:
				nombre.classList.remove("is-invalid");
				nombre.classList.add("is-valid");
				errorNombre.innerHTML = "";
				break;
		}
	});
	direccion.addEventListener("blur", () => {
		switch (true) {
			case direccion.value.length == 0:
				errorDireccion.innerHTML = "El campo direccion es obligatorio";
				direccion.classList.add("is-invalid");
				break;
			case direccion.value.length <= 6:
				errorDireccion.innerHTML =
					"El campo direccion debe tener al menos 6 caracteres";
				direccion.classList.add("is-invalid");
				break;
			default:
				direccion.classList.remove("is-invalid");
				direccion.classList.add("is-valid");
				errorDireccion.innerHTML = "";
				break;
		}
	});
	telefono.addEventListener("blur", () => {
		switch (true) {
			case telefono.value.length == 0:
				errorTelefono.innerHTML = "El campo del Telefono es obligatorio";
				telefono.classList.add("is-invalid");
				break;
			case telefono.value.length < 8:
				errorTelefono.innerHTML = "Ingrese un valor de minimo 8 dígitos";
				telefono.classList.add("is-invalid");
				break;
			case !Number(telefono.value):
				errorTelefono.innerHTML = "Ingrese un valor numerico";
				telefono.classList.add("is-invalid");
				break;
			default:
				telefono.classList.remove("is-invalid");
				telefono.classList.add("is-valid");
				errorTelefono.innerHTML = "";
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

	imagen.addEventListener("change", () => {
		if (imagen.files && imagen.files[0]) {
			let reader = new FileReader();
			reader.onload = function (e) {
				imagePreview.innerHTML = '<img src="' + e.target.result + '" width="200px" height="200px"/>';
			};
			reader.readAsDataURL(imagen.files[0]);
		} else {
			imagePreview.innerHTML = '';
		}
	});

	form.addEventListener("submit", (e) => {
		let errors = false;
		e.preventDefault();
		let elementosForm = form.elements;
		for (let i = 0; i < elementosForm.length - 2; i++) {
			if (
				elementosForm[i].value == "" ||
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
