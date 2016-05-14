var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function(){
	passport.use(new TwitterStrategy({
		consumerKey: 't4QvixDTSSXrDbO0n3O2I089n',
		consumerSecret: 'lZlZZeG8DR5lHnYXEqdOL5QhWZ382FbSiBYPXgCfUFTpgrTtvE',
		callbackURL: 'https://book-trade-ms/auth/twitter/callback',
		passReqToCallback: true
	},
	function(req, token, tokenSecret, profile, done){
			var user = {};
            user.displayName = profile._json.name;
            user.twitter = {};
            user.twitter.id = profile.id;
            user.twitter.token = token;
            user.id = profile.id;
            
            
            done(null, user);
	}))
};




