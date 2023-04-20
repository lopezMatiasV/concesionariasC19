const router = require("express").Router();
const {
	all,
	formCreate,
	create,
	editForm,
	edit,
	deleteSucursal,
} = require("../controllers/adminSucursalesController");
const upload = require("../middlewares/uploadFile");
const sucursalValidator = require('../validations/sucursalValidator')

router
	.get("/", all)
	.get("/agregarSucursal", formCreate)
	.post("/create", upload.single("imagen"), sucursalValidator, create)
	.get("/editarSucursal/:id", editForm)
	.put("/editar/:id", upload.single("imagen"), sucursalValidator, edit)
	.delete("/eliminarSucursal/:id", deleteSucursal);

module.exports = router;