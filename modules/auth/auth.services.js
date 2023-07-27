
const bcryptFunctions = require("../../bcrypt/bcryptFunctions");
const ApiError = require("../../errors/apiError");
const { jwtFunctions } = require("../../jwt/jwtFunctions");
const userModel = require("../user/user.model")


const createUser = async (user) => {
  const newuser = await userModel.create(user);
  return newuser;
};

const loginUser = async (loginData) => {
  const user = await userModel.findOne({
    email: loginData.email,
  });
  if (!user) {
    throw new ApiError(400, "invalid credentials/user not found");
  }


  const isPasswordMatched = await bcryptFunctions.matchPassword(
    loginData.password,
    user.password
  );
  if (!isPasswordMatched) {
    throw new ApiError(400, "invalid credentials");
  }

  const accessToken = await jwtFunctions.generateAccessToken({
    _id: user._id,
    email: user.email,
    name: user.name
  });
  const refreshToken = await jwtFunctions.generateRefreshToken({
    _id: user._id,
    email: user.email,
    name: user.name
  });

  return { accessToken, refreshToken, user: {_id:user._id, email:user.email, name:user.name} };
};

const AuthServices = {
  createUser,
  loginUser,
};

module.exports = AuthServices;
