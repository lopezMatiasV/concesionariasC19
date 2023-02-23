const { autos, sucursales, writeJsonAutos } = require('../data')
const path = require('path')
const fs = require('fs')

module.exports = {
    all : (req, res) => {
        res.render('admin/adminAutos', {
            title : 'Admin autos',
            autos,
        })
    }, 
    formCreate : (req, res) => {
        res.render('admin/agregarAuto', {
            title : 'agregar Auto',
            sucursales
        })
    },
    create : (req, res) => {
        let lastId = 0;
        autos.forEach(auto => {
            if(auto.id > lastId){
                lastId = auto.id
            }
        })
        const newAuto = {
            id : lastId + 1,
            ...req.body,
            imagen : req.file ? req.file.filename : 'default-image.png', 
        }
        autos.push(newAuto)
        writeJsonAutos(autos)
        res.redirect(`/admin/autos#${newAuto.id}`)
    },
    editForm : (req, res) => {
        
    },
    edit : (req, res) => {
        
    },
    deleteAuto : (req, res) => {
        
    }
}