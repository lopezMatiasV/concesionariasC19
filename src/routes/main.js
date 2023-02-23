const express = require("express");
const router = express.Router();
const { home, search, admin } = require('../controllers/mainController')
const { isAdmin } = require('../middlewares/user')
router
    .get('/', home)
    .get('/search', search)
    .get('/admin', isAdmin, admin)

module.exports = router;