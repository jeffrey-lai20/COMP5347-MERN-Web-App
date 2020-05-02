
var mongoose = require('./db')

var RevisionSchema = new mongoose.Schema(
		{title: String, 
		 timestamp:String, 
		 user:String, 
		 anon:String},
		 {
		 	versionKey: false
		})

// Query to find the top n articles with highest revisions
RevisionSchema.statics.findHighestRevisions = function(noOfArticles, callback){
    return this.find()
    .select('title')
	.sort({'timestamp':-1})
	.limit(noOfArticles)
	.exec(callback)
}

RevisionSchema.statics.findLowestRevisions = function(noOfArticles, callback){
	
	return this.find()
	.sort({'timestamp':-1})
	.limit(noOfArticles)
	.exec(callback)
}



var Revision = mongoose.model('Revision', RevisionSchema, 'articles')

module.exports = Revision