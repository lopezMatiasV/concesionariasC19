const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { isAdmin } = require("./middlewares/user");

//ENRUTADORES
const homeRouter = require("./routes/main");
const sucursalesRouter = require("./routes/sucursales");
const autoRouter = require("./routes/autos");
const adminSucursalesRouter = require("./routes/adminSucursales");
const adminAutosRouter = require("./routes/adminAutos");
const userRouter = require("./routes/users");

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

//RUTAS
app.use("/", homeRouter);
app.use("/sucursales", sucursalesRouter);
app.use("/autos", autoRouter);
app.use("/admin/sucursales", isAdmin, adminSucursalesRouter);
app.use("/admin/autos", isAdmin, adminAutosRouter);
app.use("/users", userRouter);

app.listen(port, () => {
	console.log(
		`Servidor levantado en el puerto ${port}\nLink: http://localhost:${port}`
	);
});
