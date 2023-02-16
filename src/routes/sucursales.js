const express = require("express");
const router = express.Router();
const { sucursales, sucursal } = require('../controllers/sucursalesController')

router
    .get('/', sucursales)
    .get('/:id', sucursal)

module.exports = router;