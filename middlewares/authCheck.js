const { jwtFunctions } = require("../jwt/jwtFunctions");




module.exports.checkAuth = async (req, res, next) => {
    try {
      let token = req.headers.authorization;

      if (!token) {
        throw new ApiError(401, 'Token invalid/access denied');
      }

      token = token.split(" ")[1];

      const verifiedUser = await jwtFunctions.verifyAccessToken(token);
      if (!verifiedUser) {
        throw new ApiError(401, 'You are not authorized/verification failed');
      }
      req.user = verifiedUser;
      next();
    } catch (error) {
      next(error);
    }
  };
