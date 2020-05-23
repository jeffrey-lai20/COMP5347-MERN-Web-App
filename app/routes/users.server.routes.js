var express = require('express');
var router = express.Router();
var controller=require('../controllers/users.server.controller');

router.get('/', controller.showIndex);
router.get('/login', controller.login);
router.get('/register', controller.register);
router.get('/main', controller.getAuth);
router.get('/error', controller.getError);
router.get('/resetPassword/', controller.getQuestion)

// router.get("/getResetPasswordQuestion", controller.getResetPasswordQuestion);
router.post('/resetPasswordUsername', controller.resetPasswordUsername);
router.post('/getResetPasswordAnswer', controller.resetPasswordAnswer);
router.post('/register',controller.registerUser);
router.post('/login',controller.loginProcess);
router.post('/logout', controller.logout);

module.exports = router;