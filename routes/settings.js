'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var settingsModel = require('../config/settings-model');
var dbUrl = 'mongodb://localhost/bookswap';
var user;
var name;
var email;
var newUser;

function callback (err, results){
	if (err) {
		console.log(error);
	} else {
		console.log(results);
	}

} 

// function findRequests(r){
// 	if (r.requestedBook.industryIdentifier === industryIdentifier && r.requestedBook.timestamp === timestamp){
// 		var otherUser = r.offeredBook.owner;
// 		bookModel.update({user: otherUser}, {$pull: {requests: {'requestedBook.industryIdentifier': industryIdentifier, 'requestedBook.timestamp': timestamp}}}, callback);
// 		bookModel.update({user: otherUser}, {$pull: {requests: {'offeredBook.industryIdentifier': industryIdentifier, 'offeredBook.timestamp': timestamp}}}, callback);
// 		console.log('otherUser', otherUser);
// 	}
// }

// function callback2 (err, results){
// 	console.log('callback2');
// 	if (err) {
// 		console.log('error removing book', err)
// 		return;
// 	}
// 	requests = results[0].requests;
// 	// console.log('requests', requests);
// 	requests.map(findRequests);
// }


router.post('/', function(req, res){
	if (req.body){
		res.sendStatus(200);
	}
	user = req.body.user;
	name = req.body.name;
	email = req.body.email;
	newUser = req.body.newuser;
	console.log(newUser);
	if (mongoose.connection.readyState === 0){
		var db = mongoose.connect(dbUrl);
	}

	if (newUser === "yes"){
		console.log('if');
		settingsModel.create({user: user, name: name, email: email}, callback);
	} else {
		settingsModel.update({user: user}, {$set: {name: name, email: email}}, callback);
		console.log('else');
	}


	// bookModel.update({user: user}, {$pull: {books: {'industryIdentifier': industryIdentifier, 'timestamp': timestamp}}}, callback);
	// bookModel.find({user: user}, callback2);

	// bookModel.update({user: user}, {$pull: {requests: {'offeredBook.industryIdentifier': industryIdentifier, TODO delete this block
	// 											'offeredBook.timestamp': timestamp}}}, callback);
	// bookModel.update({user: user}, {$pull: {requests: {'requestedBook.industryIdentifier': industryIdentifier,
	// 											'requestedBook.timestamp': timestamp}}}, callback);
});

module.exports = router;


