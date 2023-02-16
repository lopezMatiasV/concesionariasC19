const { sucursales, writeJsonSucursales } = require('../data')

module.exports = {
    all : (req, res) => {
        res.render('admin/adminSucursales', {
            title : 'Admin',
            sucursales,
        })
    }, 
    formCreate : (req, res) => {
        res.render('admin/agregarSucursal', {
            title : 'agregar Sucursal'
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
        })
    },
    edit : (req, res) => {
        const { id } = req.params
        const { nombre, direccion, telefono } = req.body;
        //let sucursal = sucursales.find(sucursal => sucursal.id === +id)
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
        const sucursalesAct = sucursales.filter(sucursal => sucursal.id !== +id)
        writeJsonSucursales(sucursalesAct)
        res.redirect('/admin/sucursales')
    }
}