const { Sucursal, Auto, Imagen } = require("../database/models");
const path = require("path");
const fs = require("fs");
const { validationResult } = require("express-validator");

module.exports = {
	all: (req, res) => {
		Sucursal.findAll()
			.then((sucursales) => {
				//return res.send(sucursales)
				res.render("admin/adminSucursales", {
					title: "Admin",
					sucursales,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	},
	formCreate: (req, res) => {
		res.render("admin/agregarSucursal", {
			title: "agregar Sucursal",
		});
	},
	create: (req, res) => {
		const errors = validationResult(req);
		if (errors.isEmpty()) {
			Sucursal.create({
				...req.body,
				imagen: req.file?.filename ?? "default-image.png",
			})
			.then((sucursal) => {
				res.redirect("/admin/sucursales");
			}).catch((error) => console.log(error));
		} else {
			if (req.file) {
				fs.unlinkSync( path.join(__dirname, "../../public/images", req.file.filename))
			}
			res.render("admin/agregarSucursal", {
				title: "agregar Sucursal",
				errors : errors.mapped(),
				old : req.body,
			});
		}
	},
	editForm: (req, res) => {
		const { id } = req.params;
		Sucursal.findByPk(id).then((sucursal) => {
			res.render("admin/editarSucursal", {
				sucursal,
				title: sucursal.nombre,
			});
		});
	},
	edit: (req, res) => {
		const errors = validationResult(req);
		const { id } = req.params;
		if (errors.isEmpty()) {
		Sucursal.findByPk(id)
			.then((sucursal) => {
				if (req.file) {
					if (
						fs.existsSync(
							path.join(__dirname, "../../public/images", sucursal.imagen)
						) &&
						sucursal.imagen != "default-image.png"
					) {
						fs.unlinkSync(
							path.join(__dirname, "../../public/images", sucursal.imagen)
						);
					}
				}
				Sucursal.update(
					{
						...req.body,
						imagen: req.file?.filename ?? sucursal.imagen,
					},
					{
						where: { id },
					}
				).then(() => {
					res.redirect("/admin/sucursales");
				});
			})
			.catch((errFind) => {
				console.log(errFind);
			});
		} else {
			if (req.file) {
				fs.unlinkSync( path.join(__dirname, "../../public/images", req.file.filename))
			}
			Sucursal.findByPk(id).then((sucursal) => {
				res.render("admin/editarSucursal", {
					sucursal,
					title: sucursal.nombre,
					errors : errors.mapped(),
					old : req.body,
				});
			});
		}
	},
	deleteSucursal: (req, res) => {
        const { id } = req.params;
		Auto.findAll({
			where: { sucursalId: req.params.id }, include : ['imagenes'],
		})
		.then((autos) => {
            autos.forEach(auto => {
                auto.imagenes.forEach(({file}) => {
                    if (fs.existsSync(path.join(__dirname, "../../public/images", file)) && file !== "default-image.png"){
                        fs.unlinkSync( path.join(__dirname, "../../public/images", file))
                    }
                    Imagen.destroy({
                        where: { autoId: auto.id },
                    })
                    .then(() => {}).catch(error => console.log(error));
                });
            })
            Auto.destroy({
                where: { sucursalId: id },
            })
            .then(() => {
                Sucursal.findByPk( id )
                    .then((sucursal) => {
                        if (fs.existsSync(path.join(__dirname, "../../public/images", sucursal.imagen)) && sucursal.imagen !== "default-image.png") {
                            fs.unlinkSync(path.join(__dirname, "../../public/images", sucursal.imagen));
                        }
                        Sucursal.destroy({
                            where : { id }
                        })
                        .then(() => {
                            res.redirect("/admin/sucursales");
                        })
                        .catch(err => console.log(err));
                    })
                    .catch(errors => console.log(errors));
            })
            .catch(errors => console.log(errors));
        })
        .catch(error => console.log(error));
	},
};