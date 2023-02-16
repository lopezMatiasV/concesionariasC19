const { sucursales, autos } = require('../data')

module.exports = {
    home : (req, res) => {
        res.render('others/home', {
            title: 'Practica c19',
            sucursales,
        })
    },
    search: (req, res) => {
        const { search } = req.query
        const autosSearch = autos.filter( auto => auto.marca == search.toLowerCase() || auto.modelo == search.toLowerCase())
        res.render('others/search',{
            autos : autosSearch,
            search,
            title : 'Resultado de la busqueda'
        })
    },
    admin :(req, res) => {
        res.render('admin/adminIndex', {
            title : 'Admin'
        })
    }
}