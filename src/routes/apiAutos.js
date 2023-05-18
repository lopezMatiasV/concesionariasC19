const router = require("express").Router();
const { all, one, create, update, destroy} = require("../controllers/apis/apiAutosController");
const autoValidator = require('../validations/autosValidator');

router
    .get('/', all )
    .get('/:id', one)
    .post('/', autoValidator, create)
    .put('/:id', autoValidator, update)
    .delete('/:id', destroy);

module.exports = router;