const router = require('express').Router()
const { all, formCreate, create, editForm, edit, deleteSucursal} = require('../controllers/adminSucursalesController')

router
    .get('/', all )
    .get('/agregarSucursal', formCreate)
    .post('/create', create)
    .get('/editarSucursal/:id', editForm)
    .put('/editar/:id', edit)
    .delete('/eliminarSucursal/:id', deleteSucursal)

module.exports = router