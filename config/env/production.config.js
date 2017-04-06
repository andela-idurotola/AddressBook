'use strict';

module.exports = {
    port: process.env.PORT || process.env.NODE_PORT || 4000,
    bcrypt: {
        hashRounds: 10
    },
    dbUrl: process.env.DATABASE_URL,
    auth: {
        signKey: process.env.AUTH_SIGN_KEY,
        tokenTTL: 1000 * 60 * 60 * 1 * 1 // 1 hour
    },
    firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DB_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID
    }
};