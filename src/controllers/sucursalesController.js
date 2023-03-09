const { sucursales, autos } = require('../data')

module.exports = {
    sucursales : (req, res) => {
        res.render('sucursales/sucursales', {
            title: 'Sucursales',
            sucursales,
            session: req.session,
        })
    },
    sucursal : (req, res) => {
        let id = +req.params.id
        let sucursal = sucursales.find(sucursal => sucursal.id === +id)
        let autosSucursal = autos.filter(auto => auto.sucursal === +id)
        
        if (!sucursal) {
            return res.send('Nop existe esa sucursal')
        }
        res.render('sucursales/sucursal', {
            sucursal,
            title: sucursal.nombre,
            autos : autosSucursal,
            session: req.session
        })
    }
}