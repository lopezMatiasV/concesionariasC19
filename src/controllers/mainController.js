const { sucursales, autos } = require('../data')

module.exports = {
    home : (req, res) => {
        res.render('others/home', {
            title: 'Practica c19',
            sucursales,
            session: req.session,
        })
    },
    search: (req, res) => {
        const { search } = req.query

        const autosSearch = autos.filter( auto => auto.marca.toLowerCase().includes(search.toLowerCase()) || auto.modelo.toLowerCase().includes(search.toLowerCase()))
        
        res.render('others/search',{
            autos : autosSearch,
            search,
            title : 'Resultado de la busqueda',
            session: req.session
        })
    },
    admin :(req, res) => {
        res.render('admin/adminIndex', {
            title : 'Admin',
            session: req.session
        })
    }
}