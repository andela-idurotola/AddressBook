'use strict';

const express = require('express');
const config = require('./config/index');
const server = require('./config/express');

const app = express();

module.exports = {
    app
};

// Bootstrap express 
server(app);

function listen () {
    if (app.get('env') === 'test') return;
    app.listen(config.port);
    console.log(`Address Book is listen on Port ${config.port}`);
}

// Run Address Book
listen();
