/**
 * The file to start a server
 *
 */

var express = require('express')
var path = require('path')

var analyticsRouter = require('./app/routes/analytics.server.routes');
var userRouter = require('./app/routes/users.server.routes');

var app = express()
app.use(express.static(path.join(__dirname, '/app/views/frontend')))
app.set('views', path.join(__dirname,'app/views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', analyticsRouter);
app.use('/', userRouter);

app.listen(5000, function () {
  console.log('survey app listening on port 5000!')
})