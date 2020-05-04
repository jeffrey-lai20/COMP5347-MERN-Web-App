var express = require('express')
var controller = require('../controllers/individualArticles.server.controller')
var router = express.Router();

router.get('/api/individual/getAllArticles', controller.getAllArticles);

module.exports = router;