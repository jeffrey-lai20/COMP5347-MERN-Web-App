
// var mongoose = require('./database')
var mongoose = require('mongoose');

mongoose.connect('mongod://localhost/WikipediaArticles', { useNewUrlParser: true}, function () {
    console.log('mongod connected')
})

var ArticleSchema = new mongoose.Schema({
    title: String,
    timestamp:String,
    user:String},
{
    versionKey: false
})

ArticleSchema.statics.findAll = function(callback) {
    return this.find({})
    .limit(1)
    .exec(callback)
}

var Article = mongoose.model('Article', ArticleSchema, 'articles')

module.exports = Article