const qs = (element) => document.querySelector(element);

window.addEventListener("load", () => {
	let registro = qs("#registro");
	let nombre = qs("#nombre");
	let apellido = qs("#apellido");
	let email = qs("#email");
	let pass = qs("#pass");
	let pass2 = qs("#pass2");
	let regExEmail =
		/^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
	let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;

	nombre.addEventListener("blur", () => {
		switch (true) {
			case nombre.value.length == 0:
				errorNombre.innerHTML = "El campo nombre es obligatorio";
				nombre.classList.add("is-invalid");
				break;
			case nombre.value.length <= 2:
				errorNombre.innerHTML = "El campo nombre debe tener al menos 3 letras";
				nombre.classList.add("is-invalid");
				break;
			default:
				nombre.classList.remove("is-invalid");
				nombre.classList.add("is-valid");
				errorNombre.innerHTML = "";
				break;
		}
	});
	apellido.addEventListener("blur", () => {
		switch (true) {
			case apellido.value.length == 0:
				errorApellido.innerHTML = "El campo apellido es obligatorio";
				apellido.classList.add("is-invalid");
				break;
			case apellido.value.length <= 2:
				errorApellido.innerHTML =
					"El campo apellido debe tener al menos 3 letras";
				apellido.classList.add("is-invalid");
				break;
			default:
				apellido.classList.remove("is-invalid");
				apellido.classList.add("is-valid");
				errorApellido.innerHTML = "";
				break;
		}
	});
	email.addEventListener("blur", () => {
		switch (true) {
			case email.value.length == 0:
				errorEmail.innerHTML = "El campo email es obligatorio";
				email.classList.add("is-invalid");
				break;
			case !regExEmail.test(email.value):
				errorEmail.innerHTML = "Debes escribir un mail válido";
				email.classList.add("is-invalid");
				break;
			default:
				email.classList.remove("is-invalid");
                email.classList.add("is-valid");
				errorEmail.innerHTML = "";
				break;
		}
	});
	email.addEventListener("blur", () => {
		fetch("http://localhost:3000/apis/users")
			.then((response) => response.json())
			.then((result) => {
				result.users.forEach((element) => {
					if (email.value === element.email) {
						errorEmail.innerHTML = "email ya registrado";
						email.classList.add("is-invalid");
					}
				});
			});
	});
	pass.addEventListener("blur", () => {
		switch (true) {
			case pass.value.length == "":
				errorPass.innerHTML = "El campo contraseña es obligatorio";
				pass.classList.add("is-invalid");
				break;
			case !regExPass.test(pass.value):
				errorPass.innerHTML =
					"El campo contraseña debe tener: entre 6 y 12 caracteres, al menos 1 mayúscula, una minúscula y un número";
				pass.classList.add("is-invalid");
				break;
			default:
				pass.classList.remove("is-invalid");
				pass.classList.add("is-valid");
				errorPass.innerHTML = "";
				break;
		}
	});
	pass.addEventListener('change', () => {
        if(pass.value != pass2.value){
            errors = true
            errorPass2.innerHTML = "Las contraseñas no coinciden"
            pass2.classList.add('is-invalid')
        }
    })
	pass2.addEventListener("blur", () => {
		switch (true) {
			case pass2.value.length == "":
				errorPass2.innerHTML = "El campo contraseña es obligatorio";
				pass2.classList.add("is-invalid");
				errores = true;
				break;
			case pass2.value != pass.value:
				errorPass2.innerHTML = "Las contraseñas no coinciden";
				pass2.classList.add("is-invalid");
				errores = true;
				break;
			default:
				pass2.classList.remove("is-invalid");
				pass2.classList.add("is-valid");
				errorPass2.innerHTML = "";
				errores = false;
				break;
		}
	});
	registro.addEventListener("submit", (event) => {
		event.preventDefault();
        let errors = false;
		let elementos = registro.elements;
		for (let i = 0; i < elementos.length - 1; i++) {
			if (
				elementos[i].value == "" ||
				elementos[i].classList.contains("is-invalid")
			) {
				elementos[i].classList.add("is-invalid");
				errorForm.innerHTML = "Revisa los campos en rojo";
				errors = true;
			}
		}
		if (!errors) {
			alert("todo ok");
			registro.submit()
		}
	});
});
