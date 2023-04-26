const router = require("express").Router();
const {
	login,
	register,
	processRegister,
	processLogin,
	logOut,
	perfil,
	editPerfil,
	deleteUser,
} = require("../controllers/usersController");
const loginValidator = require("../validations/loginValidator");
const registerValidator = require("../validations/registerValidator");
const { inSession, offSession } = require("../middlewares/user");
const upload = require('../middlewares/uploadFile')

router
	.get("/login", inSession, login)
	.post("/login", loginValidator, processLogin)
	.get("/register", inSession, register)
	.post("/register", registerValidator, processRegister)
	.get("/logout", logOut)
	.get("/perfil", offSession, perfil)
	.put("/perfil/:id", upload.single('avatar'), editPerfil)
	.delete("/delete/:id", deleteUser);

module.exports = router;
