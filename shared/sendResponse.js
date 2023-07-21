const sendResponse = (res, statusCode, message, data, meta) => {
  const responseObj = {
    success: true,
    statusCode,
    message,
    data,
  };

  if (typeof meta !== "undefined") {
    responseObj.meta = meta;
  }

  res.status(statusCode).json(responseObj);
};

module.exports = sendResponse;