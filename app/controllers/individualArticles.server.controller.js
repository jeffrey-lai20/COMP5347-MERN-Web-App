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

module.exports.getNumberOfRevisionsForArticle = function(req, res) {
    title = req.params.title;
    fromYear = req.params.fromYear;
    toYear = req.params.toYear;

    Revision.getRevisionNumber(title, fromYear, toYear, function(error, result) {
        if (error) {
            console.log(error)
        } else {
            console.log(result)
            res.json(result);
        }
    })
}


module.exports.getTopFiveUsers = function(req, res) {
    title = req.params.title;
    fromYear = req.params.fromYear;
    toYear = req.params.toYear;

    Revision.findTopFiveUsers(title, fromYear, toYear, function(error, result) {
        if (error) {
            console.log(error)
        } else {
            console.log(result)
            res.json(result);
        }
    })
}

module.exports.getArticleMinYear = function(req, res) {
    title = req.params.title;

    Revision.getMinArticleYears(title, function(error, result) {
        if (error) {
            console.log(error)
        } else {
            console.log(result)
            res.json(result);
        }
    })
}

module.exports.getArticleMaxYear = function(req, res) {
    title = req.params.title;

    Revision.getMaxArticleYears(title, function(error, result) {
        if (error) {
            console.log(error)
        } else {
            console.log(result)
            res.json(result);
        }
    })
}


module.exports.getPieChartData = function(req, res) {
    title = req.params.title;
    fromYear = req.params.fromYear;
    toYear = req.params.toYear;

    Revision.getIndividualPieChartData(title, fromYear, toYear, function(error, result) {
        if (error) {
            console.log(error)
        } else {
            console.log(result)
            res.json(result);
        }
    })
}

module.exports.getIndividualBarChartData = function(req, res) {
    title = req.params.title;
    fromYear = req.params.fromYear;
    toYear = req.params.toYear;

    Revision.individualBarChartDistributionYear(title, fromYear, toYear, function(error, result) {
        if (error) {
            console.log(error)
        } else {
            console.log(result)
            res.json(result);
        }
    })
}

module.exports.getIndividualBarChartDataUser = function(req, res) {
    title = req.params.title;
    user = req.params.user;
    fromYear = req.params.fromYear;
    toYear = req.params.toYear;

    Revision.individualBarChartDistributionYearUser(title, user, fromYear, toYear, function(error, result) {
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
module.exports.getAuthor = function(req, res) {
    author = "Ericcp3"
    Revision.getAuthor(author, function(error, result) {
        if (error) {
            console.log(error)
        } else {
            console.log(result)
            res.json(result);
        }
    })
}



module.exports.getAuthorArticle = function(req, res) {
    author = "Jarble"
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