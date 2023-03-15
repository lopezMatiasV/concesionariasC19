const router = require("express").Router();
const {
	login,
	register,
	processRegister,
	processLogin,
	logOut,
	perfil,
} = require("../controllers/usersController");
const loginValidator = require("../validations/loginValidator");
const registerValidator = require("../validations/registerValidator");
const { inSession, offSession } = require('../middlewares/user')

router
	.get("/login", inSession, login)
	.post("/login", loginValidator, processLogin)
	.get("/register", inSession, register)
	.post("/register", registerValidator, processRegister)
	.get("/logout", logOut)
	.get("/perfil", offSession, perfil);

module.exports = router;
