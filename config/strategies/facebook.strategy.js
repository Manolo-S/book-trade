var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(){
	passport.use(new FacebookStrategy({
		clientID:'994422223987374',
		clientSecret: '1c64b79efdf293ee772c435b0901de6d',
		callbackURL: 'https://book-trade-ms.herokuapp.com/auth/facebook/callback',
		passReqToCallback: true
	},
	function (req, accessToken, refreshToken, profile, done){
			var user = {};
            user.displayName = profile.displayName;
            user.facebook = {};
            user.facebook.id = profile.id;
            user.facebook.token = accessToken;
            user.id = profile.id;
            
            done(null, user);
	}))
}



