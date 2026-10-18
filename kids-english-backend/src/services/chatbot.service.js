
const { teach } = require("./learning.service");

function detectMode(message) {
  const text = message.toLowerCase();

  if (/\b(sad|scared|afraid|upset|lonely|worried)\b/.test(text)) {
    return { mode: "support", mood: "possibly_upset" };
  }

  if (/\b(tired|sleepy|bored|stop|break)\b/.test(text)) {
    return { mode: "engagement", mood: "possibly_tired" };
  }

  if (/\b(play|game|joke|story|sing)\b/.test(text)) {
    return { mode: "engagement", mood: "playful" };
  }

  if (/\b(hello|hi|hey|good morning|how are you)\b/.test(text)) {
    return { mode: "conversation", mood: "social" };
  }

  return { mode: "learning", mood: "unknown" };
}

async function handleMessage(child, message) {
  const state = detectMode(message);
  child.mode = state.mode;

  let reply;

  switch (state.mode) {
    case "support":
      reply = "I'm here with you. 💛 Would you like to talk or take a little break?";
      break;

    case "engagement":
      reply = "Let's have fun! 🎈 Would you like a story, a joke, or a word game?";
      break;

    case "conversation":
      reply = "Hello, little star! 🌟 How are you today?";
      break;

    default: {
      const result = await teach(child, message);
      reply = result.reply;
    }
  }

  return { reply, mode: state.mode, mood: state.mood };
}

module.exports = { handleMessage };
