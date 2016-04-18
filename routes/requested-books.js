'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bookModel = require('../config/book-model.js');
var requests;
var user;

router.use('/', function(req, res, next){
	user = req.body.user;
	console.log('user', user);
	if (mongoose.connection.readyState === 0){
		var db = mongoose.connect('mongodb://localhost/bookswap');
		// var db = mongoose.connect('')
	}

	bookModel.find({user: user}, function(err, results ){
		console.log('find my requests')
		if (err){
			console.log(err);
			return;
		} else if (results.length !== 0){
			requests = results[0].requests;
			requests = {'requests': requests};
			console.log(requests);

		// mongoose.connection.close(function(){
		// 	console.log('Mongoose connection disconnected');
		// });
		next();
		}
	 });
});

// router.use('/', function(req, res, next){
// 	console.log('', user);
	
// 	bookModel.find({books: {$elemMatch: {requestedBy: user}}}, function(err, results ){
// 		console.log('find requests for my books')
// 		if (err){
// 			console.log(err);
// 			return;
// 		} else if (results.length !== 0){
// 			// books = results[0].books;
// 			console.log(results);

// 		mongoose.connection.close(function(){
// 			console.log('Mongoose connection disconnected');
// 		});
// 		next();
// 		}
// 	 });
// });

router.post('/', function(req, res){
	if (requests){
		// res.sendStatus(200);
		res.json(requests);
	}
});


module.exports = router;