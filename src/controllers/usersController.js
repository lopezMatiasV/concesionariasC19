const { users, writeJsonUsers } = require("../data");
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
			let lastId = 0;
			users.forEach((user) => {
				if (user.id > lastId) {
					lastId = user.id;
				}
			});
			const { nombre, apellido, email, pass } = req.body;
			const newUser = {
				id : lastId + 1,
				nombre,
				apellido,
				email,
				pass: bcrypt.hashSync(pass, 10),
				avatar: req.file?.filename ?? "default-image.png",
				rol: "user",
			};
			/* levanto sesion al registrar */
			req.session.user = {
				id : newUser.id,
				nombre : newUser.nombre,
				apellido : newUser.apellido,
				rol : newUser.rol,
				avatar : newUser.avatar,
			};

			users.push(newUser);
			writeJsonUsers(users);
			res.redirect("/");
		} else {
            res.send(errors)
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
			const { id, nombre, apellido, rol, avatar } = users.find(
				(user) => user.email === req.body.email
			);

			req.session.user = {
				id,
				nombre,
				apellido,
				rol,
				avatar,
			};
			if (req.body.recordar) {
				res.cookie('concesionarias', req.session.user, { maxAge : 10000} )
			}
			res.redirect("/");
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
