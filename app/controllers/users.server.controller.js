var express = require('express');
const User = require('../models/users.server.model');


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
        // console.log("We have: " + req.body.password);
        // console.log("We have: " + req.body.password2);
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
                req.flash('error', 'Username or password incorrect');
                res.redirect('/login');
            } else {
                req.session.authenticated = true;
                req.session.user=req.body.userName;
                //req.session.userId = user._id;
                console.log("Logged in successfully.")
                req.flash('info', 'Login successfully!')
                res.redirect('/main');
            }
        });
    } else {
        req.flash('error', 'Username and password are incorrect');
        res.redirect('/login');
    }
};