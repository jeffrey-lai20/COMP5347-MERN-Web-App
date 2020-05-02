/*

Testing mongoDB queries 

*/


var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/WikipediaArticles', { useNewUrlParser: true },function () {
	  console.log('mongodb connected')
	});


var articleSchema = new mongoose.Schema(
		{title: String, 
		 timestamp:String, 
		 user:String, 
		 anon:String},
		 {
			    versionKey: false 
		});

var ArticleTest = mongoose.model('Article', articleSchema, 'articles');

ArticleTest.find({}).limit(1).exec(function(err, result) {
    if (err) {
        console.log("Query error")
    } else {
        console.log(result[0]);
    }
});

module.exports = ArticleTest