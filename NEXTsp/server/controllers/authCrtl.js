// controllers/authCtrl.js
const User = require('../models/User');
const Admin = require('../models/adminModel');
const argon2d = require('argon2');
const jwt = require('jsonwebtoken');

const handleErrorResponse = (res, message) => {
    console.error(message);
    res.status(500).json({ success: false, message: 'Internal server error' });
};

const registerUser = async (req, res) => {
    const { fullName, email, accountName, password } = req.body;

    if (!fullName || !email || !accountName || !password) {
        return res.status(400).json({ success: false, message: 'Missing email and/or password' });
    }

    try {
        const user = await User.findOne({ $or: [{ email }, { accountName }] });

        if (user) {
            return res.status(400).json({ success: false, message: 'Email or accountName already taken' });
        }

        const hashedPassword = await argon2d.hash(password);
        const newUser = new User({ fullName, email, accountName, password: hashedPassword });
        await newUser.save();

        const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET);

        res.json({ success: true, message: 'User created successfully', accessToken });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

const loginUser = async (req, res) => {
    const { accountName, email, password } = req.body;

    if (!accountName && !email) {
        return res.status(400).json({ success: false, message: 'Missing email and/or password' });
    }

    try {
        const user = await User.findOne({ $or: [{ email }, { accountName }] });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Incorrect email or accountName' });
        }

        const passwordValid = await argon2d.verify(user.password, password);

        if (!passwordValid) {
            return res.status(400).json({ success: false, message: 'Incorrect password' });
        }

        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);

        res.json({ success: true, message: 'User logged in successfully', accessToken });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

const loginAdmin = async (req, res) => {
    const { accountName, password } = req.body;

    console.log('AccountName:', accountName);

    if (!accountName || !password) {
        return res.status(400).json({ success: false, message: 'Missing accountName and/or password' });
    }

    try {
        const admin = await Admin.findOne({ accountName });

        console.log('Admin:', admin);

        if (!admin) {
            return res.status(400).json({ success: false, message: 'Admin account not found' });
        }

        console.log('Stored Hashed Password:', admin.password);

        // Check if the stored password has the correct format
        if (!admin.password.startsWith('$argon2i$')) {
            // If not, rehash the password and update the record in the database
            const hashedPassword = await argon2d.hash(password, { type: argon2d.argon2i });
            admin.password = hashedPassword;
            await admin.save();
        }

        // Now verify the password
        const passwordValid = await argon2d.verify(admin.password, password);

        console.log('Password Valid:', passwordValid);

        if (!passwordValid) {
            return res.status(400).json({ success: false, message: 'Incorrect password' });
        }

        const accessToken = jwt.sign({ adminId: admin._id }, process.env.ACCESS_TOKEN_SECRET);

        res.json({ success: true, message: 'Admin logged in successfully', accessToken });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};


module.exports = {
    registerUser,
    loginUser,
    loginAdmin,
};
