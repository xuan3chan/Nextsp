// services/authService.js
const User = require('../models/User');
const Admin = require('../models/adminModel');
const argon2d = require('argon2');
const jwt = require('jsonwebtoken');

const registerUserService = async ({ fullName, email, accountName, password }) => {
    const user = await User.findOne({ $or: [{ email }, { accountName }] });

    if (user) {
        throw { status: 400, message: 'Email or accountName already taken' };
    }

    const hashedPassword = await argon2d.hash(password);
    const newUser = new User({ fullName, email, accountName, password: hashedPassword });
    await newUser.save();

    const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET);

    return { success: true, message: 'User created successfully', accessToken };
};

const loginUserService = async ({ accountName, email, password }) => {
    const user = await User.findOne({ $or: [{ email }, { accountName }] });

    if (!user) {
        throw { status: 400, message: 'Incorrect email or accountName' };
    }

    const passwordValid = await argon2d.verify(user.password, password);

    if (!passwordValid) {
        throw { status: 400, message: 'Incorrect password' };
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);

    return { success: true, message: 'User logged in successfully', accessToken };
};

const loginAdminService = async ({ accountName, password }) => {
    const admin = await Admin.findOne({ accountName });

    if (!admin) {
        throw { status: 400, message: 'Admin account not found' };
    }

    if (!admin.password.startsWith('$argon2i$')) {
        const hashedPassword = await argon2d.hash(password, { type: argon2d.argon2i });
        admin.password = hashedPassword;
        await admin.save();
    }

    const passwordValid = await argon2d.verify(admin.password, password);

    if (!passwordValid) {
        throw { status: 400, message: 'Incorrect password' };
    }

    const accessToken = jwt.sign({ adminId: admin._id }, process.env.ACCESS_TOKEN_SECRET);

    return { success: true, message: 'Admin logged in successfully', accessToken };
};

module.exports = {
    registerUserService,
    loginUserService,
    loginAdminService,
};
