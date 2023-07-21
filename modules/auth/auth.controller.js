const AuthServices =  require("./auth.services");
const sendResponse = require('./../../shared/sendResponse');

const createUserController = async (req, res, next) => {
  try {
    const user = req.body;
    const newUser = await AuthServices.createUser(user);
    const { password, ...rest } = newUser._doc;

    sendResponse(res, 200, "User created Successfully", rest);
  } catch (error) {
    next(error);
  }
};

const loginUserController = async (req, res, next) => {
  try {
    const loginData = req.body;
    const { accessToken, refreshToken } = await AuthServices.loginUser(
      loginData
    );
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
    sendResponse(res, 200, "logged in successfully", { accessToken });
  } catch (error) {
    next(error);
  }
};

const AuthController = {
  createUserController,
  loginUserController,
}

module.exports= AuthController;
