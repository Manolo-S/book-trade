'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bookModel = require('../config/book-model.js');
var books;


router.get('/', function(req, res){
	if (mongoose.connection.readyState === 0){
		var db = mongoose.connect('mongodb://localhost/bookswap');
		// var db = mongoose.connect('')
	}

	bookModel.find({}, function(err, results ){
		console.log('bookmodel.find called')
		if (err){
			console.log(err);
			return;
		} else if (results.length !== 0){
			res.json({"results": results});
		mongoose.connection.close(function(){
			console.log('Mongoose connection disconnected');
		});
		}
	});
});

module.exports = router;