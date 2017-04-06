const userController = require('../controllers/user');

module.exports = (app) => {
    'use strict';
    app.post('/api/user/signin', 
        userController.signin, userController.login);

    app.post('/api/user/signup', 
        userController.signup, userController.login);

    app.get('/api/user/logout', userController.logout);
};
