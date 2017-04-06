process.env.NODE_ENV = 'test';

const config = require('../../config');
const DatabaseCleaner = require('database-cleaner'); 
const databaseCleaner = new DatabaseCleaner('mongodb');
const contactBase =  require('../../app/models/contactbase').contactsDb;

const connect = require('mongodb').connect;

module.exports.cleanDatabase = (cb) => {
    // Prepare the database for integration testing.
    connect(config.dbUrl, function(err, db) {
        databaseCleaner.clean(db, function() {
            let contactsRef = contactBase.ref(`/users/1/contacts`).remove();
            db.close();
            cb();
        });
    });
}

