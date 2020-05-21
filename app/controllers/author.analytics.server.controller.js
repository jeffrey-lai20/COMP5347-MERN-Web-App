var express = require('express');

var Revision = require("../models/author.analytics.server.model")
var Revision = require("../models/article")


module.exports.getAuthorUser = function(req, res) {
    noOfArticles = Number(req.query.topcount);

    Revision.findAuthorUser( function(error, result) {
        if (error) {
            console.log("Cannot find highest revision")
        } else {
            console.log(result)
            res.json(result);
        }
    })
}

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