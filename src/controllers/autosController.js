const { sucursales, autos } = require("../data");
const user = ''
module.exports = {
	autos: (req, res) => {
        //return res.send(autos)
		res.render("autos/autos", {
			title: "Todos nuestros autos",
			autos,
		});
	},
	auto: (req, res) => {
		const { id } = req.params
		const auto = autos.find(auto => auto.id === +id)
		const sucursal = sucursales.find(sucursal => sucursal.id == auto.sucursal)
		res.render("autos/autoDetail", {
			auto,
			sucursal,
			user,
			title : auto.marca + ' ' + auto.modelo
		});
	},
};
