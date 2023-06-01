const { Usuario } = require("../database/models");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const sendEmail = require('../helpers/nodemailer')

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
				.then((usuario) => {
					/* Envio de email con nodemailer */
					sendEmail(usuario)
					/* levanto sesion al registrar */
					req.session.user = {
						id: usuario.id,
						nombre: usuario.nombre,
						apellido: usuario.apellido,
						rol: usuario.rol,
						avatar: usuario.avatar,
					};
					res.redirect("/");
				})
				.catch((error) => console.log(error));
		} else {
			res.render("users/register", {
				title: "Registro",
				errors: errors.mapped(),
				old: req.body,
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
				where: { email: req.body.email },
			})
				.then((usuario) => {
					req.session.user = {
						id: usuario.id,
						nombre: usuario.nombre,
						apellido: usuario.apellido,
						rol: usuario.rol,
						avatar: usuario.avatar,
					};
					if (req.body.recordar) {
						res.cookie("concesionarias", req.session.user, { maxAge: 10000 });
					}
					res.redirect("/");
				})
				.catch((error) => console.log(error));
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
	perfil: (req, res) => {
		Usuario.findByPk(req.session.user.id)
			.then((user) => {
				res.render("users/profile", {
					user,
					title: `Perfil de ${user.nombre}`,
				});
			})
			.catch((error) => console.log(error));
	},
	editPerfil: (req, res) => {
		const { id } = req.params;
		Usuario.findByPk(id)
			.then((user) => {
				if (req.file) {
					if (
						fs.existsSync(
							path.join(__dirname, "../../public/images", user.avatar)
						) &&
						user.avatar !== "default-image.png"
					) {
						fs.unlinkSync(
							path.join(__dirname, "../../public/images", user.avatar)
						);
					}
				}
				Usuario.update(
					{
						...req.body,
						avatar: req.file?.filename,
					},
					{
						where: { id },
					}
				)
					.then(() => {
						res.redirect("/users/perfil");
					})
					.catch((err) => console.log(err));
			})
			.catch((error) => console.log(error));
	},
	deleteUser: (req, res) => {
		req.session.destroy();
		if (req.cookies.concesionarias) {
			res.cookie("concesionarias", "", { maxAge: -1 });
		}
		Usuario.findByPk(req.params.id)
			.then((user) => {
				Usuario.destroy({
					where: {
						id: req.params.id,
					},
				})
					.then(() => {
						if (
							fs.existsSync(
								path.join(__dirname, "../../public/images", user.avatar)
							) &&
							user.avatar !== "default-image.png"
						) {
							fs.unlinkSync(
								path.join(__dirname, "../../public/images", user.avatar)
							);
						}
					})
					.catch((error) => console.log(error));
				res.redirect("/");
			})
			.catch((error) => console.log(error));
	},
};
