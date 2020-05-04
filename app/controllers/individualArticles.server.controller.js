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

    Revision.findTopFiveUsers(title, function(error, result) {
        if (error) {
            console.log(error)
        } else {
            console.log(result)
            res.json(result);
        }
    })
}