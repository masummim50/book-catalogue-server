const AuthServices =  require("./auth.services");
const sendResponse = require('./../../shared/sendResponse');
const { jwtFunctions } = require("../../jwt/jwtFunctions");
const ApiError = require("../../errors/apiError");

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
    const { accessToken, refreshToken, user } = await AuthServices.loginUser(
      loginData
    );
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
    sendResponse(res, 200, "logged in successfully", { accessToken, user });
  } catch (error) {
    next(error);
  }
};

const verifyAccessToken = async(req, res, next)=> {
  try {
    
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await jwtFunctions.verifyAccessToken(token);
    if(decoded){
      sendResponse(res, 200, "token valid", decoded)
    }else{
      throw new ApiError(400, "token expired or invalid")
    }
  } catch (error) {
    next(error)
  }
}

const AuthController = {
  createUserController,
  loginUserController,
  verifyAccessToken
}

module.exports= AuthController;
