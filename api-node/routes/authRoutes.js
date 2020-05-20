var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController');
var authMiddleware = require('../middleware/authMiddleware');

/*
 * POST
 */
router.post('/register', authController.register);

/*
 * POST
 */
router.post('/login', authController.login);

/*
 * POST
 */
router.post('/refresh', authController.refresh);

/*
 * POST
 */
router.post('/logout', authController.logout);

/*
 * POST
 */
router.post('/me', [authMiddleware.verify], authController.me);

module.exports = router;
