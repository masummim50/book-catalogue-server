

export const createUser = async (user) => {
  const newuser = await UserModel.create(user);
  return newuser;
};

const loginUser = async (loginData) => {
  const user = await UserModel.findOne({
    phoneNumber: loginData.phoneNumber,
  });
  if (!user) {
    throw new ApiError(400, 'invalid credentials/user not found');
  }
  const isPasswordMatched = await bcryptFunctions.matchPassword(
    loginData.password,
    user.password
  );
  if (!isPasswordMatched) {
    throw new ApiError(400, 'invalid credentials');
  }

  const accessToken = await jwtFunctions.generateAccessToken({
    _id: user._id,
    role: user.role,
  });
  const refreshToken = await jwtFunctions.generateRefreshToken({
    _id: user._id,
    role: user.role,
  });

  return { accessToken, refreshToken };
};

export const AuthServices = {
  createUser,
  loginUser,
};
