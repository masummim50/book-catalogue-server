import { AuthServices } from "./auth.services";

export const createUserController = async (req, res, next) => {
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

const generateNewAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (refreshToken) {
      const istokenVerified = await jwtFunctions.verifyRefreshToken(
        refreshToken
      );

      if (istokenVerified) {
        const newAccessToken = await jwtFunctions.generateAccessToken({
          _id: istokenVerified._id,
          role: istokenVerified.role,
        });
        sendResponse(res, 200, "new accesstoken generated successfully", {
          accessToken: newAccessToken,
        });
      }
    } else {
      throw new ApiError(400, "refreshtoken not available");
    }
  } catch (error) {
    next(error);
  }
};

export const AuthController = {
  createUserController,
  loginUserController,
  generateNewAccessToken,
};
