const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answerContainer = document.getElementById("answer-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-question");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
    {
        question: "What is the capital of france?",
        answer: [
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "madrid", correct: false },
        ],
    },
    {
        question: "What is the capital of bihar?",
        answer: [
            { text: "Patna", correct: true },
            { text: "ara", correct: false },
            { text: "Saran", correct: false },
            { text: "Delhi", correct: false },
        ],
    },
    {
        question: "What is the capital of Delhi?",
        answer: [
            { text: "M.P", correct: false },
            { text: "U.P", correct: false },
            { text: "Mumbai", correct: false },
            { text: "New Delhi", correct: true },
        ],
    },
    {
        question: "What is the capital of uttar pradesh?",
        answer: [
            { text: "Lucknow", correct: true },
            { text: "Siliguri", correct: false },
            { text: "Durgapur", correct: false },
            { text: "Kolkata", correct: false },
        ],
    }, {
        question: "What is the capital of rajasthan?",
        answer: [
            { text: "Ajmer", correct: false },
            { text: "Jodhpur", correct: false },
            { text: "Jaipur", correct: true },
            { text: "Varanasi", correct: false },
        ],
    },

]

let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startButton.addEventListener("click", startQuiz)
restartButton.addEventListener("click", restartQuiz)

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion()
}

function showQuestion() {
    answerDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex  / quizQuestions.length) *  100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;

    answerContainer.innerHTML = "";

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        button.dataset.correct = answer.correct

        button.addEventListener("click",selectAnswer)

        answerContainer.appendChild(button);
    })
}

function  selectAnswer(event) {
    if(answerDisabled) return

    answerDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answerContainer.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }else {
            button.classList.add("incorrect");
        }
    });
    if(isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }
   setTimeout(() =>{
       currentQuestionIndex++;

       if (currentQuestionIndex < quizQuestions.length) {
           showQuestion();
       }else{
           showResults();
       }
   },1000)
}

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score / quizQuestions.length) *  100;

    if (percentage === 100) {
        resultMessage.textContent = "perfect! you're a genius";
    }else if(percentage >= 80) {
        resultMessage.textContent = "Great job! you know you stuff!";
    }else if(percentage >= 60) {
        resultMessage.textContent = "Good effort! keep learning!";
    }else if(percentage >= 40) {
        resultMessage.textContent = "Not bad! try again to improve!";
    }else {
        resultMessage.textContent = "Keep studying! you'll get better!";
    }
}

function restartQuiz() {
    resultScreen.classList.remove("active");
    quizScreen.classList.add("active");

    startQuiz();
}