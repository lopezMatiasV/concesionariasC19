const { check, body } = require("express-validator");
const { Usuario } = require('../database/models')

module.exports = [
    check("nombre")
		.notEmpty()
		.withMessage("Ingresa tu nombre")
		.bail()
		.isLength({min : 3 })
		.withMessage("Debe tener un minimo de 3 caracteres"),
    check("apellido")
		.notEmpty()
		.withMessage("Ingresa tu apellido")
		.bail()
		.isLength({min : 3 })
		.withMessage("Debe tener un minimo de 3 caracteres"),
    check("email")
		.notEmpty()
		.withMessage("Ingresa tu email")
		.bail()
		.isEmail()
		.withMessage("Debes ingresar un email válido"),
	body('email')
        .custom(value => {
            return Usuario.findOne({
                where : { email : value}
            })
            .then(user => {
                if(user){
                    return Promise.reject('el email ya esta registrado')
                }
            })
        }),
    check("pass").notEmpty().withMessage("Ingresa tu password").bail(),
    check("pass2").notEmpty().withMessage("Reingresa tu password").bail()
        .custom((value, {req}) => {
            return value === req.body.pass
        })
        .withMessage('ingresa el mismo que el de arriba')
]