const { users, writeJsonUsers } = require('../data')

module.exports = {
    register : (req, res) => {
        res.render('users/register', {
            title : 'Registro'
        })
    },
    processRegister : (req, res) => {
        const { nombre, apellido, email, pass } = req.body
        const newUser = {
            nombre, apellido, email, pass,
            avatar : req.file?.filename ?? "default-image.png",
            rol : 'user'
        }
        users.push(newUser)
        writeJsonUsers(users)
        res.redirect('/users/login')
    },
    login : (req, res) => {
        res.render('users/login', {
            title : 'Login'
        })
    },
}