const contactController = require('../controllers/contact');
const authorization = require('../controllers/authorization');

module.exports = (app) => {
    'use strict';
    app.post('/api/contacts', 
        authorization.requiresLogin, contactController.create);
};
