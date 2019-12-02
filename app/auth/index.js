'use strict';
const passport = require('passport');
const config = require('../config');
const helpers = require('../helpers');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        helpers.findById(id)
            .then(user => done(null, user))
            .catch(error => console.warn("Error when deserializing the user"));
    });

    let authProcessor = (accessToken, refreshToken, profile, done) => {
        helpers.findOne(profile.id)
            .then(result => {
                if(result){
                    done(null, result);
                } else {
                    // Create new user
                    helpers.createNewUser(profile)
                        .then(newChatUser => done(null, newChatUser))
                        .catch(error => console.warn("Error when creating new user"));
                }
            })
    };

    passport.use( new FacebookStrategy(config.fb, authProcessor) );
};