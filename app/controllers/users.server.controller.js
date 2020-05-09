var express = require('express');
const User = require('../models/users.server.model');

module.exports.showIndex = function (req, res) {
    res.render('frontend/src/landingpage/index.js');
};

module.exports.register = function (req, res) {
    res.render('frontend/src/signup/index.js');
};

module.exports.registerUser = function (req, res) {
    // Validation
    if (req.body.firstName && req.body.lastName && req.body.email && req.body.userName &&
        req.body.password && req.body.password === req.body.password2) {
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var email = req.body.email;
        var userName = req.body.userName;
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
                    res.render('register', {
                        user: user,
                        mail: mail
                    });
                } else {
                    var newUser = new User({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        userName: userName,
                        password: password
                    });
                    User.createUser(newUser, function (err, user) {
                        if (err) throw err;
                        console.log(user);
                    });
                    req.flash('success_msg', 'Registered successfully');
                    res.redirect('/login');
                }
            });
        });
    }
    else {
        console.log("Info not completed!")
    }
};

// Login
module.exports.login = function (req, res) {
    res.render('frontend/src/login/index.js');
};

module.exports.loginProcess = function (req, res) {
    if (req.body.userName && req.body.password) {
        User.auth(req.body.userName, req.body.password, function (error, user) {
            if (error || !user) {
                req.flash('error', 'Username and password are incorrect');
                res.redirect('/login');
            } else {
                req.session.authenticated = true;
                req.session.user=req.body.userName;
                console.log("Successfully login!")
                req.flash('info', 'Login successfully!')
                res.redirect('/data');
            }
        });
    } else {
        req.flash('error', 'Username and password are incorrect');
        res.redirect('/login');
    }
};