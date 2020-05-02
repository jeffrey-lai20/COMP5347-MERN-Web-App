
var mongoose = require('./db')

var RevisionSchema = new mongoose.Schema(
		{title: String, 
		 timestamp:String, 
		 user:String, 
		 anon:String},
		 {
		 	versionKey: false
		})

// Query to find the top 2 articles with highest revisions
RevisionSchema.statics.findHighestRevisions = function(noOfArticle, callback){

	return this.aggregate([
		{$group : {_id : {title : "$title"}, count : {$sum : 1}}},
		{$sort 	: {count:-1}},
		{$limit : noOfArticle}
	]).exec(callback)
}

// Query to find the top 2 articles with lowest revisions
RevisionSchema.statics.findLowestRevisions = function(noOfArticle, callback){
	
	return this.aggregate([
		{$group : {_id : {title : "$title"}, count : {$sum : 1}}},
		{$sort 	: {count:1}},
		{$limit : noOfArticle}
	]).exec(callback)
}


// Query to find the top 2 articles edited by the largest group of registered users
RevisionSchema.static.findEditLargestGroup = function(noOfArticle, callback){

	return this.aggregate([
		{$group : {_id : {"title" : "$title", "user" : "$user"}, count : {$sum : 1}}},
		{$group : {_id : "$_id.title", uniqueTitleCount : {$sum : 1}}},
		{$sort 	: {uniqueTitleCount : -1}},
		{$limit : noOfArticle}
	]).exec(callback)
}


// Query to find the top 2 articles edited by the smallest group of registered users
RevisionSchema.static.findEditSmallestGroup = function(noOfArticle, callback) {

	return this.aggregate([
		{$group : {_id : {"title" : "$title", "user" : "$user"}, count : {$sum : 1}}},
		{$group : {_id : "$_id.title", uniqueTitleCount : {$sum : 1}}},
		{$sort 	: {uniqueTitleCount : 1}},
		{$limit : noOfArticle}
	]).exec(callback)
}

// Query to find top 3 articles with the longest history
RevisionSchema.static.findLongestHistory = function(noOfArticle, callback) {

	return this.aggregate([
		{$group : {_id : "$title", minTimestamp : {$min : "$timestamp"}}},
		{$sort 	: {minTimestamp : 1}},
		{$limit : noOfArticle}

	]).exec(callback)
}

// Query to find top 3 articles with the shortest history
RevisionSchema.static.findShortestHistory = function(noOfArticle, callback) {

	return this.aggregate([
		{$group : {_id : "$title", minTimestamp : {$min : "$timestamp"}}},
		{$sort 	: {minTimestamp : -1}},
		{$limit : noOfArticle}

	]).exec(callback)
}

var Revision = mongoose.model('Revision', RevisionSchema, 'articles')

module.exports = Revision