const express = require("express");
const app = express();
const path = require("path");
require('dotenv').config();
const port = process.env.PORT || 8000;
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { isAdmin, localsSession, cookieCheck } = require("./middlewares/user");

//ENRUTADORES
const {
	homeRouter,
	sucursalesRouter,
	autoRouter,
	adminAutosRouter,
	adminSucursalesRouter,
	userRouter,
	adminUsuariosRouter,
	apiSucursales,
	apiUsers,
	apiAutos,
} = require("./routes");

//VISTAS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//MIDDLEWARE
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(
	session({
		secret: "concesionarias",
		resave: false,
		saveUninitialized: true,
		cookie: {},
	})
);
app.use(cookieCheck);
app.use(localsSession);
app.use(
	cors({
		methods: ["GET", "POST"],
		credentials: true,
	})
);

//RUTAS
app.use("/", homeRouter);
app.use("/sucursales", sucursalesRouter);
app.use("/autos", autoRouter);
app.use("/admin/sucursales", /* isAdmin, */ adminSucursalesRouter);
app.use("/admin/autos", /* isAdmin, */ adminAutosRouter);
app.use("/users", userRouter);
app.use("/admin/usuarios", adminUsuariosRouter);
app.use("/apis/sucursales", apiSucursales);
app.use("/apis/users", apiUsers);
app.use('/apis/autos', apiAutos)

app.listen(port, () => {
	console.log(
		`Servidor levantado en el puerto ${port}\nLink: http://localhost:${port}`
	);
});
