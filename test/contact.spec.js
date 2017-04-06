'use strict';

const request = require('supertest');
const expect = require('expect.js');
const factory = require('./factories').factory;
const jsonwebtoken = require('jsonwebtoken');
const app = require('../index.js').app;
const config = require('../config')

require('./setup');

describe('POST create a contact', function() {
    let user;

    beforeEach(function(done) {
        user = {
            id: '1',
            email: 'test_user@example.com',
            password: 'test-password'
        }


        factory.create('User', user).then(()=> {
            done();
        }).catch(done);
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
});
