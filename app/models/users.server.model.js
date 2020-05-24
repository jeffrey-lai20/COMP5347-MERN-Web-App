const bcrypt = require('bcrypt');
var mongoose = require('./db')

const UserSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim:true
    },
    lastName:{
        type: String,
        required: true,
        trim:true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim:true
    },
    userName: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    password2: {
        type: String,
        required: true
    },
    resetQuestion: {
        type: String,
        required: true
    },
    resetAnswer: {
        type: String,
        required: true
    },
});

UserSchema.statics.createUser=function(newUser,callback){
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(newUser.password,salt,function(err,hash){
            newUser.password=hash;
            newUser.password2=hash;
            newUser.save(callback);
        })
    })
}

UserSchema.statics.getUserByUserName=function(userName,callback){
    var query={userName:userName};
    User.findOne(query,callback);
}

UserSchema.statics.comparePassword = function comparePassword(candidatePassword,hash,callback) {
    bcrypt.compare(candidatePassword, hash,function (err, isMatch){
        if (err) throw err;
        callback(null, isMatch);
    });
}
UserSchema.statics.auth = function (userName, password, callback) {
    User.findOne({
        userName: userName
    })
        .exec(function (err, user) {
            if (err) {
                return callback(err)
            } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            })
        });
}

UserSchema.statics.resetPassword=function(user,callback){
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(user.password,salt,function(err,hash){
            user.password=hash;
            user.password2=hash;
            user.save(callback);
        })
    })
}

UserSchema.statics.getQuestionByUsername = function(userName, callback) {
    return this.aggregate([
        {$match: {userName: userName}},
        {$group : {_id : { answer: "$answer"}}}
    ]).sort({name : 1}).exec(callback)
}

UserSchema.statics.getLoggedByUsername = function(userName, callback) {
    return this.aggregate([
        {$match: {userName: userName}},
        {$group : {_id : { loggedIn: "$loggedIn"}}}
    ]).sort({name : 1}).exec(callback)
}

UserSchema.statics.getQuestion = function(userName, callback) {
    return this.aggregate([
        {$match: {userName: userName}},
        {$group : {_id : { resetQuestion: "$resetQuestion"}}}
    ]).sort({name : 1}).exec(callback)
}

UserSchema.statics.findAllUsers = function(callback) {
    return this.aggregate([
        {$group : {_id : {userName : "$userName"}}}
    ]).sort({name : 1}).exec(callback)
}

var User = mongoose.model('User', UserSchema);
module.exports = User;