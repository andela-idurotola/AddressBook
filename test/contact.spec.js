'use strict';

const dbCleaner = require('./setup'); 

const request = require('supertest');
const expect = require('expect.js');
const factory = require('./factories').factory;
const jsonwebtoken = require('jsonwebtoken');
const app = require('../index.js').app;
const config = require('../config')

describe('POST create a contact', function() {
    let user = {
        id: '1',
        email: 'test_user@example.com',
        password: 'test-password'
    }

    beforeEach(function(done) {
        dbCleaner.cleanDatabase(() => {
            done();
        });
    });

    it('should create a contact to firebase', function(done) {

        // Create a token to be used for authenticaion 
        let token = jsonwebtoken.sign({
            id: user.id,
            email: user.email
        }, config.auth.signKey, {expiresIn: config.auth.tokenTTL});

        // Use Date.now() to create different credentials per time.
        request(app)
            .post('/api/contacts')
            .set('x-access-token', token)
            .send({
                name: 'test-contact-name',
                email: `${Date.now()}@example.com`,
                address: 'test-contact-address',
                phoneNumber: `${Date.now()}`
            })
            .expect(200)
            .then(res => {
                expect(res.body.msg).to.be('Successfully added test-contact-name to your contacts');
                done();
            });
    });

    it('should return authorized if user is not signed', function(done) {

        // Create a wrong token to be used for authenticaion 
        let token = 'wront-token-length';

        request(app)
            .post('/api/contacts')
            .set('x-access-token', token)
            .send({
                name: 'test-contact-name',
                email: 'test-contact@example.com',
                address: 'test-contact-address',
                phoneNumber: '11122222222'
            })
            .expect(401)
            .then(res => {
                expect(res.body.message).to.be('Invalid auth');
                done();
            });
    });

    describe('POST a contact', function(done) {
        // Create a token to be used for authenticaion 
        let token = jsonwebtoken.sign({
            id: user.id,
            email: user.email
        }, config.auth.signKey, {expiresIn: config.auth.tokenTTL});

        let duplicateContact = {
            name: 'test-contact-name',
            email: `${Date.now()}@example.com`,
            address: 'test-contact-address',
            phoneNumber: `${Date.now()}`
        };

        beforeEach(function(done) {
            request(app)
                .post('/api/contacts')
                .set('x-access-token', token)
                .send(duplicateContact)
                .expect(200, done);
        });

        it('should return 409 for a duplicate contact', function(done) {
            
            request(app)
                .post('/api/contacts')
                .set('x-access-token', token)
                .send(duplicateContact)
                .expect(409)
                .then(res => {
                    expect(JSON.parse(res.error.text).message).to.be('This contact\'s email or phone number is a duplicate.');
                    done();
                });
        });
    });
});


