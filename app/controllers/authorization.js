const auth = require('./auth');

// Require login routing middleware
exports.requiresLogin = auth.authentication;
