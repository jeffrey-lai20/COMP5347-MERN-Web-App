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
    Revision.getLatestRevision(title, function(error, articleResult) {
    	let currentDate = new Date();
    	let prevDate = new Date(articleResult[0].date);
    	
    	let timeDifference = Math.floor((currentDate - prevDate)/(1000 * 60 * 60 * 24));
        console.log("Previous Date of the article: " + prevDate + "Time Difference: " + timeDifference);

    	// For Articles older than 24 hours: Update
    	if (timeDifference > 1) {
    		Revision.queryWiki(title, prevDate, function(error, result) {
    			res.send({result:result});
    		})
    	// For articles within 24 hours
    	} else {
            console.log(res);
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



