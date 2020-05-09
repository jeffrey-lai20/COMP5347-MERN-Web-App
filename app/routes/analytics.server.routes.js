var express = require('express')
var controller = require('../controllers/analytics.server.controller')
var router = express.Router();

//Overall: Data
router.get('/api/topArticleRevisions', controller.getTopArticleRevisions);
router.get('/api/lowestArticleRevisions', controller.getLowestArticleRevisions);
router.get('/api/largestArticleGroup', controller.getLargestArticleGroup);
router.get('/api/smallestArticleGroup', controller.getSmallestArticleGroup);
router.get('/api/longesArticletHistory', controller.getLongestHistory);
router.get('/api/shortestArticleHistory', controller.getShortestHistory);
// Overall: Chart
router.get('/api/barChartDistYear', controller.getBarChartDistributionYear);
router.get('/api/pieChartDistUsertype', controller.getPieChartDistributionUsertype);

module.exports = router;