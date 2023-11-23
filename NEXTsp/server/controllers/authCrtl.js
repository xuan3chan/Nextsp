// controllers/authCtrl.js
const authService = require("../services/authService");
const handleErrorResponse = require("../middleware/errorHandling");

const registerUser = async (req, res) => {
  const { fullName, email, accountName, password } = req.body;

  if (!fullName || !email || !accountName || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing email and/or password" });
  }

  try {
    const result = await authService.registerUserService({
      fullName,
      email,
      accountName,
      password,
    });
    res.json(result);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const loginUser = async (req, res) => {
  const { accountName, email, password } = req.body;

  if (!accountName && !email) {
    return res
      .status(400)
      .json({ success: false, message: "Missing email and/or password" });
  }

  try {
    const result = await authService.loginUserService({
      accountName,
      email,
      password,
    });
    res.json(result);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const loginAdmin = async (req, res) => {
  const { accountName, password } = req.body;

  console.log("AccountName:", accountName);

  if (!accountName || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing accountName and/or password" });
  }

  try {
    const result = await authService.loginAdminService({
      accountName,
      password,
    });
    res.json(result);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
// get user

const getUserController = async (req, res) => {
  try {
    const user = await authService.getUserService(req);
    res.json(user);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  loginAdmin,
  getUserController,
};
