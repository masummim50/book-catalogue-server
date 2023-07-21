


const globalErrorHandler = async (
  error,
  req,
  res,
  next
) => {
  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessages = [];

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    message = error?.message;
    statusCode = error?.statusCode;
    errorMessages = [
      {
        path: error?.message,
        message: error?.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error?.message;

    errorMessages = [
      {
        path: error?.message,
        message: error?.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: error?.stack,
  });
};

export default globalErrorHandler;