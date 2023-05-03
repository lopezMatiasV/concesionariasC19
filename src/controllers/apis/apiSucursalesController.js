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
            if(sucursales.length == 0) throw 'No hay sucursales';
            return res.status(200).json({
                meta : {
                    endPoint: getUrl(req),
                    total : sucursales.length,
                    status : 200,
                },
                data : sucursales,
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
                    msg : `Parametro invalido : ${id}`,
                }
            })
        }
        try {
            const sucursal = await Sucursal.findByPk(id, {
                include : [{association : 'autos', include : {association : 'imagenes'}}]
            })
            if(!sucursal) throw 'No encontrado';
            return res.status(200).json({
                meta : {
                    endPoint: getUrl(req),
                    total_autos : sucursal.autos.length,
                    status : 200,
                },
                data : sucursal,
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
    create : (req, res) => {

    },
    update : (req, res) => {

    },
    destroy : (req, res) => {

    }
}