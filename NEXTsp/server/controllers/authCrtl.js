// controllers/authCtrl.js
const User = require('../models/User');
const argon2d = require('argon2');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { fullName, email, accountName, password } = req.body;

    // Simple validation
    if (!fullName || !email || !accountName || !password)
        return res
            .status(400)
            .json({ success: false, message: 'Missing email and/or password' });

    try {
        // Check for existing user
        const user = await User.findOne({ $or: [{ email }, { accountName }] });

        if (user)
            return res
                .status(400)
                .json({ success: false, message: 'Email or accountName already taken' });

        // All good
        const hashedPassword = await argon2d.hash(password);
        const newUser = new User({ fullName, email, accountName, password: hashedPassword });
        await newUser.save();

        // Return token
        const accessToken = jwt.sign(
            { userId: newUser._id },
            process.env.ACCESS_TOKEN_SECRET
        );

        res.json({
            success: true,
            message: 'User created successfully',
            accessToken
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const loginUser = async (req, res) => {
    const { accountName, email, password } = req.body;

    // Simple validation
    if (!accountName && !email)
        return res
            .status(400)
            .json({ success: false, message: 'Missing email and/or password' });

    try {
        // Check for existing user
        const user = await User.findOne({ $or: [{ email }, { accountName }] });
        if (!user)
            return res
                .status(400)
                .json({ success: false, message: 'Incorrect email or accountName' });

        // Username found
        const passwordValid = await argon2d.verify(user.password, password);
        if (!passwordValid)
            return res
                .status(400)
                .json({ success: false, message: 'Incorrect password' });

        // All good
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET
        );

        res.json({
            success: true,
            message: 'User logged in successfully',
            accessToken
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
};
