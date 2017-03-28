'use strict';

const path = require('path');
const extend = require('util')._extend;

// Require the environment files
const development = require('./env/development.config');
const test = require('./env/test.config');
const production = require('./env/production.config');

const defaults = {
    root: path.normalize(`${__dirname}/..`)
};

// Initialize the enviroment configuration
module.exports = {
    development: extend(development, defaults),
    test: extend(test, defaults),
    production: extend(production, defaults)
}[process.env.NODE_ENV || 'development'];

