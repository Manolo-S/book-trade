'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bookModel = require('../config/book-model.js');
var books;

router.use('/', function(req, res, next){
	var userid = req.body.user;
	console.log('user', userid);
	if (mongoose.connection.readyState === 0){
		var db = mongoose.connect('mongodb://localhost/bookswap');
		// var db = mongoose.connect('')
	}

	bookModel.find({user: userid}, function(err, results ){
		console.log('bookmodel.find called')
		if (err){
			console.log(err);
			return;
		} else if (results.length !== 0){
			books = results[0].books;
			console.log('books', books);

		mongoose.connection.close(function(){
			console.log('Mongoose connection disconnected');
		});
		next();
		}
	 });
});

router.post('/', function(req, res){
	console.log('end of getmybooks route');
	if (books){
		res.json(books);
	}
});


module.exports = router;