const { validationResult } = require("express-validator");
const { Auto, Sucursal, Imagen } = require("../database/models");
const fs = require("fs");
const path = require("path");

module.exports = {
    all : (req, res) => {
        Auto.findAll()
        .then(autos => {
            res.render('admin/adminAutos',{
                autos,
                title : 'Listado de autos'
            })
        }).catch(error => console.log(error));
    },
    formCreate : (req, res) => {
        Sucursal.findAll()
        .then(sucursales => {
            res.render('admin/agregarAuto',{
                sucursales,
                title : 'AgregarAuto'
            })
        })
        .catch(error => console.log(error));
    },
    create : (req, res) => {
        const errors = validationResult(req)
        if(errors.isEmpty()){
            Auto.create({
                ...req.body,
                sucursalId : +req.body.sucursalId,
            })
            .then(auto => {
                if (req.files.length != 0) {
                    let imagenes = req.files.map(({filename}) => {
                        return {
                            file : filename,
                            autoId : auto.id,
                        }
                    })
                    Imagen.bulkCreate(imagenes)
                    .then(() =>{})
                } else {
                    Imagen.create({
                        file : "default-image.png",
                        autoId : auto.id,
                    })
                    .then(() => {})
                }
                res.redirect(`/admin/autos#${auto.id}`)
            })
            .catch(error => console.log(error))
        } else {
            if (req.files) {
                req.files.forEach(file => {
                    fs.unlinkSync( path.join(__dirname, "../../public/images", file.filename))
                })
			}
            Sucursal.findAll()
            .then(sucursales => {
                res.render('admin/agregarAuto',{
                    sucursales,
                    title : 'AgregarAuto'
                })
            })
            .catch(error => console.log(error));
        }
    },
    editForm : (req, res) => {
        const { id } = req.params;
        let auto = Auto.findByPk(id, { include : ['sucursal', 'imagenes']});
        let sucursales = Sucursal.findAll()
        Promise.all([auto, sucursales])
        .then(([auto, sucursales]) => {
            res.render('admin/editAuto', {
                title : `Editando ${auto.marca} ${auto.modelo}`,
                auto,
                sucursalAuto : auto.sucursal,
                sucursales,
            })
        })
        .catch(error => console.log(error));
    },
    edit : (req, res) => {
        const errors = validationResult(req);
        const { id } = req.params;
        if (errors.isEmpty()) {
            Auto.update({
                ...req.body,
                sucursalId : +req.body.sucursalId,
            },{
                where : { id }
            })
            .then(() => {
                if (req.files.length != 0) {
                    Imagen.findAll({where : {autoId : id}})
                    .then(imagenes => {
                        //borrame las imagenes
                        imagenes.forEach(({file}) => {
                            if (fs.existsSync(path.join(__dirname, "../../public/images", file)) && file != "default-image.png") {
                                fs.unlinkSync(path.join(__dirname, "../../public/images", file));
                            }
                        })
                        Imagen.destroy({
                            where : {
                                autoId : id
                            }
                        })
                        .then(() => {
                            let imagenes = req.files.map(({filename}) => {
                                return {
                                    file : filename,
                                    autoId : id,
                                } 
                            })
                            Imagen.bulkCreate(imagenes)
                            .then(() => {
                                console.log(imagenes);
                            })
                            .catch(errorBulk => console.log(errorBulk));
                        })
                        .catch(errorImageDestroy => console.log(errorImageDestroy))
                    })
                    .catch(errorImages => console.log(errorImages))
                }
                res.redirect(`/admin/autos#${id}`)
            })
            .catch(errorUpdate => console.log(errorUpdate))
        } else {
            if (req.files) {
                req.files.forEach(file => {
                    fs.unlinkSync( path.join(__dirname, "../../public/images", file.filename))
                })
			}
            let auto = Auto.findByPk(id, { include : ['sucursal', 'imagenes']});
            let sucursales = Sucursal.findAll()
            Promise.all([auto, sucursales])
            .then(([auto, sucursales]) => {
                res.render('admin/editAuto', {
                    title : `Editando ${auto.marca} ${auto.modelo}`,
                    auto,
                    sucursalAuto : auto.sucursal,
                    sucursales,
                    errors : errors.mapped(),
                    old : req.body,
                })
            })
            .catch(error => console.log(error));
        }
    },
    deleteAuto : (req, res) => {
        const { id } = req.params;
        Auto.findByPk(id, { include : ['imagenes']})
        .then(auto => {
            auto.imagenes.forEach(({file}) => {
                if (fs.existsSync(path.join(__dirname, "../../public/images", file)) && file != "default-image.png") {
                    fs.unlinkSync(path.join(__dirname, "../../public/images", file));
                }
            })
            Imagen.destroy({
                where : { autoId : id}
            })
            .then(() => {
                Auto.destroy({
                    where : { id }
                })
                .then(() => {
                    res.redirect(`/admin/autos#${id - 1}`)
                })
                .catch(errorAutoDestroy => console.log(errorAutoDestroy))
            })
            .catch(errorImageDestroy => console.log(errorImageDestroy))
        })
        .catch(errorFind => console.log(errorFind));
    }
}