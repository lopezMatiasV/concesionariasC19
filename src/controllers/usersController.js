const { Usuario } = require('../database/models')
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

module.exports = {
	register: (req, res) => {
		res.render("users/register", {
			title: "Registro",
		});
	},
	processRegister: (req, res) => {
		const errors = validationResult(req);
		if (errors.isEmpty()) {
			const { nombre, apellido, email, pass } = req.body;
			Usuario.create({
				nombre,
				apellido,
				email,
				pass: bcrypt.hashSync(pass, 10),
				avatar: req.file?.filename ?? "default-image.png",
				rol: "user",
			})
			.then(usuario => {
				/* levanto sesion al registrar */
				req.session.user = {
					id : usuario.id,
					nombre : usuario.nombre,
					apellido : usuario.apellido,
					rol : usuario.rol,
					avatar : usuario.avatar,
				};
				res.redirect("/");
			})
			.catch(error => console.log(error))
		} else {
            res.render("users/register", {
				title: "Registro",
				errors : errors.mapped(),
				old : req.body,
			});
        }
	},
	login: (req, res) => {
		res.render("users/login", {
			title: "Login",
		});
	},
	processLogin: (req, res) => {
		const errors = validationResult(req);
		if (errors.isEmpty()) {
			
			Usuario.findOne({
				where : {email : req.body.email}
			})
			.then(usuario => {
				req.session.user = {
					nombre: usuario.nombre,
					apellido :usuario.apellido,
					rol : usuario.rol,
					avatar : usuario.avatar,
				};
				if (req.body.recordar) {
					res.cookie('concesionarias', req.session.user, { maxAge : 10000} )
				}
				res.redirect("/");
			})
			.catch(error => console.log(error))
		} else {
			res.render("users/login", {
				title: "Login",
				session: req.session,
				old: req.body,
				errors: errors.mapped(),
			});
		}
	},
	logOut: (req, res) => {
		req.session.destroy();
		res.redirect("/");
	},
	perfil : (req, res) => {
		const user = users.find(user => user.id === req.session.user.id)
		res.render('users/profile', {
			user, 
			title : `Perfil de ${user.nombre}`,
		})
	},
	editPerfil : (req, res) => {
		let { id } = req.params
		let user = users.find(user => user.id == id)
		users.forEach(user => {
			if (user.id == id) {
				user.nombre = req.body.nombre,
				user.apellido = req.body.apellido,
				user.direccion = req.body.direccion,
				user.telefono = req.body.telefono,
				user.avatar = req.file ? req.file.filename : user.avatar
			}
		})
		writeJsonUsers(users);
		res.redirect('/users/perfil');
	}
};
