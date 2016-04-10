'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// var bookModel = require('../config/book-model');
var booksArray;
var requests = [];

// function storeBook(){
// 	console.log('storeBook called');
// 	var db = mongoose.connect('mongodb://piet:snot@ds021000.mlab.com:21000/bookswap');
// 	bookModel.create({
// 		user: booksArray[0].owner,
// 		books: booksArray,
// 		requests: requests
// 	});
// }


router.post('/', function(req, res){
	booksArray = req.body.data;
	// storeBook();
	console.log('booksArray', booksArray);
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