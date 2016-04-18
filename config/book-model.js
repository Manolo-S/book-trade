var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
	owner: String,
	image: String,
	title: String,
	authors: String,
	publishedDate: String,
	pages: String,
	language: String,
	industryIdentifier: String,
	requestedBy: String,
	timestamp: String,
	_id: false
});

var RequestSchema = new Schema({
	requestedBook: BookSchema,
	offeredBook: BookSchema
});


var UserSchema = new Schema({
	user: String,
	books: [BookSchema],
	requests: [RequestSchema]
});

module.exports = mongoose.model('users', UserSchema);


