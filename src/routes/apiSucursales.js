const router = require("express").Router();
const { all, one, create, update, destroy} = require("../controllers/apis/apiSucursalesController");
const sucursalValidator = require('../validations/sucursalValidator');

router
    .get('/', all )
    .get('/:id', one)
    .post('/', sucursalValidator, create)
    .put('/:id', sucursalValidator, update)
    .delete('/:id', destroy);

module.exports = router;