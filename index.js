var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var index = require('./App/Routes/routes');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static(__dirname + '/views'));
app.use('/', index);
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.send(err.message);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
	console.log('Server is started on :' + PORT);
});