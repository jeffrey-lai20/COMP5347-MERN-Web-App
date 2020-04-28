
var mongoose = require('./database')

var ArticleSchema = new mongoose.Schema({
    title: String,
    timestamp:String,
    user:String},
{
    versionKey: false
})

ArticleSchema.statics.findAll = function(callback) {
    return this.find({})
    .exec(callback)
}

var Article = mongoose.model('Article', ArticleSchema, 'revisions')

module.exports = Article