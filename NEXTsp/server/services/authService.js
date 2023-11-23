// services/authService.js
const User = require("../models/User");
const Admin = require("../models/adminModel");
const argon2d = require("argon2");
const jwt = require("jsonwebtoken");

const registerUserService = async ({
  fullName,
  email,
  accountName,
  password,
}) => {
  const user = await User.findOne({ $or: [{ email }, { accountName }] });

  if (user) {
    throw { status: 400, message: "Email or accountName already taken" };
  }

  const hashedPassword = await argon2d.hash(password);
  const newUser = new User({
    fullName,
    email,
    accountName,
    password: hashedPassword,
  });
  await newUser.save();

  const accessToken = jwt.sign(
    { userId: newUser._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );

  return { success: true, message: "User created successfully", accessToken };
};

const loginUserService = async ({ accountName, email, password }) => {
  const user = await User.findOne({ $or: [{ email }, { accountName }] });

  if (!user) {
    throw { status: 400, message: "Incorrect email or accountName" };
  }

  const passwordValid = await argon2d.verify(user.password, password);

  if (!passwordValid) {
    throw { status: 400, message: "Incorrect password" };
  }

  const accessToken = jwt.sign(
    { userId: user._id, userName: user.accountName },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );

  return { success: true, message: "User logged in successfully", accessToken };
};

const loginAdminService = async ({ accountName, password }) => {
  const admin = await Admin.findOne({ accountName });

  if (!admin) {
    throw { status: 400, message: "Admin account not found" };
  }

  if (!admin.password.startsWith("$argon2i$")) {
    const hashedPassword = await argon2d.hash(password, {
      type: argon2d.argon2i,
    });
    admin.password = hashedPassword;
    await admin.save();
  }

  const passwordValid = await argon2d.verify(admin.password, password);

  if (!passwordValid) {
    throw { status: 400, message: "Incorrect password" };
  }

  const accessToken = jwt.sign(
    { adminId: admin._id, adminName: admin.accountName },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );

  return {
    success: true,
    message: "Admin logged in successfully",
    accessToken,
  };
};
//get user check token
const getUserService = async (req) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    throw { status: 400, message: "No token provided" };
  }
  const token = authorization.split(" ")[1];
  if (!token) {
    throw { status: 400, message: "No token provided" };
  }
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findById(decoded.userId);
  if (!user) {
    throw { status: 400, message: "User not found" };
  }
  return { success: true, message: "User found", user };
};

module.exports = {
  registerUserService,
  loginUserService,
  loginAdminService,
  getUserService,
};
