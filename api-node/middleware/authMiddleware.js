var userModel = require('../models/userModel.js');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.verify()
     */
    verify: function (req, res, next) {
        try {
            var authorization = req.headers.authorization ? req.headers.authorization : '';
            var decoded = jwt.verify(authorization, 'HS256');
            req.body.id = decoded.id;
        } catch (error) {
            return res.status(401).json({
                message: 'Unauthorized',
                err: error
            });
        }
        next();
    },

};
