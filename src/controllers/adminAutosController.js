const { autos, sucursales, writeJsonAutos } = require("../data");
const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");

module.exports = {
	all: (req, res) => {
		res.render("admin/adminAutos", {
			title: "Admin autos",
			autos,
		});
	},
	formCreate: (req, res) => {
		res.render("admin/agregarAuto", {
			title: "agregar Auto",
			sucursales,
		});
	},
	create: (req, res) => {
		let errors = validationResult(req);
		if (errors.isEmpty()) {
			let lastId = 0;
			autos.forEach((auto) => {
				if (auto.id > lastId) {
					lastId = auto.id;
				}
			});
			const newAuto = {
				id: lastId + 1,
				...req.body,
				sucursal : +req.body.sucursal,
				imagen: req.files.length !== 0 ? req.files.map(file => file.filename) : ["default-image.png"],
			};
			autos.push(newAuto);
			writeJsonAutos(autos);
			res.redirect(`/admin/autos#${newAuto.id}`);
		} else {
			if (req.files) {
				req.files.forEach(file => {
					fs.unlinkSync(
						path.join(__dirname, "../../public/images", file.filename)
					);
				})
			}
			res.render("admin/agregarAuto", {
				title: "agregar Auto",
				sucursales,
				errors: errors.mapped(),
				old: req.body,
				oldImage: req.files
			});
		}
	},
	editForm: (req, res) => {
		const { id } = req.params;
		const auto = autos.find((auto) => auto.id === +id);
		const sucursalAuto = sucursales.find(
			(sucursal) => sucursal.id == auto.sucursal
		);
		if (!auto) {
			return res.send("Nop existe ese auto");
		}
		res.render("admin/editAuto", {
			auto,
			sucursales,
			sucursalAuto,
			title: auto.nombre,
		});
	},
	edit: (req, res) => {
		let errors = validationResult(req);
		if (errors.isEmpty()) {
		const { id } = req.params;
		const { marca, modelo, anio, color, sucursal } = req.body;
		let auto = autos.find((auto) => auto.id === +id);
		//eliminar imagen anterior
		if (req.files) {
			auto.imagen.forEach(image => {
				if (
					fs.existsSync(
						path.join(__dirname, "../../public/images", image)
					) &&
					image != "default-image.png"
				) {
					fs.unlinkSync(
						path.join(__dirname, "../../public/images", image)
					);
				}
			})
		}

		autos.forEach( auto => {
			if (auto.id === +id) {
				auto.marca = marca,
				auto.modelo = modelo,
				auto.anio = anio,
				auto.color = color,
                auto.sucursal = +sucursal,
				auto.imagen = req.files.length !== 0 ? req.files.map(file => file.filename) : auto.imagen
			}
		});
		writeJsonAutos(autos);
		res.redirect(`/admin/autos#${auto.id}`);
	} else {
		if (req.files) {
			req.files.forEach(({filename}) => {
				fs.unlinkSync(
					path.join(__dirname, "../../public/images", filename)
				);
			})
		}
		const { id } = req.params;
		const auto = autos.find((auto) => auto.id === +id);
		const sucursalAuto = sucursales.find(
			(sucursal) => sucursal.id == auto.sucursal
		);
		if (!auto) {
			return res.send("Nop existe ese auto");
		}
		res.render("admin/editAuto", {
			auto,
			sucursales,
			sucursalAuto,
			title: auto.nombre,
			errors: errors.mapped(),
			old: req.body,
		});
	}
	},
	deleteAuto: (req, res) => {
        const { id } = req.params;
        
        let auto = autos.find(auto => auto.id === +id)
		auto.imagen.forEach(image => {
			if (
				fs.existsSync(
					path.join(__dirname, "../../public/images", image)
				) &&
				image != "default-image.png"
			) {
				fs.unlinkSync(
					path.join(__dirname, "../../public/images", image)
				);
			}
		})

        let autoAEliminar = autos.indexOf(auto)
        autos.splice(autoAEliminar, 1)
        writeJsonAutos(autos)
        res.redirect(`/admin/autos#${auto.id - 1}`)
    },
};
