'use strict';

const _firebase = require('firebase');
const config  = require('../../config');

const firebaseDb = _firebase
    .initializeApp(config.firebase).database();

module.exports.contactsDb = firebaseDb;