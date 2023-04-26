const router = require("express").Router();
const { autos, auto } = require("../controllers/autosController");

router.get("/", autos).get("/:id", auto);

module.exports = router;
