var express = require('express');

var Article = require("../models/article")

// An api endpoint that returns a short list of items
module.exports.getList = function(req, res) {
    var list = ["item1", "item2", "item3"];
    res.json(list);
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