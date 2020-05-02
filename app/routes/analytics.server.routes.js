var express = require('express')
var controller = require('../controllers/analytics.server.controller')
var router = express.Router();

router.get('/api/getList', controller.getList);

module.exports = router;