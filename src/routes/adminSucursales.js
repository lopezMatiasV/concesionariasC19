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

router
	.get("/", all)
	.get("/agregarSucursal", formCreate)
	.post("/create", upload.single("imagen"), create)
	.get("/editarSucursal/:id", editForm)
	.put("/editar/:id", upload.single("imagen"), edit)
	.delete("/eliminarSucursal/:id", deleteSucursal);

module.exports = router;
