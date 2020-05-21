var express = require('express')
var controller = require('../controllers/author.analytics.server.controller')
var router = express.Router();

//Overall: Data
router.get('/api/authorUser', controller.getAuthorUser);
router.get('/api/individual/getAllArticles', controller.getAllArticles);

module.exports = router;