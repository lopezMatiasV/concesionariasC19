const router = require('express').Router()
const { login, register, processRegister, processLogin, logOut} = require('../controllers/usersController')
const loginValidator = require('../validations/loginValidator')
const registerValidator = require('../validations/registerValidator')

router
    .get('/login', login)
    .post('/login', loginValidator, processLogin)
    .get('/register', register)
    .post('/register', registerValidator, processRegister)
    .get('/logout', logOut)

    module.exports = router