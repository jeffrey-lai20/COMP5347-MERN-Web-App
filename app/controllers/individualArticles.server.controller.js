var express = require('express');

var Revision = require("../models/article")

module.exports.getAllArticles = function(req, res) {

    Revision.findAllArticles(function(error, result) {
        if (error) {
            console.log("Cannot find highest revision")
        } else {
            console.log(result)
            res.json(result);
        }
    })
}