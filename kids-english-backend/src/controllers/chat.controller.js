const Child = require("../models/Child");
const asyncHandler = require("../utils/asyncHandler");
const { handleMessage } = require("../services/chat.service");

exports.chat = asyncHandler(async (req, res) => {
  const { childId, message } = req.body;

  let child = await Child.findOne({ childId });
  if (!child) {
    child = new Child({ childId, level: 1 });
  }

  const { reply, mode } = await handleMessage(child, message);
  await child.save();

  res.json({
    success: true,
    reply,
    progress: {
      level: child.level,
      correctStreak: child.correctStreak,
      totalCorrect: child.totalCorrect,
      totalAnswered: child.totalAnswered,
      mode
    }
  });
});