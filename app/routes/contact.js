const contactCtrl = require('../controllers/contact');
const requiresLogin = require('../controllers/auth').authenication;

module.exports = (app) => {
    'use strict';
    app.post('/api/contacts', 
        requiresLogin, contactCtrl.create);
};
