const { autos, sucursales, writeJsonAutos } = require("../data");
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
			imagen: req.file ? req.file.filename : "default-image.png",
		};
		autos.push(newAuto);
		writeJsonAutos(autos);
		res.redirect(`/admin/autos#${newAuto.id}`);
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
		const { id } = req.params;
		const { marca, modelo, anio, color, sucursal } = req.body;
		let auto = autos.find((auto) => auto.id === +id);
		//eliminar imagen anterior
		if (req.file) {
			if (
				fs.existsSync(
					path.join(__dirname, "../../public/images", auto.imagen)
				) &&
				auto.imagen != "default-image.png"
			) {
				fs.unlinkSync(
					path.join(__dirname, "../../public/images", auto.imagen)
				);
			}
		}

		autos.forEach( auto => {
			if (auto.id === +id) {
				auto.marca = marca,
				auto.modelo = modelo,
				auto.anio = anio,
				auto.color = color,
                auto.sucursal = +sucursal,
				auto.imagen = req.file?.filename ?? auto.imagen;
			}
		});
		writeJsonAutos(autos);
		res.redirect(`/admin/autos#${auto.id}`);
	},
	deleteAuto: (req, res) => {
        const { id } = req.params;
        
        let auto = autos.find(auto => auto.id === +id)
            if(fs.existsSync(path.join(__dirname, "../../public/images", auto.imagen)) 
            && autos.imagen != "default-image.png" ){
                fs.unlinkSync(path.join(__dirname, "../../public/images", auto.imagen))
            }

        /* const autosAct = autos.filter(auto => auto.id !== +id)
        writeJsonAutos(autosAct) */

        let autoAEliminar = autos.indexOf(auto)
        autos.splice(autoAEliminar, 1)
        writeJsonAutos(autos)
        
        res.redirect(`/admin/autos#${auto.id}`)
    },
};
