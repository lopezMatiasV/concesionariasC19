const homeRouter = require("./main");
const sucursalesRouter = require("./sucursales");
const autoRouter = require("./autos");
const adminSucursalesRouter = require("./adminSucursales");
const adminAutosRouter = require("./adminAutos");
const adminUsuariosRouter = require("./adminUsuarios");
const userRouter = require("./users");
const apiSucursales = require("./apiSucursales");
const apiUsers = require("./apiUsers");
const apiAutos = require("./apiAutos")

module.exports = {
	homeRouter,
	sucursalesRouter,
	autoRouter,
	adminSucursalesRouter,
	adminAutosRouter,
	adminUsuariosRouter,
	userRouter,
	apiSucursales,
	apiUsers,
	apiAutos,
};
