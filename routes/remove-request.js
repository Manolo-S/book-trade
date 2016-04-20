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
	var user = req.body.user;
	var industryIdentifier = req.body.industryIdentifier;
	var timestamp = req.body.timestamp;
	var otherPartyUsername = req.body.otherPartyUsername;
	console.log(user, otherPartyUsername, industryIdentifier, timestamp);
	if (mongoose.connection.readyState === 0){
		var db = mongoose.connect('mongodb://localhost/bookswap');
	}
	bookModel.update({user: otherPartyUsername}, {'$pull': {requests: {industryIdentifier: industryIdentifier, timestamp: timestamp}}}, callback);
    bookModel.update({user: user}, {'$pull': {requests: {industryIdentifier: industryIdentifier, timestamp: timestamp}}}, callback);
});

module.exports = router;


