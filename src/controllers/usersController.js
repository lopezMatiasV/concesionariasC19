const { users, writeJsonUsers } = require("../data");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

module.exports = {
	register: (req, res) => {
		res.render("users/register", {
			title: "Registro",
			session: req.session,
		});
	},
	processRegister: (req, res) => {
		const errors = validationResult(req);
		if (errors.isEmpty()) {
			const { nombre, apellido, email, pass } = req.body;
			const newUser = {
				nombre,
				apellido,
				email,
				pass: bcrypt.hashSync(pass, 10),
				avatar: req.file?.filename ?? "default-image.png",
				rol: "user",
			};
			users.push(newUser);
			writeJsonUsers(users);
			res.redirect("/users/login");
		} else {
            res.send(errors)
        }
	},
	login: (req, res) => {
		res.render("users/login", {
			title: "Login",
			session: req.session,
		});
	},
	processLogin: (req, res) => {
		const errors = validationResult(req);
		if (errors.isEmpty()) {
			const { nombre, apellido, rol, avatar } = users.find(
				(user) => user.email === req.body.email
			);

			req.session.user = {
				nombre,
				apellido,
				rol,
				avatar,
			};
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
};
