/**
 * The file to start a server
 *
 */

var express = require('express')
var path = require('path')

//Login stuff idk
var cookieParser=require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session=require('express-session');

var analyticsRouter = require('./app/routes/analytics.server.routes');
var individualArticlesRouter = require('./app/routes/individualArticles.server.routes');
var userRoutes = require('./app/routes/users.server.routes');


var app = express()
app.use(express.static(path.join(__dirname, '/app/views/frontend')))
app.set('views', path.join(__dirname,'app/views'));
app.use(express.static(path.join(__dirname, 'public')));

//Login stuff idk
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

// Express Session
app.use(session({
  key: 'user_sid',
  secret: 'group22',
  resave: true,
  saveUninitialized: false,
  authenticated: false,
  cookie: {
    expires: 300000
  }
}));
app.use(function(req,res,next){
  res.locals.session = req.session;
  next();
});

// Connect Flash
app.use(flash());
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/', analyticsRouter);
app.use('/', individualArticlesRouter);
app.use('/', userRoutes);

app.listen(5000, function () {
  console.log('survey app listening on port 5000!')
})