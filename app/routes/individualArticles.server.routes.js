var express = require('express')
var controller = require('../controllers/individualArticles.server.controller')
var router = express.Router();


// Individual analytics routes
router.get('/api/individual/getAllArticles', controller.getAllArticles);
router.get('/api/individual/getTopFiveUsers', controller.getTopFiveUsers);

router.get('/api/individual/getIndividualBarChartData', controller.getBarChartData)
router.get('/api/individual/getLatestRevision', controller.getLatestRevisionForArticle)

// router.get('/reddit', controller.reddit);


// Author analytics routes
router.get('/api/author/getAllAuthors', controller.getAllAuthors);

module.exports = router;