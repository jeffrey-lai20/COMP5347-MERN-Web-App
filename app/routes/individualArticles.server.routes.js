var express = require('express')
var controller = require('../controllers/individualArticles.server.controller')
var router = express.Router();


// Individual analytics routes
router.get('/api/individual/getAllArticles', controller.getAllArticles);
router.get('/api/individual/getTopFiveUsers/:title/:fromYear/:toYear', controller.getTopFiveUsers);
router.get('/api/individual/getNumberOfRevisions/', controller.getNumberOfRevisionsForArticle);

router.get('/api/individual/getIndividualPieChartData/:title/:fromYear/:toYear', controller.getPieChartData);
router.get('/api/individual/barChartDistYear/:title/:fromYear/:toYear', controller.getIndividualBarChartData);
router.get('/api/individual/barChartDistYearUser/:title/:user/:fromYear/:toYear', controller.getIndividualBarChartDataUser);
router.get('/api/individual/getLatestRevision', controller.getLatestRevisionForArticle);

// router.get('/reddit', controller.reddit);

// Author analytics routes
router.get('/api/author/getAllAuthors', controller.getAllAuthors);

module.exports = router;