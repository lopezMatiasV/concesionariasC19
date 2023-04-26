const { check, body } = require("express-validator");
const { users } = require("../data");
const bcrypt = require("bcryptjs");

module.exports = [
	check("email")
		.notEmpty()
		.withMessage("Ingresa tu email")
		.bail()
		.isEmail()
		.withMessage("Debes ingresar un email válido"),
	body("email")
		.custom((value) => {
			const user = users.find((user) => user.email === value);
			return user !== undefined;
		})
		.withMessage("Este email no esta registrado"),

	check("pass").notEmpty().withMessage("Ingresa tu password").bail(),
	body("pass")
		.custom((value, { req }) => {
			const user = users.find((user) => user.email === req.body.email);
			//return user.pass === value;
			return bcrypt.compareSync(value, user.pass);
		})
		.withMessage("Pass incorrecto"),
];
