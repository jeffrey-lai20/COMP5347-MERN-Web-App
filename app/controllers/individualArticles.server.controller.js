var express = require('express');

var Revision = require("../models/article")

module.exports.getAllArticles = function(req, res) {

    Revision.findAllArticles(function(error, result) {
        if (error) {
            console.log(error)
        } else {
            console.log(result)
            res.json(result);
        }
    })
}


module.exports.getTopFiveUsers = function(req, res) {
    title = req.query.title;
    fromYear = req.query.from;
    toYear = req.query.to;

    Revision.findTopFiveUsers(title, fromYear, toYear, function(error, result) {
        if (error) {
            console.log(error)
        } else {
            console.log(result)
            res.json(result);
        }
    })
}


module.exports.getBarChartData = function(req, res) {
    title = req.query.title;

    Revision.getIndividualBarChartData(title, function(error, result) {
        if (error) {
            console.log(error)
        } else {
            console.log(result)
            res.json(result);
        }
    })
}

module.exports.getLatestRevisionForArticle = function(req, res) {
    title = req.query.title;

    Revision.getLatestRevision(title, function(error, result) {
        if (error) {
            console.log(error)
        } else {
            console.log(result)
            res.json(result);
        }
    })


}

// Author analytics controller
module.exports.getAllAuthors = function(req, res) {

    Revision.findAllAuthors(function(error, result) {
        if (error) {
            console.log(error)
        } else {
            console.log(result)
            res.json(result);
        }
    })
}

