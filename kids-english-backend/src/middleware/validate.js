const AppError = require("../utils/AppError");

exports.validateChat = (req, res, next) => {
  const { childId, message } = req.body || {};

  if (
    typeof childId !== "string" ||
    !/^[a-zA-Z0-9_-]{1,64}$/.test(childId) ||
    typeof message !== "string" ||
    !message.trim() ||
    message.length > 500
  ) {
    return next(
      new AppError("Invalid childId or message", 400)
    );
  }

  req.body.childId = childId.trim();
  req.body.message = message.trim();

  next();
};

exports.validateChildId = (req, res, next) => {
  if (!/^[a-zA-Z0-9_-]{1,64}$/.test(req.params.childId || "")) {
    return next(new AppError("Invalid child ID", 400));
  }

  next();
};