var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserIDSchema = new Schema({
	socialMedia: String,
	userId: String,
	userName: String,
	_id: false
});

var BookSchema = new Schema({
	owner: UserIDSchema,
	image: String,
	title: String,
	authors: String,
	publishedDate: String,
	pages: String,
	language: String,
	bookid: String,
	requestedBy: String
	_id: false
});

// var RequestSchema = new Schema({
// 	owner: String,
// 	image: String,s
// 	title: String,
// 	authors: String,
// 	publishedDate: String,
// 	pages: String,
// 	language: String,
// 	bookid: String,
// 	requestedBy: String
// })


var UserSchema = new Schema({
	user: UserIDSchema,
	books: [BookSchema],
	requests: [BookSchema]
});

