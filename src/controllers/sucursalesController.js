//const { Sucursal } = require('../database/models');
const url = "http://localhost:3000/apis/sucursales/";

module.exports = {
    sucursales : async (req, res) => {
        fetch(url)
        .then(response => {
            response.json()
            .then(sucursales => {
                res.render('sucursales/sucursales', {
                    title: 'Sucursales',
                    sucursales : sucursales.data,
                })
            })
        })
        .catch(error => console.log(error))
        /* Sucursal.findAll()
        .then(sucursales =>{
            res.render('sucursales/sucursales', {
                title: 'Sucursales',
                sucursales,
            })
        })
        .catch(error => {
            console.log(error);
            res.send('Hubo un error')
        }) */
    },
    sucursal : (req, res) => {
        const { id } = req.params;
        fetch(url + id)
        .then(response => {
            response.json()
            .then(sucursal => {
                res.render('sucursales/sucursal', {
                    sucursal : sucursal.data,
                    title: sucursal.data.nombre,
                    autos : sucursal.data.autos,
                })
            })
        })
        /* Sucursal.findByPk(id, {
            include:[{association : 'autos', include : {association : 'imagenes'}}]
        })
        .then(sucursal => {
            res.render('sucursales/sucursal', {
                sucursal,
                title: sucursal.nombre,
                autos : sucursal.autos,
            })
        }) */
    }
}