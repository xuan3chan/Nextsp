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
    const { username, password, email } = req.body;

    // Simple validation
    if (!username || !password || !email)
        return res.status(400).json({ success: false, message: 'Missing username, password, or email' });

    try {
        // Check if username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(400).json({ success: false, message: 'Username already taken' });
            } else {
                return res.status(400).json({ success: false, message: 'Email already registered' });
            }
        }

        // All good, hash the password and save the user
        const hashedPassword = await argon2d.hash(password);
        const newUser = new User({ username, password: hashedPassword, email });
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
    const { username, email, password } = req.body;

    // Simple validation
    if ((!username && !email) || !password)
        return res.status(400).json({ success: false, message: 'Missing username or email or password' });

    try {
        // Check for existing user by username or email
        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (!user)
            return res.status(400).json({ success: false, message: 'Incorrect username or email or password' });

        // Username or email found
        const passwordValid = await argon2d.verify(user.password, password);
        if (!passwordValid)
            return res.status(400).json({ success: false, message: 'Incorrect username or email or password' });

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
