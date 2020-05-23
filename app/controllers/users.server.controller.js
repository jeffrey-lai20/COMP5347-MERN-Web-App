var express = require('express');
const User = require('../models/users.server.model');

//Check session authentication
module.exports.getAuth = function(req, res) {
    if (req.session.user && req.session.authenticated) {
        res.json(req.session.user && req.session.authenticated);
    } else {
        res.redirect('/');
    }
}

module.exports.getError = function(req, res) {
    if (req.session.userName) {
        res.json(req.session.userName)
        delete req.session.userName;
    }
}

module.exports.logout = function(req, res) {
    console.log("Logging out");
    delete req.session.authenticated;
    delete req.session.user;
    res.redirect('/');
}


// Index
module.exports.showIndex = function (req, res) {
    res.render('app/views/frontend/src/landingpage/index.js');
};

// Register
module.exports.register = function (req, res) {
    res.render("app/views/frontend/src/landingpage/registerDialog/main.js");
};

module.exports.registerUser = function (req, res) {
    // Validation

    if (req.body.firstName && req.body.lastName && req.body.email
        && req.body.userName && req.body.resetQuestion && req.body.resetAnswer
        && req.body.password && req.body.password === req.body.password2) {
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var email = req.body.email;
        var userName = req.body.userName;
        var resetQuestion = req.body.resetQuestion;
        var resetAnswer = req.body.resetAnswer;
        var password = req.body.password;
        var password2 = req.body.password2;

        //checking for email and username are already taken
        User.findOne({
            userName: {
                "$regex": "^" + userName + "\\b",
                "$options": "i"
            }
        }, function (err, user) {
            User.findOne({
                email: {
                    "$regex": "^" + email + "\\b",
                    "$options": "i"
                }
            }, function (err, mail) {
                if (user || mail) {
                    res.render('/register', {
                        user: user,
                        mail: mail
                    });
                } else {
                    var newUser = new User({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        userName: userName,
                        password: password,
                        password2: password2,
                        resetQuestion: resetQuestion,
                        resetAnswer: resetAnswer
                    });
                    User.createUser(newUser, function (err, user) {
                        if (err) throw err;
                        console.log(user);
                    });
                    req.flash('success_msg', 'Registration successful.');
                    res.redirect('/login');
                }
            });
        });
        //}
    }
    else {
        console.log("Invalid input.")
        // console.log("We have: " + req.body.firstName);
        // console.log("We have: " + req.body.lastName);
        // console.log("We have: " + req.body.email);
        // console.log("We have: " + req.body.userName);
        // console.log("We have: " + resetQuestion);
        // console.log("We have: " + resetQuestion);
        // console.log("We have: " + req.body.password);
        // console.log("We have: " + password2);
    }
};

// Login
module.exports.login = function (req, res) {
    res.render('app/views/frontend/src/landingpage/loginDialog/main.js');
};

module.exports.loginProcess = function (req, res) {
    if (req.body.userName && req.body.password) {
        User.auth(req.body.userName, req.body.password, function (error, user) {
            if (error || !user) {
                req.session.userName=req.body.userName;
                res.redirect('/');
            } else {
                req.session.authenticated = true;
                req.session.user=req.body.userName;
                //req.session.userId = user._id;
                console.log("Logged in successfully.");
                req.flash('info', 'Login successfully!');
                res.redirect('/');
            }
        });
    } else {
        // req.session.user=req.body.userName;
        // // console.log("BRUHH");
        //
        // // console.log(req.session.user);
        // req.flash('error', 'Username and password are incorrect');
        res.redirect('/');
    }
};

module.exports.resetPasswordUsername = function (req, res) {
    var userName = req.body.userName;
    User.findOne({
        userName: {
            "$regex": "^" + userName + "\\b",
            "$options": "i"
        }
    }, function (err, user) {
        if (user) {
            console.log("Question: " + user.resetQuestion)
            req.flash('info', 'Login failed!');

        } else {
            console.log("User does not exist.")
            console.log(err)
            res.redirect('/login');
        }
    });
}

module.exports.getResetPasswordQuestion = function (req, res) {
    var userName = req.body.userName;
    console.log("Reached question stuff idk");
    User.findOne({
        userName: {
            "$regex": "^" + userName + "\\b",
            "$options": "i"
        }
    }, function (err, user) {
        if (user) {
            console.log(user.resetQuestion)
        } else {
            console.log("User does not exist.")
            console.log(err)
            res.redirect('/login');
        }
    });
}


module.exports.resetPasswordAnswer = function (req, res) {
    var userName = req.body.userName;
    User.findOne({
        userName: {
            "$regex": "^" + userName + "\\b",
            "$options": "i"
        }
    }, function (err, user) {
        if (user) {
            if (user.resetAnswer === req.body.resetAnswer) {
                if (req.body.password === req.body.password2) {
                    user.password = req.body.password
                    user.password2 = req.body.password2
                    User.resetPassword(user, function (err, user) {
                        if (err) throw err;
                        console.log(user);
                    });
                    console.log("Password has been reset.")
                    req.flash('success_msg', 'Registration successful.');
                    res.redirect('/login');
                } else {
                    console.log("Mismatching Passwords.");
                    res.redirect('/login');
                }
            } else {
                console.log("Wrong Password Reset Answer.");
                res.redirect('/login');
            }

        } else {
            console.log("User does not exist.")
            console.log(err)
            res.redirect('/login');
        }
    });
}

