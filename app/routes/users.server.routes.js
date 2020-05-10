var express = require('express');
var router = express.Router();
var controller=require('../controllers/users.server.controller');

router.get('/', controller.showIndex);
router.get('/login', controller.login);
router.get('/register', controller.register);
router.get('/logout', function (req, res, next) {
    delete req.session.authenticated;
    delete req.session.user;
    res.redirect('/');
});
router.get('/resetPasswordUsername', controller.resetPasswordUsername);
router.get('/resetPasswordAnswer', controller.resetPasswordAnswer);
router.get('/resetPasswordNew', controller.resetPasswordNew);

router.post('/register',controller.registerUser);
router.post('/login',controller.loginProcess);

module.exports = router;