const lessons = {
  1: [
    { question: "What color is the sky? 💙", answers: ["blue"] },
    { question: "What sound does a cat make? 🐱", answers: ["meow"] },
    { question: "Which fruit is yellow? 🍌", answers: ["banana"] }
  ],
  2: [
    { question: "Complete: I ___ happy.", answers: ["am"] },
    { question: "What is the opposite of hot?", answers: ["cold"] },
    { question: "Make this plural: cat.", answers: ["cats"] }
  ],
  3: [
    { question: "Complete: Yesterday, I ___ to school.", answers: ["went"] },
    { question: "What is the opposite of difficult?", answers: ["easy", "simple"] },
    { question: "Complete: They ___ playing.", answers: ["are"] }
  ]
};

function normalize(text) {
  return text.toLowerCase().trim().replace(/[^a-z0-9\s]/g, "");
}

function chooseQuestion(level, previousQuestion) {
  const options = lessons[level].filter(
    lesson => lesson.question !== previousQuestion
  );
  const pool = options.length ? options : lessons[level];
  return pool[Math.floor(Math.random() * pool.length)];
}

function getQuestion(child) {
  const lesson = chooseQuestion(child.level, child.currentQuestion.question);
  child.currentQuestion = {
    question: lesson.question,
    answers: lesson.answers
  };
  return lesson.question;
}

function checkAnswer(child, message) {
  const expected = child.currentQuestion.answers.map(normalize);
  const answer = normalize(message);
  return expected.includes(answer);
}

async function teach(child, message) {
  if (!child.currentQuestion.question) {
    return {
      reply: `Let's learn English! 🌟 ${getQuestion(child)}`
    };
  }

  child.totalAnswered += 1;

  if (!checkAnswer(child, message)) {
    child.correctStreak = 0;
    const answer = child.currentQuestion.answers[0];
    return {
      reply: `Good try! 😊 Here's a hint: it starts with "${answer[0].toUpperCase()}". Try again!`
    };
  }

  child.totalCorrect += 1;
  child.correctStreak += 1;
  child.currentQuestion = { question: null, answers: [] };

  let reply = "Amazing! 🎉 Great job!";

  if (child.correctStreak >= 3 && child.level < 3) {
    child.level += 1;
    child.correctStreak = 0;
    reply += ` You unlocked Level ${child.level}! 🚀`;
  }

  return {
    reply: `${reply}\n${getQuestion(child)}`
  };
}

module.exports = { teach };