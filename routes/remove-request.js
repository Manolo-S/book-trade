'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bookModel = require('../config/book-model');
var dbURI = 'mongodb://localhost/bookswap';

function callback (err, results){
	if (err) {
		console.log('error removing book', err) 
	}
	// } else {
	// 	mongoose.connection.close(function() { //TODO add err object as function parameter??
	//         console.log('disconnected from DB');
	// 	});
	// }
} 

router.post('/', function(req, res){
	if (req.body){
		res.sendStatus(200);
	}
	var industryIdentifier = req.body.industryIdentifier;
	var requestedBy = req.body.requestedBy;
	var timestamp = req.body.timestamp;
	var user = req.body.user;
	var owner = req.body.owner;
	if (mongoose.connection.readyState === 0){
		var db = mongoose.connect('mongodb://localhost/bookswap');
	}
	bookModel.update({user: owner, 'books.industryIdentifier': industryIdentifier, 'books.timestamp': timestamp}, {'$set': {'books.$.requestedBy': ""}}, callback);
	bookModel.update({user: user}, {$pull: {requests: {industryIdentifier: industryIdentifier, timestamp: timestamp}}}, callback);
});

module.exports = router;


