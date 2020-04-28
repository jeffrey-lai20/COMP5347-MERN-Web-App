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

var Article = mongoose.model('Article', articleSchema, 'articles');

Article.find({}).exec(function(err, result) {
    if (err) {
        console.log("Query error")
    } else {
        console.log(result[0]);
    }
});