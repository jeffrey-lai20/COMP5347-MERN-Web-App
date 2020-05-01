var express = require('express');

var Article = require("../models/article")

module.exports.showLoginPage = function(req, res) {
    res.render('login.pug');
}

module.exports.showMainPage = function(req, res) {

    Article.findAll(function(err, result) {
         if (err) {
            console.log("error")
         } else {
            console.log(result[0]);
            res.render('main.pug', {result: result[0]});
         }

    })

}