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
		console.log('error removing book', err) 
	} else {
		console.log(results);
		mongoose.connection.close(function() { //TODO add err object as function parameter??
	        console.log('disconnected from DB');
		});
	}
} 

router.post('/', function(req, res){
	var industryIdentifier = req.body.industryIdentifier;
	var db = mongoose.connect(dbURI, function(err){
		if (err){
			console.log(err);
		} else {
			bookModel.remove({books: {$elemMatch: {industryIdentifier: industryIdentifier}}}, callback);
		}
	});
});

module.exports = router;


