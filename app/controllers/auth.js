const jsonwebtoken = require('jsonwebtoken');
const config = require('../../config');

module.exports = {
    authentication: (req, res, next) => {
        'use strict';
        const token = req.headers['x-access-token'];
        jsonwebtoken.verify(token, config.auth.signKey, (err, decoded) => {
            if (!err) {
                req.user = decoded;
                next();
            } else {
                return res.boom.unauthorized('Invalid auth');
            }
        });
    },

    sign: (user) => {
        'use strict';
        return jsonwebtoken.sign({
            id: user.id,
            email: user.email
        }, config.auth.signKey, {expiresIn: config.auth.tokenTTL});
    }
};
