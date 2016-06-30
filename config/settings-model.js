var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SettingsSchema = new Schema({
	user: String,
	name: String,
	email: String
});

module.exports = mongoose.model('settings', SettingsSchema);


