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
	user: String,
	books: [BookSchema]
});

module.exports = mongoose.model('users', UserSchema);


