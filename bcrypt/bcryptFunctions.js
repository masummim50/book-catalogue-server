const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const genSalt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, genSalt);
  return hashedPassword;
};

const matchPassword = (
  password,
  hashedPassword
) => {
  const isMatch = bcrypt.compare(password, hashedPassword);
  return isMatch;
};

const bcryptFunctions = {
  hashPassword,
  matchPassword,
};

module.exports = bcryptFunctions;