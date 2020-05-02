
var mongoose = require('./db')

var RevisionSchema = new mongoose.Schema(
		{title: String, 
		 timestamp:String, 
		 user:String, 
		 anon:String},
		 {
		 	versionKey: false
		})

RevisionSchema.statics.findTopTwoHighestRevisions = function(noOfArticles, callback){
    return this.find()
    .select('title')
	.sort({'timestamp':-1})
	.limit(noOfArticles)
	.exec(callback)
}

RevisionSchema.statics.findTopTwoLowestRevisions = function(callback){
	
	return this.find()
	.sort({'timestamp':-1})
	.limit(1)
	.exec(callback)
}



var Revision = mongoose.model('Revision', RevisionSchema, 'articles')

module.exports = Revision