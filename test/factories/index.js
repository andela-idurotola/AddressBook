'use strict';

const f = require('factory-girl');
const factory = f.factory;
const adapter = new f.MongooseAdapter();
const User = require('../../app/models/user');

factory.setAdapter(adapter);

// User Factory
factory.define('User', User, {
    id: '1',
    email: factory.chance('email', { domain: "example.com" }),
    password: 'some-password',
});

exports.factory = factory;
