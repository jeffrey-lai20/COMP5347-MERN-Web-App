var express = require('express');
var router = express.Router();
var controller=require('../controllers/users.server.controller');

router.get('/', controller.showIndex);
router.get('/login', controller.login);
router.get('/register', controller.register);
router.post('/logout', controller.logout);
//     function (req, res) {
//     console.log("Logging out");
//     delete req.session.authenticated;
//     delete req.session.user;
//     res.redirect('/');
// });
router.get('/main', controller.getAuth);

// router.get("/getResetPasswordQuestion", controller.getResetPasswordQuestion);
router.post('/resetPasswordUsername', controller.resetPasswordUsername);
router.post('/getResetPasswordAnswer', controller.resetPasswordAnswer);
router.post('/register',controller.registerUser);
router.post('/login',controller.loginProcess);

module.exports = router;