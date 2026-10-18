module.exports = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Invalid data";
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid identifier";
  } else if (err.code === 11000) {
    statusCode = 409;
    message = "Record already exists";
  }

  if (statusCode >= 500) {
    console.error(err);
    message = "Something went wrong. Please try again.";
  }

  res.status(statusCode).json({
    success: false,
    error: message
  });
};