var express = require('express');
var passport = require('passport');
var router = express.Router();

router.route('/twitter')
    .get(passport.authenticate('twitter'))

router.route('/twitter/callback')
    .get(passport.authenticate('twitter', {
        successRedirect: '/',
        failure: '/error/'
    }));

router.route('/facebook')
    .get(passport.authenticate('facebook', {
        scope: ['email']
    }));

router.route('/facebook/callback')
    .get(passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/error'
    }));
    
module.exports = router;

