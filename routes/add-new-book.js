'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bookModel = require('../config/book-model');
var bookArr;
var user;
var requests = [];  
var dbUrl = 'mongodb://localhost/bookswap';
// var dbUrl = 'mongodb://piet:snot@ds021000.mlab.com:21000/bookswap';
var timestamp;
var bookInDb;

function callback (err, results){
	if (err) {
		console.log('error storing book', err) 
	} else {
		mongoose.connection.close(function() { //TODO add err object as function parameter??
	        console.log('disconnected from DB');
		});
	}
} 

function checkTimeStamp(book){ //  $.post in addbook2.js repeatedly posted the same book if you wait a little, this function checks when the book was first added so repeat submits
	console.log('checkTimeStamp called', book.timestamp, timestamp); //will have the same timestamp and will not be entered into the DB
	if (book.timestamp === timestamp){
		console.log("book already in DB", book);
		bookInDb = true;
	}
}


function storeBook(err, books){
	if (err){
		console.log(err);
		return;
	}

	if (books.length === 0){
		bookModel.create({user: user, books: bookArr, requests: requests}, callback);
	} else {
		bookInDb = false;
        books[0].books.map(checkTimeStamp);
        if (bookInDb === false){
			bookModel.update({user: user}, {$push: {books: bookArr[0]}}, callback);
		}
	}
}

function findUser(){
	if (mongoose.connection.readyState === 0){
		var db = mongoose.connect(dbUrl, function(err){
			if (err){
				console.log(err);
			} else {
				bookModel.find({user: user}, storeBook);
			}
		});
	} else {
		bookModel.find({user: user}, storeBook);
	}
}


router.post('/', function(req, res){
	if (req.body){
		res.sendStatus(200);
	}

	bookArr = req.body.data;
	user = bookArr[0].owner;
	timestamp = bookArr[0].timestamp;
	findUser();
});

module.exports = router;


