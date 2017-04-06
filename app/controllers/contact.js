'use strict';

const config  = require('../../config');
const pick = require('lodash.pick');
const find = require('lodash.find');
const _firebase = require('firebase');

const firebaseDb = _firebase
    .initializeApp(config.firebase).database();

exports.create = (req, res, next) => {
    req.assert('name', 'Name cannot be blank').notEmpty();
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('address', 'Address cannot be blank').notEmpty();
    req.assert('phoneNumber', 'Phone number cannot be blank').notEmpty();

    req.sanitize('email').normalizeEmail({
        remove_dots: false 
    });

    const errors = req.validationErrors();
    if (errors) return res.status(400).json(errors);
 
    const newContact = pick(
        req.body,
        ['name', 'email', 'address', 'phoneNumber']
    );

    let contactsRef = firebaseDb.ref(`/users/${req.user.id}/contacts`);
    
    contactsRef.once('value', (dataSnapshot) => {
        let allContacts = dataSnapshot.val() || [];

        let isDuplicateDetail=  find(allContacts, (c) => {
            return c.email === newContact.email || 
                c.phoneNumber === newContact.phoneNumber;
        });

        if (isDuplicateDetail) {
            return res.boom.conflict(
                'This contact\'s email or phone number is a duplicate.'
            );
        }

        /*  
            FIREBASE WARNING: Passing an Array to Firebase.update() is deprecated.
            Use Object with integer keys to update.
        */
        let contact = {};
        contact[allContacts.length] = newContact;

        contactsRef.update(contact, (err) => {
            if (err) return res.boom.notImplemented(
                'Could not create a new contact'
            );

            return res.status(200).json({
                msg: `Successfully added ${newContact.name} to your contacts`
            });
        }); 
    });       
}

