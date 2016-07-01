'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bookModel = require('../config/book-model.js');
var books;
// var dbUrl = 'mongodb://localhost/bookswap';
// var dbUrl = 'mongodb://piet:snot@ds021000.mlab.com:21000/bookswap';


router.get('/', function(req, res){
	// if (mongoose.connection.readyState === 0){
	// 	var db = mongoose.connect(dbUrl);
	// 	// var db = mongoose.connect(dbUrl);
	// }

	console.log('getall books called');

	bookModel.find({}, function(err, results ){
		console.log('bookmodel.find called')
		if (err){
			console.log(err);
			return;
		} else if (results.length !== 0){
			res.json({"results": results});
		// mongoose.connection.close(function(){
		// 	console.log('Mongoose connection disconnected');
		// });
		}
	});
});

module.exports = router;