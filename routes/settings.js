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
		console.log(err);
	} else {
		console.log(results);
	}
} 

router.post('/', function(req, res){
	user = req.body.user;
	name = req.body.name;
	email = req.body.email;
	newUser = req.body.newuser;
	console.log(newUser, user, name, email);
	
	if (newUser === 'yes'){
		console.log('yes');

		settingsModel.create({user: user, name: name, email: email}, callback);
		res.sendStatus(200);
		return;
	} 

	if (newUser === 'no'){
		console.log('no');

		settingsModel.update({user: user}, {$set: {name: name, email: email}}, callback);
		res.sendStatus(200);
		return;
	}

	if (newUser === 'get') {
		console.log('get');
		settingsModel.find({user: user}, function(err, results){
			if (err) {
						console.log(err);
			} else {
					console.log('results: ', results)
			          res.json({"results": results});
			}
		});
	}
});

module.exports = router;


