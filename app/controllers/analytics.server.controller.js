var express = require('express');

var Revision = require("../models/article")

module.exports.getTopArticleRevisions = function(req, res) {
    noOfArticles = 2;

    Revision.findHighestRevisions(noOfArticles, function(error, result) {
        if (error) {
            console.log("error")
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
            console.log("error")
        } else {
            console.log(result)
            res.json(result);
        }
    })
}
