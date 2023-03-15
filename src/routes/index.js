const homeRouter = require("./main");
const sucursalesRouter = require("./sucursales");
const autoRouter = require("./autos");
const adminSucursalesRouter = require("./adminSucursales");
const adminAutosRouter = require("./adminAutos");
const userRouter = require("./users");

module.exports = {
	homeRouter,
	sucursalesRouter,
	autoRouter,
	adminSucursalesRouter,
	adminAutosRouter,
	userRouter,
};
