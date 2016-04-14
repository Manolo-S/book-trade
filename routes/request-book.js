'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bookModel = require('../config/book-model');
var dbURI = 'mongodb://localhost/bookswap';
var user;
var industryIdentifier;
var timestamp;
var request;
var requestedBy;
var bookDetails;

// function callback (err, results){
// 	if (err) {
// 		console.log('error storing book', err) 
// 	} else {
// 		mongoose.connection.close(function() { //TODO add err object as function parameter??
// 	        console.log('disconnected from DB');
// 		});
// 	}
// } 

// function checkTimeStamp(book){ //  $.post in addbook2.js repeatedly posted the same book if you wait a little, this function checks when the book was first added so repeat submits
// 	console.log('checkTimeStamp called', book.timestamp, timestamp); //will have the same timestamp and will not be entered into the DB
// 	if (book.timestamp === timestamp){
// 		console.log("book already in DB", book);
// 		bookInDb = true;
// 	}
// }

function callback (err, results){
	if (err) {
		console.log('error storing book', err) 
		mongoose.connection.close(function() { //TODO add err object as function parameter??
	        console.log('disconnected from DB');
		});
	} else {
		console.log(results);
		mongoose.connection.close(function() { //TODO add err object as function parameter??
	        console.log('disconnected from DB');
		});
	}
} 

function findBook(){
	if (mongoose.connection.readyState === 0){
		var db = mongoose.connect(dbURI, function(err){
			if (err){
				console.log(err);
			} else {
				console.log('findbook called');
				bookModel.update( {user: user, 'books.industryIdentifier': industryIdentifier, 'books.timestamp': timestamp}, {'$set': {'books.$.requestedBy': requestedBy}}, callback);
			}
		});
	} else {
		console.log('findbook called');
		bookModel.update({user: user, 'books.industryIdentifier': industryIdentifier, 'books.timestamp': timestamp}, {'$set': {'books.$.requestedBy': requestedBy}}, callback);
		// bookModel.update({$and: [{user: user}, {books: {$elemMatch: {industryIdentifier: industryIdentifier, timestamp: timestamp}}}]}, {requestedBy: requestedBy}, callback);
	}
}


router.post('/', function(req, res){
	if (req.body){
		res.sendStatus(200);
	}
	request = req.body.bookRequest;
	requestedBy = request.requestedBy;
	bookDetails = request.bookDetails.split(',');
	user = bookDetails[0] + ',' + bookDetails[1] + ',' + bookDetails[2];
	industryIdentifier = bookDetails[3];
	timestamp = bookDetails[4];
	console.log('request', requestedBy, user, industryIdentifier, timestamp);
	findBook();
});

module.exports = router;


