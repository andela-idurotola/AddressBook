'use strict';

const dbCleaner = require('./setup'); 

const request = require('supertest');
const expect = require('expect.js');
const factory = require('./factories').factory;
const app = require('../index.js').app;

describe('Start Tests  ', function() {
    beforeEach(function(done) {
        dbCleaner.cleanDatabase(() => {
            done();
        });
    });

    describe('POST signup a user', function() {
        it('should return a 400 for password mismatch', function(done) {
            request(app)
                .post('/api/user/signup')
                .send({
                    email: 'test@example.com',
                    password: 'test-user-password',
                    confirmPassword: ''
                })
                .expect(400)
                .then(res => {
                    expect(JSON.parse(res.error.text)[0].msg).to.be('Passwords do not match');
                    done();
                });
        });

        it('should return a 400 for empty credentials', function(done) {
            request(app)
                .post('/api/user/signup')
                .send({
                    email: '',
                    password: '',
                    confirmPassword: ''
                })
                .expect(400)
                .then(res => {
                    expect(JSON.parse(res.error.text).length).to.be(2);
                    expect(JSON.parse(res.error.text)[0].msg).to.be('Email is not valid');
                    expect(JSON.parse(res.error.text)[1].msg).to.be('Password must be at least 4 characters long');
                    done();
                });
        });

        it('should return a 200 for correct credentials', function(done) {
            request(app)
                .post('/api/user/signup')
                .send({
                    email: 'test@example.com',
                    password: 'test-user-password',
                    confirmPassword: 'test-user-password'
                })
                .expect(200)
                .then(res => {
                    expect(res.body.id).to.not.be.empty();
                    expect(res.body.email).to.be('test@example.com');
                    expect(res.body.token).to.not.be.empty();
                    done();
                });
        });
    });

    describe('POST signin a user', function() {
        let user;
        beforeEach(function(done) {
            user = {
                email: 'test_user@example.com',
                password: 'test-password'
            }

            factory.create('User', user).then(()=> {
                done();
            }).catch(done);
        });

        it('should return 401 Unathorized for invalid credentials', function(done) {
            request(app)
                .post('/api/user/signin')
                .send({
                    email: user.email,
                    password: 'some-other-password',
                })
                .expect(401, done);
        });

        it('should return 200 for valid credentials', function(done) {
            request(app)
                .post('/api/user/signin')
                .send({
                    email: user.email,
                    password: 'test-password',
                })
                .expect(200, done);
        });
    });

    describe('GET logout a user', function() {
        it('should return 200 and logout a user', function(done) {
            request(app)
                .get('/api/user/logout')
                .expect(200)
                .then(res => {
                    expect(res.body.message).to.be('signout successful');
                    done();
                });
        });
    });
});


