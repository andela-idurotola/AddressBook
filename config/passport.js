const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/user');

const promise = require('bluebird');

module.exports = function() {
    "use strict"

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
        .then(user => {
            if (!user) {
                return done(null, false, { message: `Email ${email} not found.` });
            }

            user.comparePassword(password, (err, isMatch) => {
                if (err) return done(err);
                if (isMatch) return done(null, user);

                logger.warn('Invalid username or password');
                return done(null, false, { msg: 'Invalid email or password.' });
            });
        })
        .catch(err => {
            done(err, null);
        });
    }));
};



