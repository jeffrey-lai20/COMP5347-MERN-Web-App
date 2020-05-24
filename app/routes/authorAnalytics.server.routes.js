var express = require('express')
var controller = require('../controllers/authorAnalytics.server.controller')
var router = express.Router();

router.get('/api/author/getAllAuthors', controller.getAllAuthors);
router.get('/api/author/getAuthor', controller.getAuthor);
router.get('/api/author/getRevisionTimestamps/:user/:title', controller.getTimestampsAuthorArticle);

module.exports = router;