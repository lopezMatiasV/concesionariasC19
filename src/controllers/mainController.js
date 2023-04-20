const { sucursales, autos } = require('../data')
const { Sucursal, Auto, Sequelize } = require('../database/models')

module.exports = {
    home : (req, res) => {
        Sucursal.findAll()
        .then(sucursales => {
            res.render('others/home', {
                title: 'Practica c19',
                sucursales,
            })
        })
        .catch(error => {
            console.log(error);
        })
    },
    search: (req, res) => {
        const { search } = req.query
        Auto.findAll({
            where : {
                [Sequelize.Op.or] : [
                    //{ marca : search},
                    //utilizamos substring para que machee con alguna secuencia de la palabra
                    { marca : {[Sequelize.Op.substring]: search} },
                    { modelo : {[Sequelize.Op.substring]: search} },
                    { color : {[Sequelize.Op.substring]: search} }
                ]
            },
            include : ['imagenes'],
        })
        .then(autos => {
            res.render('others/search',{
                autos,
                search,
                title : 'Resultado de la busqueda',
            })
        })
        .catch(error => {
            console.log(error);
        })
    },
    admin :(req, res) => {
        res.render('admin/adminIndex', {
            title : 'Admin',
        })
    }
}