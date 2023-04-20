const router = require('express').Router()
const { all, formCreate, create, editForm, edit, deleteAuto } = require('../controllers/adminAutosController')
const upload = require('../middlewares/uploadFile')
const autosValidator = require('../validations/autosValidator')


router
    .get('/', all )
    .get('/agregarAuto', formCreate)
    .post('/create', upload.array('imagen'), autosValidator, create)
    .get('/editarAuto/:id', editForm)
    .put('/editar/:id', upload.array('imagen'), autosValidator ,edit)
    .delete('/eliminarAuto/:id', deleteAuto)

module.exports = router