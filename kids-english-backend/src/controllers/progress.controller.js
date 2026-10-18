const Child = require("../models/Child");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

exports.getProgress = asyncHandler(async (req, res) => {
  const child = await Child.findOne({ childId: req.params.childId }).select("-_id -__v");
  if (!child) throw new AppError("Progress not found", 404);

  res.json({
    success: true,
    progress: {
      level: child.level,
      correctStreak: child.correctStreak,
      totalCorrect: child.totalCorrect,
      totalAnswered: child.totalAnswered,
      mode: child.mode
    }
  });
});

exports.resetProgress = asyncHandler(async (req, res) => {
  const child = await Child.findOne({ childId: req.params.childId });
  if (!child) throw new AppError("Progress not found", 404);

  child.level = 1;
  child.correctStreak = 0;
  child.totalCorrect = 0;
  child.totalAnswered = 0;
  child.mode = "learning";
  child.currentQuestion = { question: null, answers: [] };
  await child.save();

  res.json({ success: true, message: "Progress reset successfully", level: child.level });
});