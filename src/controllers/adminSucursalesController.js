const { sucursales, writeJsonSucursales } = require('../data')
const path = require('path')
const fs = require('fs')

module.exports = {
    all : (req, res) => {
        res.render('admin/adminSucursales', {
            title : 'Admin',
            sucursales,
            session: req.session,
        })
    }, 
    formCreate : (req, res) => {
        res.render('admin/agregarSucursal', {
            title : 'agregar Sucursal',
            session: req.session,
        })
    },
    create : (req, res) => {
        let lastId = 0;
        sucursales.forEach(sucursal => {
            if(sucursal.id > lastId){
                lastId = sucursal.id
            }
        })
        const newSucursal = {
            id : lastId + 1,
            ...req.body,
            imagen : req.file ? req.file.filename : 'default-image.png', 
        }
        sucursales.push(newSucursal)
        writeJsonSucursales(sucursales)
        res.redirect('/admin/sucursales')
    },
    editForm : (req, res) => {
        const { id } = req.params
        const sucursal = sucursales.find(sucursal => sucursal.id === +id)
        if (!sucursal) {
            return res.send('Nop existe esa sucursal')
        }
        res.render('admin/editarSucursal', {
            sucursal,
            title: sucursal.nombre,
            session: req.session,
        })
    },
    edit : (req, res) => {
        const { id } = req.params
        const { nombre, direccion, telefono } = req.body;
        let sucursalEditar = sucursales.find(sucursal => sucursal.id === +id)
        //eliminar imagen anterior
        if (req.file) {
            if(fs.existsSync(path.join(__dirname, "../../public/images", sucursalEditar.imagen)) 
            && sucursalEditar.imagen != "default-image.png" ){
                fs.unlinkSync(path.join(__dirname, "../../public/images", sucursalEditar.imagen))
            }
        }

        sucursales.forEach(sucursal => {
            if (sucursal.id === +id) {
                sucursal.nombre = nombre,
                sucursal.direccion = direccion,
                sucursal.telefono = telefono, 
                sucursal.imagen = req.file?.filename ?? sucursal.imagen
            }
        })
        writeJsonSucursales(sucursales)
        res.redirect('/admin/sucursales')
    },
    deleteSucursal : (req, res) => {
        const { id } = req.params;
        
        let sucursal = sucursales.find(sucursal => sucursal.id === +id)
            if(fs.existsSync(path.join(__dirname, "../../public/images", sucursal.imagen)) 
            && sucursal.imagen != "default-image.png" ){
                fs.unlinkSync(path.join(__dirname, "../../public/images", sucursal.imagen))
            }

        /* const sucursalesAct = sucursales.filter(sucursal => sucursal.id !== +id)
        writeJsonSucursales(sucursalesAct)*/

        let sucursalAEliminar = sucursales.indexOf(sucursal)
        sucursales.splice(sucursalAEliminar, 1)
        writeJsonSucursales(sucursales)
        
        res.redirect('/admin/sucursales')
    }
}