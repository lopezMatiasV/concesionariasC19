const { Sucursal } = require('../database/models');
const url = "http://localhost:3000/apis/sucursales/";

module.exports = {
    sucursales : async (req, res) => {
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
        /* fetch(url)
        .then(response => {
            response.json()
            .then(result => {
                res.render('sucursales/sucursales', {
                    title: 'Sucursales',
                    sucursales : result.sucursales,
                })
            })
        })
        .catch(error => console.log(error)) */
    },
    sucursal : (req, res) => {
        const { id } = req.params;
        Sucursal.findByPk(id, {
            include:[{association : 'autos', include : {association : 'imagenes'}}]
        })
        .then(sucursal => {
            res.render('sucursales/sucursal', {
                sucursal,
                title: sucursal.nombre,
                autos : sucursal.autos,
            })
        }).catch(error => console.log(error))
        /* fetch(url + id)
        .then(response => {
            response.json()
            .then(result => {
                res.render('sucursales/sucursal', {
                    sucursal : result.sucursal,
                    title: result.sucursal.nombre,
                    autos : result.sucursal.autos,
                })
            })
        }) */
    }
}