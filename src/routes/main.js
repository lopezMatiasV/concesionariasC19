const express = require("express");
const router = express.Router();
const { home, search, admin } = require('../controllers/mainController')

router
    .get('/', home)
    .get('/search', search)
    .get('/admin', admin)

module.exports = router;