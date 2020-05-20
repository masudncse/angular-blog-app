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
     * userController.register()
     */
    register: function (req, res) {
        var user = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        });

        user.save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating user',
                    error: err
                });
            }
            return res.status(201).json(user);
        });
    },

    /**
     * userController.create()
     */
    login: function (req, res) {
        var email = req.body.email;
        var password = req.body.password;

        userModel.findOne({ email: email }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }
            if (bcrypt.compareSync(password, user.password)) {
                var token = jwt.sign({ id: user.id }, 'HS256', { expiresIn: 7200 });

                return res.status(200).json({
                    message: 'Passwords match',
                    access_token: token,
                    token_type: 'bearer',
                    expires_in: 7200
                });
            } else {
                return res.status(404).json({
                    message: 'Passwords don\'t match'
                });
            }
        });
    },

    /**
     * userController.refresh()
     */
    refresh: function (req, res) {

    },

    /**
     * userController.logout()
     */
    logout: function (req, res) {

    },

    /**
     * userController.me()
     */
    me: function (req, res) {
        var id = req.body.id;

        userModel.findOne({ _id: id }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }
            return res.json(user);
        });
    },

};
