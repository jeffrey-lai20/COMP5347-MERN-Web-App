var express = require('express');

var Revision = require("../models/article")

module.exports.getTopArticleRevisions = function(req, res) {
    noOfArticles = 2;

    Revision.findTopTwoHighestRevisions(noOfArticles, function(error, result) {
        if (error) {
            console.log("error")
        } else {
            console.log(result)
            res.json(result);
        }
    })
}
