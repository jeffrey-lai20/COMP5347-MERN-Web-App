var React = require('react');
var path = require("path");
var bodyParser = require("body-parser");

var router = require("./app/routes/app.server.routes");

var app = express();

React.createClass({
    render: function(){/*Blah Blah Blah*/}
})

app.use(express.static(path.join(__dirname, "app")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.set('views', path.join(__dirname, "app", "views"));
app.use("/", router);
app.use("/showOne", router);
app.use("/revision", router);
app.use('/OverallData', router);
app.use('/OneData', router);
app.use('/UserData', router);

app.listen(3000, function() {
    console.log("The app is running");
});