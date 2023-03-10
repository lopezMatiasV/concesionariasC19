const router = require('express').Router()
const { all, formCreate, create, editForm, edit, deleteAuto} = require('../controllers/adminAutosController')
const upload = require('../middlewares/uploadFile')

router
    .get('/', all )
    .get('/agregarAuto', formCreate)
    .post('/create', upload.single('imagen'), create)
    .get('/editarAuto/:id', editForm)
    .put('/editar/:id', upload.single('imagen'), edit)
    .delete('/eliminarAuto/:id', deleteAuto)

module.exports = router