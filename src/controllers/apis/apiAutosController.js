const { Auto, Imagen } = require("../../database/models");
const path = require("path");
const fs = require("fs");
const { validationResult } = require("express-validator");
const getUrl = (req) => req.protocol + '://' + req.get('host') + req.originalUrl;

module.exports = {
    all : async (req, res) => {
        try {
            const autos = await Auto.findAll({
                include : ['sucursal', 'imagenes']
            })
            if(autos.length == 0) throw 'NOT FOUND';
            return res.status(200).json({
                meta : {
                    endPoint: getUrl(req),
                    total : autos.length,
                    status : 200,
                },
                autos,
            })
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                meta : {
                    status : 404,
                    msg : error,
                }
            })
        }
    },
    one : async (req, res) => {
        const { id } = req.params;
        if(isNaN(id)) {
            return res.status(404).json({
                meta : {
                    status : 404,
                    msg : `Invalid parameter : ${id}`,
                }
            })
        }
        try {
            const auto = await Auto.findByPk(id, {
                include : ['sucursal', 'imagenes']
            })
            if(!auto) throw `Id ${id}, NOT FOUND`;
            return res.status(200).json({
                meta : {
                    endPoint: getUrl(req),
                    status : 200,
                },
                auto,
            })
        } catch (error) {
            return res.status(404).json({
                meta : {
                    status : 404,
                    msg : error,
                }
            })
        }
    },
    create : async (req, res) => {
        let errors = validationResult(req)
        if(errors.isEmpty()){
            try {
                let auto = await Auto.create({
                    ...req.body
                })
                await Imagen.create({
                        file : "default-image.png",
                        autoId : auto.id,
                })
                return res.status(201).json({
                    meta: {
                        endPoint: getUrl(req) + `/${auto.id}`,
                        msg: "Car Added",
                    },
                    auto,
                });
            } catch (error) {
                console.log(error)
                return res.status(404).json({
                    meta: {
                        status: 404,
                        msg: error,
                    },
                });
            }
        } else {
            return res.status(400).json({
                msj : errors.mapped()
            })
        }
    },
    update : async (req, res) => {
        let errors = validationResult(req);
        let { id } = req.params;
        if(isNaN(id)) {
            return res.status(404).json({
                meta : {
                    status : 404,
                    msg : `Invalid parameter : ${id}`,
                }
            })
        }
        if(errors.isEmpty()){
            let auto = await Auto.findByPk(id);
            try {
                if(!auto) throw `Not changes, NOT FOUND id: ${id} `;
                    Auto.update(
                        {...req.body},
                        { where: { id }},
                    )
                    return res.status(201).json({
                        msg : `Id: ${auto.id}  Updated Successfully`,
                    })
            } catch (error) {
                return res.status(404).json({
                    meta: {
                        status: 404,
                        msg: error,
                    },
                });
            }
        }else{
            return res.status(404).json({
                meta: {
                    status: 404,
                    msg: errors.mapped(),
                },
            });
        }
    },
    destroy : async (req, res) => {
        let { id } = req.params;
        if(isNaN(id)) {
            return res.status(404).json({
                meta : {
                    status : 404,
                    msg : `Invalid Parameter : ${id}`,
                }
            })
        }
        let auto = await Auto.findByPk(id, {include : ['imagenes']});
        try {
            if(!auto) throw `Not changes, NOT FOUND id: ${id} `;
            if(auto.imagenes.length !== 0) {
                Imagen.destroy({
                    where : { autoId : id }
                })
            }
            Auto.destroy({
                where : { id }
            })
            return res.status(201).json({
                msg : `Deleted successfully Id: ${id} `,
            })
        } catch (error) {
            return res.status(404).json({
                meta: {
                    status: 404,
                    msg: error,
                },
            });
        }
    }
}