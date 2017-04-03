'use strict';

const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');

const Contact = new mongoose.Schema({
    email: String,
    name: String,
    phoneNumber: String,
    address: String,
    picture: String

}, { timestamps: true });


const Contact = mongoose.model('Contact', Contact);

module.exports = Contact;
