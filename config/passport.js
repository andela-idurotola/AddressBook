"use strict"

const _ = require('lodash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const User = require('../app/models/user');

const promise = require('bluebird');

module.exports = function() {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then(user => {
            done(null, user);
        })
        .catch((err) => {
            done(err, null);
        });
    });


    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {

        User.findOne({ email: email.toLowerCase() })
        .then((user) => {
            if (!user) {
                return done(null, false, { message: `Email ${email} not found.` });
            }

            var encrytedPassword = crypto.pbkdf2Sync(password, user.salt, 10000, 64).toString('base64');

            if (user.password != encrytedPassword) {
                logger.warn('Invalid username or password');
                return done(null, false, {
                    message: 'Invalid username or password'
                });
            }
            return done(null, user);

        })
        .catch((err) => {
            done(err, null);
        });
    }));
};



