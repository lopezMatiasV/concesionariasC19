const { Sucursal } = require('../database/models')

module.exports = {
    sucursales : (req, res) => {
        Sucursal.findAll()
        .then(sucursales =>{
            res.render('sucursales/sucursales', {
                title: 'Sucursales',
                sucursales,
            })
        })
        .catch(error => {
            console.log(error);
            res.send('Hubo un error')
        })
    },
    sucursal : (req, res) => {
        let id = +req.params.id
        Sucursal.findByPk(id, {
            include:[{association : 'autos', include : {association : 'imagenes'}}]
        })
        .then(sucursal => {
            res.render('sucursales/sucursal', {
                sucursal,
                title: sucursal.nombre,
                autos : sucursal.autos,
            })
        })
    }
}