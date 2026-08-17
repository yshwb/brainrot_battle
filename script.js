// Dom Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz questions
const quizQuestions = [
  {
    question:
      "Your friend says 'I'm outside' but you know they are still a home What it is called ??",
    answers: [
      { text: "Delulu", correct: true },
      { text: "Teleportation", correct: false },
      { text: "Aura farming", correct: false },
      { text: "Quantum physics", correct: false },
    ],
  },
  {
    question:
      "Someone says 'Bro trust me' after doing something obviously stupid What should you do ??",
    answers: [
      { text: "Trust bro", correct: false },
      { text: "Record it", correct: true },
      { text: "Join immediately", correct: false },
      { text: "Call NASA", correct: false },
    ],
  },
  {
    question:
      "You opened instagram for 2 minutes and suddenly it's been hours Who is responsible",
    answers: [
      { text: "Algorithm", correct: true },
      { text: "Homework", correct: false },
      { text: "Alarm clock", correct: false },
      { text: "Newton", correct: false },
    ],
  },
  {
    question:
      "You studied for 5 minutes and suddenly you realised that you are ready for the exams What happened ??",
    answers: [
      { text: "Academic comeback", correct: false },
      { text: "Delusion", correct: true },
      { text: "Genius mode", correct: false },
      { text: "Character Development", correct: false },
    ],
  },
  {
    question:
      "Your crush replies 'haha' instead of '  hahahahahaha' What is the suituation",
    answers: [
      { text: "You're getting married", correct: false },
      { text: "Its over bro", correct: true },
      { text: "Huge W", correct: false },
      { text: "Main character moment", correct: false },
    ],
  },
];

// Quiz state vars
let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;
let activeQuestions = [...quizQuestions];

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// events listners

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function startQuiz() {
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = score;
  activeQuestions = shuffleArray(quizQuestions);

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  // reset state
  answerDisabled = false;

  const currentQuestion = activeQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent =
    ((currentQuestionIndex + 1) / activeQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  if (!answersContainer) return;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    button.dataset.correct = String(answer.correct);

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });

  quizScreen.classList.remove("active");
  void quizScreen.offsetWidth;
  quizScreen.classList.add("active");
}

function selectAnswer(event) {
  // optimization check
  if (answerDisabled) return;

  answerDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    // check if there are more questions
    if (currentQuestionIndex < activeQuestions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Bro is not cooked Absolute W !!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Okheyy big brain energy !!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Bro brought vibes not knowlegde";
  } else {
    resultMessage.textContent = "Bro...... the quiz cooked you ";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startScreen.classList.add("active");
  quizScreen.classList.remove("active");

  currentQuestionIndex = 0;
  score = 0;
  answerDisabled = false;
  scoreSpan.textContent = score;
  progressBar.style.width = "0%";
  if (answersContainer) {
    answersContainer.innerHTML = "";
  }
  currentQuestionSpan.textContent = 1;
  questionText.textContent = "Question goes here";
}
