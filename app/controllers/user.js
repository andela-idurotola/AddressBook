'use strict';

const User = require('../models/user');
const auth = require('./auth');
const pick = require('lodash.pick');
const passport = require('passport');

exports.login = (req, res, next) => {
    let user = req.user;

    req.logIn(user, (err) => {
        if (err) {
            logger.error(err, ' signin-error');
            return res.boom.badRequest('Unable to sign in!');
        }
        let userObject = pick(user, ['id', 'email', 'name']);

        userObject.token = auth.sign(user);
        return res.status(200).json(userObject);
    });
}

exports.signin = (req, res, next) => {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ remove_dots: false });

    const errors = req.validationErrors();
    if (errors) return res.status(400).send(errors);

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            logger.error(err, ' signin-error');
            return res.boom.badRequest('Unable to sign in!');
        }

        if (!user) {
            logger.warn(info, ' signin-warning');
            return res.status(401).json({message: info.message});
        }

        req.user = user;
        return next();
    })(req, res, next);
}

exports.signup = (req, res, next) => {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

    req.sanitize('email').normalizeEmail({ 
        remove_dots: false 
    });

    const errors = req.validationErrors();
    if (errors) return res.status(400).json(errors);

    // Check if user exist in the database
    User.findOne({ email: req.body.email }).then(existingUser  => {
        if (existingUser) {
            let emailErrorMessage = 'Account already exists.';
            logger.warn(emailErrorMessage, ' signup-warning');
            return res.boom.badRequest(
                'Account with that email address already exists.'
            );
        } 

        const user = new User({
            email: req.body.email,
            password: req.body.password
        });

        // create a new user here 
        user.save(err => {
            if (err) {
                let saveUserError = 'Unable to register user account';
                logger.error(err, ' signup-error');
                return res.boom.notImplemented(saveUserError);
            }

            req.user = user;
            return next();
        });
    })
    .catch(err => {
        let saveUserError = 'Unable to register user account';
        logger.error(err, ' signup-error');
        return res.boom.notImplemented(saveUserError);
    });
}

exports.logout = (req, res) => {
    req.logout();
    res.status(200).json({message: 'signout successful'});
};