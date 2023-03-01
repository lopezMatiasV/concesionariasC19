const router = require('express').Router()
const { login, register, processRegister} = require('../controllers/usersController')
router
    .get('/login', login)
    .get('/register', register)
    .post('/register', processRegister)

    module.exports = router