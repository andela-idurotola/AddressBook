const user = require('./user');
const contact = require('./contact');

module.exports = (app) => {
    'use strict';
    user(app);
    contact(app);
};
