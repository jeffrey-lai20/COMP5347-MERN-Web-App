var express = require('express')
var controller = require('../controllers/analytics.server.controller')
var router = express.Router();

router.get('/api/topArticleRevisions', controller.getTopArticleRevisions);
router.get('/api/lowestArticleRevisions', controller.getLowestArticleRevisions);
router.get('/api/largestArticleGroup', controller.getLargestArticleGroup);
router.get('/api/smallestArticleGroup', controller.getSmallestArticleGroup);
router.get('/api/longesArticletHistory', controller.getLongestHistory);
router.get('/api/shortestArticleHistory', controller.getShortestHistory);

module.exports = router;