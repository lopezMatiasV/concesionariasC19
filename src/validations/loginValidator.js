const { check, body } = require("express-validator");
const { Usuario } = require("../database/models");
const bcrypt = require("bcryptjs");

module.exports = [
	check("email")
		.notEmpty()
		.withMessage("Ingresa tu email")
		.bail()
		.isEmail()
		.withMessage("Debes ingresar un email válido"),
	check("pass").notEmpty().withMessage("Ingresa tu password").bail(),

	body('email')
        .custom((value, {req}) => {
            return Usuario.findOne({
                where : { email : value}
            })
            .then(usuario => {
                if (!bcrypt.compareSync(req.body.pass, usuario.pass)){
                    return Promise.reject('Credenciales Invalidas')
                }
            })
            .catch(errors => {
                console.log(errors);
                return Promise.reject("Email o contraseña incorrecto")
            })
        }),
];
