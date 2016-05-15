'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bookModel = require('../config/book-model.js');
var books;
var dbUrl = 'mongodb://localhost/bookswap';
// var dbUrl = 'mongodb://piet:snot@ds021000.mlab.com:21000/bookswap';

router.use('/', function(req, res, next){
	var userid = req.body.user;
	console.log('user', userid);
	if (mongoose.connection.readyState === 0){
		var db = mongoose.connect(dbUrl);
	}

	bookModel.find({user: userid}, function(err, results ){
		console.log('bookmodel.find called')
		if (err){
			console.log(err);
			return;
		} else if (results.length !== 0){
			books = results[0].books;
			console.log(books);

		mongoose.connection.close(function(){
			console.log('Mongoose connection disconnected');
		});
		next();
		}
	 });
});

router.post('/', function(req, res){
	if (books){
		res.json(books);
	}
});


module.exports = router;