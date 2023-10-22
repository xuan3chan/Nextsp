    // routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authCrtl');

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', authCtrl.registerUser);

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', authCtrl.loginUser);

module.exports = router;
