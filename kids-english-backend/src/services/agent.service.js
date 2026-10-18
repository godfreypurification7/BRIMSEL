function detectMode(message, prevMode) {
  const t = message.toLowerCase();
  if (/\b(sad|scared|afraid|upset|lonely|worried|cry)\b/.test(t))
    return { mode: "support", mood: "possibly_upset" };
  if (/\b(tired|sleepy|bored|stop|break)\b/.test(t))
    return { mode: "engagement", mood: "possibly_tired" };
  if (/\b(play|game|joke|story|sing)\b/.test(t))
    return { mode: "engagement", mood: "playful" };
  if (/\b(hello|hi|hey|how are you)\b/.test(t))
    return { mode: "conversation", mood: "social" };
  // sticky support: stay supportive one extra turn after upset
  if (prevMode === "support") return { mode: "support", mood: "recovering" };
  return { mode: "learning", mood: "unknown" };
}

const SEL = {
  support: [
    "I'm here with you. 💛 It's okay to feel big feelings. Want to take a calm breath together?",
    "You are safe and loved. 🌈 Would you like to talk, or hear a gentle story?",
  ],
  engagement: [
    "Let's have fun! 🎈 Story, joke, or word game?",
    "Yay, play time! 🎉 What sounds fun?",
  ],
  conversation: [
    "Hello, little star! 🌟 How are you today?",
    "Hi friend! 😊 I'm so happy to see you!",
  ],
  encouragement: [
    "You're doing great! 💪",
    "I love how you keep trying! 🌟",
  ],
};
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

async function handleMessage(child, message) {
  const { mode, mood } = detectMode(message, child.mode);
  child.mode = mode;
  child.mood = mood;

  if (mode === "support")     return { reply: pick(SEL.support), mode, mood };
  if (mode === "engagement")  return { reply: pick(SEL.engagement), mode, mood };
  if (mode === "conversation")return { reply: pick(SEL.conversation), mode, mood };

  const { teach } = require("./learning.service");
  const result = await teach(child, message);
  // inject SEL encouragement after successful answers
  if (result.correct && child.correctStreak > 0) {
    child.encouragementCount++;
    result.reply = `${pick(SEL.encouragement)} ${result.reply}`;
  }
  return { reply: result.reply, mode, mood };
}

module.exports = { handleMessage };