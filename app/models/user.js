'use strict';

const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const config  = require('../../config');

/* 
    The user profile can be updated to
    include more details of the user after signup 
*/
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    contactsUrl: String,

    profile: {
        name: String,
        gender: String,
        location: String,
        picture: String
    }
}, { timestamps: true });

userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(config.bcrypt.hashRounds, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err);
            
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
