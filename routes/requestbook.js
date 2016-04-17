'use strict';
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	res.render('requestbook');
});

module.exports = router;





















// 'use strict';
// var express = require('express');
// var router = express.Router();
// var mongoose = require('mongoose');
// var bookModel = require('../config/book-model');
// var dbURI = 'mongodb://localhost/bookswap';
// var book;
// var user;
// var owner;
// var image;
// var title;
// var authors;
// var publishedDate;
// var pages;
// var language;
// var industryIdentifier;
// var timestamp;
// var request;
// var requestedBy;
// var bookDetails;

// // function callback (err, results){
// // 	if (err) {
// // 		console.log('error storing book', err) 
// // 		mongoose.connection.close(function() { //TODO add err object as function parameter??
// // 	        console.log('disconnected from DB');
// // 		});
// // 	}
// // 	// } else {
// // 	// 	console.log(results);
// // 	// 	mongoose.connection.close(function() { //TODO add err object as function parameter??
// // 	//         console.log('disconnected from DB');
// // 	// 	});
// // 	// }
// // } 

// // function callback2(err, results){
// // 	if (results.length === 0){
// // 		bookModel.create({user: requestedBy, books: [], requests: [book]});
// // 	} else {
// // 		bookModel.update( {user: requestedBy}, {$push: {requests: book}}, callback);		
// // 	}
// // }

// // function findBook(){
// // 	if (mongoose.connection.readyState === 0){
// // 		var db = mongoose.connect(dbURI, function(err){
// // 			if (err){
// // 				console.log(err);
// // 			} else {
// // 				bookModel.update( {user: user, 'books.industryIdentifier': industryIdentifier, 'books.timestamp': timestamp}, {'$set': {'books.$.requestedBy': requestedBy}}, callback);
// // 				bookModel.find({user: requestedBy}, callback2);
// // 			}
// // 		});
// // 	} else {
// // 		bookModel.update({user: user, 'books.industryIdentifier': industryIdentifier, 'books.timestamp': timestamp}, {'$set': {'books.$.requestedBy': requestedBy}}, callback);
// // 		bookModel.find({user: requestedBy}, callback2);
// // 	}
// // }


// router.post('/', function(req, res){
// 	if (req.body){
// 		res.sendStatus(200);
// 	}
// 	request = req.body.bookRequest;
// 	bookDetails = request.bookDetails.split(',');
// 	user = owner = bookDetails[0] + ',' + bookDetails[1] + ',' + bookDetails[2];
// 	image = bookDetails[3];
// 	title = bookDetails[4];
// 	authors = bookDetails[5]
// 	publishedDate = bookDetails[6];
// 	pages = bookDetails[7];
// 	language = bookDetails[8];
// 	industryIdentifier = bookDetails[9];
// 	requestedBy = request.requestedBy;
// 	timestamp = bookDetails[10];
// 	book = {owner: owner, image: image, title: title, authors: authors, publishedDate: publishedDate,
// 	            pages: pages, language: language, industryIdentifier: industryIdentifier,
// 	        	requestedBy: requestedBy, timestamp: timestamp};

// 	console.log('book', book);
// 	// findBook();
// 	res.render('select-book', {book: book});
// });

// module.exports = router;


// // 	res.render('index', {user: {
// // 								id: req.user.id,
// // 								service: req.user.service
// // 							   }
// // 						}

