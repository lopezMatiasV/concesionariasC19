let qs = (selector) => document.querySelector(selector);

window.addEventListener("load", () => {
	let formLogin = qs("#formLogin");
	let email = qs("#email");
	let pass = qs("#pass");
	let errorEmail = qs("#errorEmail");
	let errorPass = qs("#errorPass");
	let regExEmail =
		/^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;

	email.addEventListener("blur", () => {
		switch (true) {
			case email.value.length === 0:
				errorEmail.innerHTML = "Pone un email";
				email.classList.remove("is-valid");
				email.classList.add("is-invalid");
				break;
			case !regExEmail.test(email.value):
				errorEmail.innerHTML = "Pone un email valido";
				email.classList.remove("is-valid");
				email.classList.add("is-invalid");
				break;
			default:
				email.classList.remove("is-invalid");
				email.classList.add("is-valid");
				errorEmail.innerHTML = "";
				break;
		}
	});
	pass.addEventListener("blur", () => {
		switch (true) {
			case pass.value.length === 0:
				errorPass.innerHTML = "Pone un password";
				pass.classList.remove("is-valid");
				pass.classList.add("is-invalid");
				break;
			default:
				pass.classList.remove("is-invalid");
				pass.classList.add("is-valid");
				errorPass.innerHTML = "";
				break;
		}
	});
	formLogin.addEventListener("submit", (event) => {
		let errors = false;
		event.preventDefault();
		let elementos = formLogin.elements;
		for (let i = 0; i < elementos.length - 2; i++) {
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
			formLogin.submit()
		}
	});
});
