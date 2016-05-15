'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bookModel = require('../config/book-model');
var dbUrl = 'mongodb://localhost/bookswap';
// var dbUrl = 'mongodb://piet:snot@ds021000.mlab.com:21000/bookswap';


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
	var user = req.body.user;
	var industryIdentifier = req.body.industryIdentifier;
	var timestamp = req.body.timestamp;
	var otherPartyUsername = req.body.otherPartyUsername;
	console.log(user, otherPartyUsername, industryIdentifier, timestamp);
	if (mongoose.connection.readyState === 0){
		var db = mongoose.connect(dbUrl);
	}
	bookModel.update({user: otherPartyUsername}, {'$pull': {requests: {'offeredBook.owner': user, 'offeredBook.industryIdentifier': industryIdentifier, 'offeredBook.timestamp': timestamp}}}, callback);
    bookModel.update({user: user}, {'$pull': {requests: {'offeredBook.owner': user, 'offeredBook.industryIdentifier': industryIdentifier, 
    													'offeredBook.timestamp': timestamp, 'requestedBook.owner': otherPartyUsername}}}, callback);
});

module.exports = router;


