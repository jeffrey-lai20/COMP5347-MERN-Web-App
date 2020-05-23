var express = require('express');

var Revision = require("../models/article")

// Author analytics controller
module.exports.getAuthor = function(req, res) {
    author = req.query.user;
    Revision.getAuthor(author, function(error, result) {
        if (error) {
            console.log(error)
        } else {
            console.log(result)
            res.json(result);
        }
    })
}

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

module.exports.getTimestampsAuthorArticle = function(req, res) {
    user = req.params.user;
    title = req.params.title;
    Revision.findAllAuthorRevisionsOnArticle(user, title, function(error, result) {
        if (error) {
            console.log(error)
        } else {
            console.log(result)
            res.json(result);
        }
    })
}