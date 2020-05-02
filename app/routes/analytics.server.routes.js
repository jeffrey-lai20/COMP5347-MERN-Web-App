var express = require('express')
var controller = require('../controllers/analytics.server.controller')
var router = express.Router();

router.get('/api/topArticleRevisions', controller.getTopArticleRevisions);

module.exports = router;