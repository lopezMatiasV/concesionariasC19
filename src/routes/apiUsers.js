const router = require('express').Router();
const { all, one } = require('../controllers/apis/apiUsersController');

router
    .get('/', all)
    .get('/:id', one)

module.exports = router;