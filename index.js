'use strict';

const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const server = require('./config/express');

const app = express();

// Connect to the database
mongoose.Promise = global.Promise;
mongoose.connect(config.dbUrl);

mongoose.connection.on('connected', () => {
    console.log('😀 MongoDB connection established!');
});

mongoose.connection.on('error', () => {
  console.log('😡 MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

// Expose the app module
module.exports = {
    app
};

// Bootstrap express 
server(app);

function listen () {
    if (app.get('env') === 'test') return;
    app.listen(config.port);
    console.log(`🔥 Address Book is listening on Port ${config.port}`);
}

// Run Address Book
listen();
