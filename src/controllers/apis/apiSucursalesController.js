const { Sucursal, Auto, Imagen } = require("../../database/models");
const path = require("path");
const fs = require("fs");
const { validationResult } = require("express-validator");
const getUrl = (req) => req.protocol + '://' + req.get('host') + req.originalUrl;

module.exports = {
    all : async (req, res) => {
        try {
            const sucursales = await Sucursal.findAll({
                include : [{association : 'autos', include : {association : 'imagenes'}}]
            })
            if(sucursales.length == 0) throw 'NOT FOUND';
            return res.status(200).json({
                meta : {
                    endPoint: getUrl(req),
                    total : sucursales.length,
                    status : 200,
                },
                sucursales,
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
                    msg : `Invalid Parameter : ${id}`,
                }
            })
        }
        try {
            const sucursal = await Sucursal.findByPk(id, {
                include : [{association : 'autos', include : {association : 'imagenes'}}]
            })
            if(!sucursal) throw 'Not Found';
            return res.status(200).json({
                meta : {
                    endPoint: getUrl(req),
                    total_autos : sucursal.autos.length,
                    status : 200,
                },
                sucursal,
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
                let sucursal = await Sucursal.create({
                    ...req.body,
                    imagen : "default-image.png",
                })
                return res.status(201).json({
                    meta: {
                        endPoint: getUrl(req) + `/${sucursal.id}`,
                        msg: "Sucursal added",
                    },
                    data: sucursal,
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
                    msg : `Invalid Parameter: ${id}`,
                }
            })
        }
        if(errors.isEmpty()){
            let sucursal = await Sucursal.findByPk(id);
            try {
                if(!sucursal) throw `Not change, id: ${id} NOT FOUND`;
                    Sucursal.update(
                        {...req.body},
                        { where: { id }},
                    )
                    return res.status(201).json({
                        msg : `Id:${sucursal.id} updated successfully`,
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
        let sucursal = await Sucursal.findByPk(id);
        try {
            if(!sucursal) throw `Id: ${id} NOT FOUND`;
            Sucursal.destroy({
                where : {id}
            })
            return res.status(201).json({
                msg : `Id: ${id} deleted successfully`,
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