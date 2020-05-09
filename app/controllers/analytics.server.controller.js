var express = require('express');

var Revision = require("../models/article")

module.exports.getTopArticleRevisions = function(req, res) {
    noOfArticles = 2;

    Revision.findHighestRevisions(noOfArticles, function(error, result) {
        if (error) {
            console.log("Cannot find highest revision")
        } else {
            console.log(result)
            res.json(result);
        }
    })
}

module.exports.getLowestArticleRevisions = function(req, res) {
    noOfArticles = 2;

    Revision.findLowestRevisions(noOfArticles, function(error, result) {
        if (error) {
            console.log("Cannot find lowest revision")
        } else {
            console.log(result)
            res.json(result);
        }
    })
}

module.exports.getLargestArticleGroup = function(req, res) {
    noOfArticles = 2;

    Revision.findEditLargestGroup(noOfArticles, function(error, result) {
        if (error) {
            console.log("Cannot find largest group")
        } else {
            console.log(result)
            res.json(result);
        }
    })
}

module.exports.getSmallestArticleGroup = function(req, res) {
    noOfArticles = 2;

    Revision.findEditSmallestGroup(noOfArticles, function(error, result) {
        if (error) {
            console.log("Cannot find smallest group")
        } else {
            console.log(result)
            res.json(result);
        }
    })
}

module.exports.getLongestHistory = function(req, res) {
    noOfArticles = 2;

    Revision.findLongestHistory(noOfArticles, function(error, result) {
        if (error) {
            console.log("Cannot find longest history")
        } else {
            console.log(result)
            res.json(result);
        }
    })
}

module.exports.getShortestHistory = function(req, res) {
    noOfArticles = 2;

    Revision.findShortestHistory(noOfArticles, function(error, result) {
        if (error) {
            console.log("Cannot find shortest history")
        } else {
            console.log(result)
            res.json(result);
        }
    })
}

module.exports.getBarChartDistributionYear = function(req, res) {
    Revision.barChartDistributionYear(function(error, result) {
        if (error) {
            console.log("Cannot find revision number distribution by year")
        } else {
            console.log(result)
            res.json(result);
        }
    })
}

module.exports.getPieChartDistributionUsertype = function(req, res) {
    Revision.pieChartDistributionUsertype(function(error, result) {
        if (error) {
            console.log("Cannot find revision number distribution by user type")
        } else {
            console.log(result)
            res.json(result);
        }
    })
}

