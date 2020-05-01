var express = require('express')
var controller = require('../controllers/analytics.server.controller')
var router = express.Router();

router.get('/login', controller.showLoginPage);
router.get('/main', controller.showMainPage);

module.exports = router;