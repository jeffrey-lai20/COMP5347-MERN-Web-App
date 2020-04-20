var mongoose = require('mongoose');

mongoose.connect('mongod://localhost/WikipediaArticles', { useNewUrlParser: true}, function() {
console.log('mongodb connected');
})

var articleSchema = new mongoose.Schema({
    title: String,
    timestamp: String
},{
    versionKey: false
});

var Article = mongoose.model('Article', articleSchema, 'articles');

// Find all articles
Article.find({}, function(err, articles) {
        if (err) {
        console.log("Query error!")
        } else {
        console.log(articles)
        }
});