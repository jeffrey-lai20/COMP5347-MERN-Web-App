var mongoose = require('./db')

var ArticleSchema = new mongoose.Schema({
    title: String
},{
    versionKey: false
});

ArticleSchema.statics.find = function(title, callback) {
    return this.find({'title': title})
    .exec(callback)
}

var Article = mongoose.model('Article', ArticleSchema, 'articles')

module.exports = Article