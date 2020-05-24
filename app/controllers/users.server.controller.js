var express = require('express');
const User = require('../models/users.server.model');
let num = 0;

//Check session authentication
module.exports.getAuth = function(req, res) {
    if (req.session.user && req.session.authenticated) {
        res.json(req.session.user && req.session.authenticated);
    } else {
        res.redirect('/');
    }
}

module.exports.getError = function(req, res) {
    // res.send('oml')
    console.log(res.status)
    if (num >= 400) {
        res.status(num).send('Sorry, there\'s been an error');
        num = 0;
        console.log("Success!");
    } else if (num >= 200) {
        res.status(num).send('Success');
    }
    console.log(num)


}

module.exports.showIndex = function(req, res) {
    console.log("We get here tho");
    res.send(req.flash('message'));


}

module.exports.logout = function(req, res) {
    console.log("Logging out");
    delete req.session.authenticated;
    delete req.session.user;
    res.redirect('/');
}




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
                    console.log("Invalid username or email");
                    req.flash('error', 'Registration failed. Please try again.');
                    num = 409;
                    res.redirect('/');
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
                        num = 406;
                        console.log(user);
                        res.redirect('/');
                    });
                    req.flash('success_msg', 'Registration successful.');
                    num = 202;
                    res.redirect('/');
                }
            });
        });
    }
    else {
        num = 406;
        console.log("Invalid input.")
        res.redirect('/');
    }
};

module.exports.loginProcess = function (req, res) {
    if (req.body.userName && req.body.password) {
        User.auth(req.body.userName, req.body.password, function (error, user) {
            if (error || !user) {
                num = 406;
                res.redirect('/');
            } else {
                req.session.authenticated = true;
                req.session.user=req.body.userName;
                //req.session.userId = user._id;
                console.log("Logged in successfully.");
                req.flash('info', 'Login successfully!');
                num = 202;
                res.redirect('/');
            }
        });
    } else {
        num = 406;
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
            num = 406;
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
            res.redirect('/resetPassword?user=' + user.userName);
        } else {
            console.log("User does not exist.")
            console.log(err)
            num = 406;
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
                        num = 202;
                        res.redirect('/login');
                    });
                    console.log("Password has been reset.")
                    req.flash('success_msg', 'Registration successful.');
                    res.redirect('/login');
                } else {
                    console.log("Mismatching Passwords.");
                    num = 406;
                    res.redirect('/login');
                }
            } else {
                console.log("Wrong Password Reset Answer.");
                num = 406;
                res.redirect('/login');
            }

        } else {
            console.log("User does not exist.")
            console.log(err)
            num = 406;
            res.redirect('/login');
        }
    });
}

module.exports.getQuestion = function (req, res) {
    userName = req.params.userName;
    User.findOne({
        userName: {
            "$regex": "^" + userName + "\\b",
            "$options": "i"
        }
    }, function (err, user) {
        if (user) {
            User.getQuestion(userName, function(error, result) {
                if (error) {
                    num = 406;
                    console.log(error)
                } else {
                    console.log(result)
                    res.json(result);
                }
            })
        } else {
            console.log("User does not exist.")
            console.log(err)
            num = 406;
            res.redirect('/login');
        }
    });
}

module.exports.getUsers = function (req, res) {
    User.findAllUsers(function(error, result) {
        if (error) {
            num = 406;
            console.log(error)
        } else {
            console.log(result)
            res.json(result);
        }
    })
}