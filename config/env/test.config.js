'use strict';

module.exports = {
    port: process.env.PORT || process.env.NODE_PORT || 4000,
    bcrypt: {
        hashRounds: 1
    },
    dbUrl: 'mongodb://localhost:27017/address_book_test',
    auth: {
        signKey: 'c88afe1f6aa4b3c7982695ddd1cdd200bcd96662',
        tokenTTL: 1000 * 60 * 60 * 24 * 1 // 1 day
    }
};