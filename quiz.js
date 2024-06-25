const questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: [
            {text: "scripting", correct: false},
            {text: "script", correct: true},
            {text: "js", correct: false},
            {text: "javascript", correct: false},
        ]
    },
    {
        question: "The external JavaScript file must contain the script tag.",
        answers: [
            {text: "True", correct: false},
            {text: "False", correct: true},
        ]
    },
    {
        question: "How do you write \'Hello World'\ in an alert box?",
        answers: [
            {text: "alertBox('Hello World')", correct: false},
            {text: "msg('Hello World')", correct: false},
            {text: "msgBox('Hello World')", correct: false},
            {text: "alert('Hello World')", correct: true},
        ]
    },
    {
        question: "How do you create a function in JavaScript?",
        answers: [
            {text: "function myFunction()", correct: true},
            {text: "function:myFunction()", correct: false},
            {text: "function = myFunction()", correct: false},
            {text: "None of the above", correct: false},
        ]
    },
    {
        question: "How to write an IF statement in JavaScript?",
        answers: [
            {text: "if (i==5)", correct: true},
            {text: "if i = = 5 then", correct: false},
            {text: "if i=5", correct: false},
            {text: "if i=5 then", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answerBtn");
const nextButton = document.getElementById("next");

let currentQuestionIndex = 0;
let  score = 0;

function startQuiz(){
    document.querySelector('.start-quiz').style.display = 'none';
    document.querySelector('.quiz').style.display = 'block';
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex  + 1;
    questionElement.innerHTML = questionNo + ". "+ currentQuestion.question;
    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        answerButton.appendChild(button);
        if(answers.correct){
            button.dataset.correct = answers.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while (answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
}
