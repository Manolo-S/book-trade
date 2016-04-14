'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bookModel = require('../config/book-model');
var bookArr;
var user;
var requests = [];  
var dbURI = 'mongodb://localhost/bookswap';

function callback (err, results){
	if (err) {
		console.log('error removing book', err) 
	} else {
		console.log(results);
		mongoose.connection.close(function() { //TODO add err object as function parameter??
	        console.log('disconnected from DB');
		});
	}
} 

router.post('/', function(req, res){
	var industryIdentifier = req.body.industryIdentifier;
	var timestamp = req.body.timestamp;
	user = req.body.user;
	console.log(user, typeof(industryIdentifier), typeof(timestamp));
	if (mongoose.connection.readyState === 0){
		var db = mongoose.connect('mongodb://localhost/bookswap');
	}
	console.log('try removing the book');
	bookModel.update({'user': user}, {$pull: {books: {'industryIdentifier': industryIdentifier, 'timestamp': timestamp}}}, callback);
});

module.exports = router;


