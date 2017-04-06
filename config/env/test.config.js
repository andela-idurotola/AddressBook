'use strict';

module.exports = {
    port: process.env.PORT || process.env.NODE_PORT || 4000,
    bcrypt: {
        hashRounds: 1
    },
    dbUrl: 'mongodb://localhost:27017/address_book_test',
    auth: {
        signKey: 'c88afe1f6aa4b3c7982695ddd1cdd200bcd96662',
        tokenTTL: 1000 * 60 * 60 * 1 * 1 // 1 hour
    },
    firebase: {
        apiKey: "AIzaSyB1aTxgSrLs51MSoSmZ82FbJo3xawA3mTU",
        authDomain: "addressbook-e3fc1.firebaseapp.com",
        databaseURL: "https://addressbook-e3fc1.firebaseio.com",
        projectId: "addressbook-e3fc1",
        storageBucket: "addressbook-e3fc1.appspot.com",
        messagingSenderId: "457024441978"
    }
};