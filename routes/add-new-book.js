'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bookModel = require('../config/book-model');
var booksArray;
var user;
var requests = [];  //TODO make empty request array


// router.use('/', function(req, res, next){
// 	if (mongoose.connection.readyState === 0){
// 		var db = mongoose.connect('mongodb://piet:snot@ds021000.mlab.com:21000/bookswap');
// 	}
// 		next();
// 	 });
// });
function callback (err, results){
			if (err) {
				console.log('error storing book', err) 
			} else {
				mongoose.connection.close(function() {
		            console.log('Mongoose connection disconnected');
	    		});
			}
} 

function storeBook(err, books){
	console.log('storebook called');
	if (err){
		console.log(err);
	} else if (books.length === 0){
		console.log(books)
		bookModel.create({
			user: booksArray[0].owner,
			books: booksArray,
			requests: requests
		}, callback);
	}
}

function findBook(){
	console.log('findbook called');
	var db = mongoose.connect('mongodb://localhost/bookswap', function(err){
		if (err){
			console.log(err);
		} else {
			bookModel.find({user: user}, storeBook);
		}
	});
}


router.post('/', function(req, res){
	booksArray = req.body.data;
	user = booksArray[0].owner;
	console.log(booksArray);
	findBook();
	// console.log('booksArray', booksArray);
});

module.exports = router;




// picModel.create({
// 		pics: allPics
// 	}, function(err, pics){
// 			if (err) {
// 				console.log('error storing pics array', err) 
// 			} else {
// 				mongoose.connection.close(function() {
// 		            console.log('Mongoose connection disconnected');
// 	    		});
// 			}
// 	   } 
//  	);