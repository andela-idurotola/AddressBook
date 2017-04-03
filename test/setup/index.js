process.env.NODE_ENV = 'test';

const config = require('../../config');
const DatabaseCleaner = require('database-cleaner'); 
const databaseCleaner = new DatabaseCleaner('mongodb');

const connect = require('mongodb').connect;

// Prepare the database for integration testing.
connect(config.dbUrl, function(err, db) {
  databaseCleaner.clean(db, function() {
    console.log(' ✨ The database is now Born Again');
    db.close();
  });
});
