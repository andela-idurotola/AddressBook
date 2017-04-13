'use strict';

const User = require('../models/user');
const auth = require('./auth');
const pick = require('lodash.pick');

exports.login = (req, res, next) => {
    let user = req.user;

    let userObject = pick(user, ['id', 'email']);

    userObject.token = auth.sign(user);
    return res.status(200).json(userObject);
}

exports.signin = (req, res, next) => {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ remove_dots: false });

    const errors = req.validationErrors();
    if (errors) return res.status(400).send(errors);

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email.toLowerCase() })
    .then(user => {
        if (!user) {
            return res.boom.badRequest(`Email ${email} not found.`);
        }

        user.comparePassword(password, (err, isMatch) => {
            if (err) return done(err);
            if (isMatch) {
                req.user = user;
                return next();
            } 

            logger.warn('Invalid username or password');
            return res.boom.unauthorized('Invalid email or password.');
        });
    })
    .catch(err => {
        let findUserError = 'Account does not exist.';
        logger.error(err, ' signing-error');
        return res.boom.notImplemented(findUserError);
    });
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
    // Simply remove the token from the client side.
    // The might not be neccesary once token is removed from client side
    res.status(200).json({message: 'signout successful'});
};