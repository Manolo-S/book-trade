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
		console.log('error storing book', err) 
	} else {
		mongoose.connection.close(function() { //TODO add err object as function parameter??
	        console.log('disconnected from DB');
		});
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
		bookModel.update({user: user}, {$push: {books: bookArr[0]}}, callback);
	}
}

function findUser(){
	if (mongoose.connection.readyState === 0){
		var db = mongoose.connect(dbURI, function(err){
			if (err){
				console.log(err);
			} else {
				bookModel.find({user: user}, storeBook);
			}
		});
	}
}


router.post('/', function(req, res){
	bookArr = req.body.data;
	user = bookArr[0].owner;
	findUser();
});

module.exports = router;


