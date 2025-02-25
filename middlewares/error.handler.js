function logErrors (error, req, res, next) {
  console.error(error);
  next(error);
}

function errorHandler(error, req, res, next) {
  res.status(500).json({
    message: error.message,
    stackError: error.stack
  });
}

module.exports = {
  logErrors,
  errorHandler,
};
