const bcrypt = require ('bcrypt');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/WikipediaArticles', { useNewUrlParser: true, useUnifiedTopology: true  }, function () {
    console.log('mongodb connected')
});

module.exports = mongoose;

const UserSchema = mongoose.Schema ({
    firstName: {
        type: String,
        require: true,
        trim: true
    },

    lastName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type:String,
        unique: true,
        required: true,
        trim: true
    },

    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
    }
});

UserSchema.statics.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        })
    })
}

UserSchema.statics.getUserByUserName = function (userName, callback) {
    var query = {userName: userName};
    User.findOne(query, callback);
}

UserSchema.statics.getUserById = function (id, callback) {
    User.findById(id, callback);
}

UserSchema.statics.comparePassword = function comparePassword(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, has, function(err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}

UserSchema.statics.auth = function (userName, password, callback) {
    User.findOne({
       userName: userName
    }).exec(function(err, user) {
        if (err) {
            return callback(err)
        } else if (!user) {
            var err = new Error('User not found');
            err.status = 401;
            return callback(err);
        }
        bcrypt.compare(password, user.password, function(err, result) {
            if (result === true) {
                return callback(null, user);
            } else {
                return callback();
            }
        })
    });
}

var User = mongoose.model('User', UserSchema);
module.exports = User;
