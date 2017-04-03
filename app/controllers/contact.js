'use strict';

const Contact = require('../models/contact');

exports.create = (req, res, next) => {
    req.assert('name', 'Name cannot be blank').notEmpty();
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('address', 'Address cannot be blank').notEmpty();
    req.assert('phoneNumber', 'Phone number cannot be blank').notEmpty();

    req.sanitize('email').normalizeEmail({ remove_dots: false });

    const errors = req.validationErrors();
    if (errors) return res.status(400).send(errors);
   
}