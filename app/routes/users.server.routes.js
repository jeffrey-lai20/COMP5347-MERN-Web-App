var express = require('express');
var router = express.Router();
var controller=require('../controllers/users.server.controller');

router.get('/main', controller.getAuth);
router.get('/error', controller.getError);
router.get('/resetPassword/:userName', controller.getQuestion)
router.get('/getUsers/', controller.getUsers);

router.post('/resetPasswordUsername', controller.resetPasswordUsername);
router.post('/getResetPasswordAnswer', controller.resetPasswordAnswer);
router.post('/register',controller.registerUser);
router.post('/login',controller.loginProcess);
router.post('/logout', controller.logout);

module.exports = router;