const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { config } = require('../config');


const generateAccessToken = (data) => {
  const accessToken = jwt.sign(data, config.jwt_secret_key, {
    expiresIn: '2days',
  });
  return accessToken;
};
const generateRefreshToken = (data) => {
  const refreshToken = jwt.sign(data, config.jwt_secret_key, {
    expiresIn: '30day',
  });
  return refreshToken;
};

const verifyAccessToken = (token) => {
  const decodedToken = jwt.verify(token, config.jwt_secret_key);
  return decodedToken;
};
const verifyRefreshToken = (token) => {
  const decodedToken = jwt.verify(token, config.jwt_secret_key);
  return decodedToken;
};

module.exports.jwtFunctions = {
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
};
