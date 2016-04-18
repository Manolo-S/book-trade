'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bookModel = require('../config/book-model');
var dbURI = 'mongodb://localhost/bookswap';
var swapProposal;
var userMakingOffer;
var userReceivingOffer;
var industryIdentifier;
var timestamp;
var requestedBy;


function callback (err, results){
	if (err) {
		console.log('error storing book', err);
		// mongoose.connection.close(function() { //TODO add err object as function parameter??
	 //        console.log('disconnected from DB');
		// });
	}
	// } else {
	// 	console.log(results);
	// 	mongoose.connection.close(function() { //TODO add err object as function parameter??
	//         console.log('disconnected from DB');
	// 	});
	// }
} 


function updateUserRequests() {
	industryIdentifier = swapProposal.requestedBook.industryIdentifier;
	timestamp = swapProposal.requestedBook.timestamp; 
	requestedBy = userMakingOffer;
	console.log(industryIdentifier, timestamp);
	if (mongoose.connection.readyState === 0){
		var db = mongoose.connect(dbURI, function(err){
			if (err){
				console.log(err);
				return;
			}
		});
	}
	
		bookModel.update({user: userMakingOffer}, {'$push': {requests: swapProposal}}, callback);
		bookModel.update({user: userReceivingOffer}, {'$push': {requests: swapProposal}}, callback);
		bookModel.update({user: userReceivingOffer, 'books.industryIdentifier': industryIdentifier, 'books.timestamp': timestamp}, {'$set': {'books.$.requestedBy': requestedBy}}, callback);
}


router.post('/', function(req, res){
	if (req.body){
		res.sendStatus(200);
	}
	swapProposal = req.body.swapProposal;
	userMakingOffer = swapProposal.offeredBook.owner;
	userReceivingOffer = swapProposal.requestedBook	.owner;
	console.log(swapProposal);
	console.log(userMakingOffer, userReceivingOffer);
	updateUserRequests();
});

module.exports = router;