var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SettingsSchema = new Schema({
	name: String,
	email: String
});

module.exports = mongoose.model('settings', SettingsSchema);


