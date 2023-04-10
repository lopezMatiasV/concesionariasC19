const { Auto } = require('../database/models')

module.exports = {
	autos: (req, res) => {
		Auto.findAll({include : ['imagenes']})
		.then(autos => {
			res.render("autos/autos", {
				title: "Todos nuestros autos",
				autos,
			});
		})
		.catch(errors => console.log(errors))
	},
	auto: (req, res) => {
		const { id } = req.params
		Auto.findByPk(id, {
			include : ['imagenes', 'sucursal']
		})
		.then(auto => {
			res.render("autos/autoDetail", {
				auto,
				sucursal: auto.sucursal,
				title : auto.marca + ' ' + auto.modelo,
			});
		})
	},
};
