var express = require('express')
var path = require('path')

var analyticsRouter = require('./app/routes/analytics.server.routes');

var app = express()

app.set('views', path.join(__dirname,'app/views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', analyticsRouter);

app.listen(3000, function () {
  console.log('survey app listening on port 3000!')
})