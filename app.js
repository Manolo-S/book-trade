'use strict';
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');

var index = require('./routes/index');
var addNewBook = require('./routes/add-new-book');
var addBooks = require('./routes/addbooks');
var myBooks = require('./routes/mybooks');
var swaps = require('./routes/swaps');
var requestedBooks = require('./routes/requested-books');
var getMyBooks = require('./routes/getmybooks');
var getAllBooks =require('./routes/getallbooks');
var removeBook = require('./routes/remove-book');
var removeRequest = require('./routes/remove-request');
var requestBook = require('./routes/requestbook');
var requestSwap = require('./routes/requestswap');
var auth = require('./routes/auth');


var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({secret: 'anything'})); //TODO bekijk Express-session package

require('./config/passport')(app);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/addbooks', addBooks);
app.use('/auth', auth);
app.use('/add-new-book', addNewBook);
app.use('/mybooks', myBooks);
app.use('/get-my-books', getMyBooks);
app.use('/get-all-books', getAllBooks);
app.use('/remove-book', removeBook);
app.use('/request-book', requestBook);
app.use('/swaps', swaps);
app.use('/requested-books', requestedBooks);
app.use('/remove-request', removeRequest);
app.use('/request-swap', requestSwap);

app.use(logger('dev'));

if (app.get('env') === 'development') {
  var webpackMiddleware = require("webpack-dev-middleware");
  var webpack = require('webpack');

  var config = require('./webpack.config');

  app.use(webpackMiddleware(webpack(config), {
    publicPath: "/build/js",

    headers: { "X-Custom-Webpack-Header": "yes" },

    stats: {
      colors: true
    }
  }));
}



// app.use('/auth', auth);


app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + server.address().port);
});