const fs = require("fs");
const path = require("path");

module.exports = {
	sucursales: JSON.parse(
		fs.readFileSync(path.join(__dirname, "sucursales.json"), "utf-8")
	),
	autos: JSON.parse(
		fs.readFileSync(path.join(__dirname, "autos.json"), "utf-8")
	),
	users: JSON.parse(
		fs.readFileSync(path.join(__dirname, "users.json"), "utf-8")
	),
	writeJsonSucursales: (data) => {
		fs.writeFileSync(
			path.join(__dirname, "sucursales.json"),
			JSON.stringify(data),
			"utf-8"
		);
	},
	writeJsonAutos: (data) => {
		fs.writeFileSync(
			path.join(__dirname, "autos.json"),
			JSON.stringify(data),
			"utf-8"
		);
	},
	writeJsonUsers: (data) => {
		fs.writeFileSync(
			path.join(__dirname, "users.json"),
			JSON.stringify(data),
			"utf-8"
		);
	},
};
