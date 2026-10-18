const mongoose = require('mongoose');

const childSchema = new mongoose.Schema(
  {
    childId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 64
    },
    level: {
      type: Number,
      enum: [1, 2, 3],
      default: 1
    },
    correctStreak: {
      type: Number,
      default: 0,
      min: 0
    },
    totalCorrect: {
      type: Number,
      default: 0,
      min: 0
    },
    totalAnswered: {
      type: Number,
      default: 0,
      min: 0
    },
    mode: {
      type: String,
      enum: ["learning", "conversation", "engagement", "support"],
      default: "learning"
    },
    currentQuestion: {
      question: { type: String, default: null },
      answers: { type: [String], default: [] }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("child", childSchema);