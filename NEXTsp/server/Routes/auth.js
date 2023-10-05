const express = require('express');
const router =express.Router()
const User = require('../models/User');
const argon2d  = require('argon2');
const jwt = require('jsonwebtoken')

//router.get('/',(req,res)=> res.send('USER ROUTE'))
//@route POST api/auth/regster
//desc register iser
//@access public

router.post('/register', async (req, res) => {
    const { username , password } = req.body
    

    // Simple validation
    if (!username || !password)
        return res.status(400).json({ success: false, message: 'Missing username or password' });

    try {
        // Check if username already exists
        const user = await User.findOne({ username });
        if (user)
            return res.status(400).json({ success: false, message: 'Username already taken' });

        // All good, hash the password and save the user
        const hashedPassword = await argon2d.hash(password);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        // Return token
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET);
        res.json({ success: true, message: 'User registered successfully', accessToken });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
//@route POST api/auth/login
//desc login user
//@access public
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Simple validation
    if (!username || !password)
        return res.status(400).json({ success: false, message: 'Missing username or password' });

    try {
        // Check for existing user
        const user = await User.findOne({ username });
        if (!user)
            return res.status(400).json({ success: false, message: 'Incorrect username or password' });

        // Username found
        const passwordValid = await argon2d.verify(user.password, password);
        if (!passwordValid)
            return res.status(400).json({ success: false, message: 'Incorrect username or password' });

        // All good
        // Return token
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);
        res.json({ success: true, message: 'User logged in successfully', accessToken });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

module.exports = router;
