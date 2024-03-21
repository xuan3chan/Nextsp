    // routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authCrtl');
const verifyToken = require('../middleware/auth');

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', authCtrl.registerUser);
//registeradmin
router.post('/register/admin', authCtrl.registerAdmin);

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', authCtrl.loginUser);
//loginadmin
router.post('/login/admin', authCtrl.loginAdmin);
//getuser
router.get('/user',verifyToken, authCtrl.getUserController);

module.exports = router;
