const mongoose = require('mongoose');

const handleValidationError = (
  error
) => {
  const errors = Object.values(error.errors).map(el => {
    return {
      path: el?.path,
      message: el?.message,
    };
  });
  const validationError = {
    statusCode: 400,
    message: 'Validation Failed',
    errorMessages: errors,
  };
  return validationError;
};

module.exports = handleValidationError