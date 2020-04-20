var express = require('express');

module.exports.showMainPage = function(req, res) {
    res.render('main.pug');
}