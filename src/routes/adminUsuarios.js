const router = require('express').Router()
const { allUser, editUser, deleteUser, searchUser } = require('../controllers/adminUsuariosController')

router
    .get('/', allUser )
    .put('/:id', editUser)
    .delete('/:id', deleteUser)
    .get('/search', searchUser)

module.exports = router