'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bookModel = require('../config/book-model');
var industryIdentifier;
var timestamp;
var user;
var requests;  
var dbURI = 'mongodb://localhost/bookswap';

function callback (err, results){
	if (err) {
		console.log('error removing book', err) 
	}
} 

function findRequests(r){
	if (r.requestedBook.industryIdentifier === industryIdentifier && r.requestedBook.timestamp === timestamp){
		var otherUser = r.offeredBook.owner;
		bookModel.update({user: otherUser}, {$pull: {requests: {'requestedBook.industryIdentifier': industryIdentifier, 'requestedBook.timestamp': timestamp}}}, callback);
		bookModel.update({user: otherUser}, {$pull: {requests: {'offeredBook.industryIdentifier': industryIdentifier, 'offeredBook.timestamp': timestamp}}}, callback);
		console.log('otherUser', otherUser);
	}
	
}

function callback2 (err, results){
	console.log('callback2');
	if (err) {
		console.log('error removing book', err)
		return;
	}
	requests = results[0].requests;
	// console.log('requests', requests);
	requests.map(findRequests);
}


router.post('/', function(req, res){
	if (req.body){
		res.sendStatus(200);
	}
	industryIdentifier = req.body.industryIdentifier;
	timestamp = req.body.timestamp;
	user = req.body.user;
	if (mongoose.connection.readyState === 0){
		var db = mongoose.connect('mongodb://localhost/bookswap');
	}
	// bookModel.update({user: user}, {$pull: {books: {'industryIdentifier': industryIdentifier, 'timestamp': timestamp}}}, callback);
	bookModel.find({user: user}, callback2);

	bookModel.update({user: user}, {$pull: {requests: {'offeredBook.industryIdentifier': industryIdentifier,
												'offeredBook.timestamp': timestamp}}}, callback);
	bookModel.update({user: user}, {$pull: {requests: {'requestedBook.industryIdentifier': industryIdentifier,
												'requestedBook.timestamp': timestamp}}}, callback);
});

module.exports = router;


