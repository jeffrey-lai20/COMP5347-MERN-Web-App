var mongoose = require('./db')
var fs = require('fs');
var readline = require('readline');

var RevisionSchema = new mongoose.Schema(
		{title		: String, 
		 timestamp	: Date, 
		 user		: String, 
		 anon		: String,
		 usertype	: String
		 }, {
		 	versionKey: false
		 })


// Query to find the top n articles with highest revisions
RevisionSchema.statics.findHighestRevisions = function(noOfArticle, callback){

	return this.aggregate([
		{$group : {_id : {title : "$title"}, count : {$sum : 1}}},
		{$sort 	: {count : -1}},
		{$limit : noOfArticle}
	]).exec(callback)
}

// Query to find the top n articles with lowest revisions
RevisionSchema.statics.findLowestRevisions = function(noOfArticle, callback){
	
	return this.aggregate([
		{$group : {_id : {title : "$title"}, count : {$sum : 1}}},
		{$sort 	: {count : 1}},
		{$limit : noOfArticle}
	]).exec(callback)
}


// Query to find the top n articles edited by the largest group of registered users
RevisionSchema.statics.findEditLargestGroup = function(noOfArticle, callback){

	return this.aggregate([
		{$match	: {usertype : 'registered'}},
		{$group : {_id : {"title" : "$title", "user" : "$user"}, count : {$sum : 1}}},
		{$group : {_id : "$_id.title", titleCount : {$sum : 1}}},
		{$sort 	: {titleCount : -1}},
		{$limit : noOfArticle}
	]).exec(callback)
}


// Query to find the top n articles edited by the smallest group of registered users
RevisionSchema.statics.findEditSmallestGroup = function(noOfArticle, callback) {

	return this.aggregate([
		{$match	: {usertype : 'registered'}},
		{$group : {_id : {"title" : "$title", "user" : "$user"}, count : {$sum : 1}}},
		{$group : {_id : "$_id.title", titleCount : {$sum : 1}}},
		{$sort 	: {titleCount : 1}},
		{$limit : noOfArticle}
	]).exec(callback)
}

// Query to find top n articles with the longest history
RevisionSchema.statics.findLongestHistory = function(noOfArticle, callback) {

	return this.aggregate([
		{$group : {_id : "$title", minTimestamp : {$min : "$timestamp"}}},
		{$sort 	: {minTimestamp : 1}},
		{$limit : noOfArticle}

	]).exec(callback)
}

// Query to find top n articles with the shortest history
RevisionSchema.statics.findShortestHistory = function(noOfArticle, callback) {

	return this.aggregate([
		{$group : {_id : "$title", minTimestamp : {$min : "$timestamp"}}},
		{$sort 	: {minTimestamp : -1}},
		{$limit : noOfArticle}

	]).exec(callback)
}

/*
	Individual Articles
*/

RevisionSchema.statics.findAllArticles = function(callback){
	return this.aggregate([
		{$group : {_id : {title : "$title"}, count : {$sum : 1}}}
	]).exec(callback)
}

RevisionSchema.statics.findTopFiveUsers = function(Ititle, callback) {
	this.aggregate([
		{$match: {title: Ititle}},
		{$group: {_id: {userid: "$userid", user: "$user"}, userCount : {$sum:1}}},
		{$sort: {userCount:-1}},
		{$limit:5}
	]).exec(callback)
}

var Revision = mongoose.model('Revision', RevisionSchema, 'articles')

/*
	Constructing Usertype with text file
*/
// Reading text:
function addUsertypeFromTxt(model, path, type){
	var userArray = [];
	fs.readFileSync(path).toString().split('\n').forEach(line=>{ userArray.push(line); })
	model.updateMany(
		{ $and: [{ user : {$in : userArray}}, {usertype : {$exists : false}}]},
		{ $set:{"usertype":type}},
	    function(error){ if(error){ console.error(error)} }
  )
}

// Administrator : admin
// Bot : bot
// Registered User : registered
addUsertypeFromTxt(Revision, './app/views/frontend/administrators.txt', "admin")
addUsertypeFromTxt(Revision, './app/views/frontend/bots.txt', "bot")
Revision.updateMany(
    { $and:[{usertype:{$exists:false}},{anon:{$exists:false}}] },
    { $set:{"usertype":"registered"}},
    function(error){ if(error){ console.error(error)} }
)
// If Anon is true, anonymous
Revision.updateMany(
    {$and : [{usertype : {$exists : false}}, {anon : {$exists : true}}]},
    {$set : {"usertype":"anonymous"}},
    function(error){ if(error){ console.error(error)} }
)

module.exports = Revision