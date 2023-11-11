const questions = [
    "1.How satisfied are you with our products? (Rating type, 1-5)",
    "2.How fair are the prices compared to similar retailers? (Rating type, 1-5)",
    "3.How satisfied are you with the value for money of your purchase? (Rating Type, 1-5)",
    "4.On a scale of 1-10 how would you recommend us to your friends and family? (Rating Type, 1-10)",
    "5.What could we do to improve our service? (Text Type)"
];

let currentQuestionIndex = 0;

const questionText = document.getElementById("questionText");
const answerOptions = document.getElementById("answerOptions");
const startBtn = document.getElementById("startBtn");
const prevBtn = document.getElementById("prevBtn");
const skipBtn = document.getElementById("skipBtn");
const nextBtn = document.getElementById("nextBtn");
const confirmationDialog = document.getElementById("confirmationDialog");
const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");
const thankYouScreen = document.querySelector(".thank-you-screen");

startBtn.addEventListener("click", startSurvey);
prevBtn.addEventListener("click", showPreviousQuestion);
skipBtn.addEventListener("click", showNextQuestion);
nextBtn.addEventListener("click", showNextQuestion);
confirmBtn.addEventListener("click", submitSurvey);
cancelBtn.addEventListener("click", cancelSubmit);

function startSurvey() {
    document.querySelector(".welcome-screen").classList.add("hidden");
    document.querySelector(".question-container").classList.remove("hidden");
    showQuestion();
}

function showQuestion() {
    const questionNumber = currentQuestionIndex + 1;
    questionText.textContent = questions[currentQuestionIndex];
    answerOptions.innerHTML = "";

    if (currentQuestionIndex > 0) {
        prevBtn.classList.remove("hidden");
    } else {
        prevBtn.classList.add("hidden");
    }

    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.classList.add("hidden");
        skipBtn.classList.add("hidden");
    } else {
        nextBtn.classList.remove("hidden");
        skipBtn.classList.remove("hidden");
    }

    // Logic for different question types (Rating type or Text Type)
    if (currentQuestionIndex === questions.length - 1) {
        const textarea = document.createElement("textarea");
        textarea.setAttribute("id", "answer");
        answerOptions.appendChild(textarea);
    } else {
        for (let i = 1; i <= (currentQuestionIndex === 3 ? 10 : 5); i++) {
            const radioBtn = document.createElement("input");
            radioBtn.setAttribute("type", currentQuestionIndex === 3 ? "radio" : "checkbox");
            radioBtn.setAttribute("name", "answerOption");
            radioBtn.setAttribute("id", `option${i}`);
            radioBtn.setAttribute("value", i);
            const label = document.createElement("label");
            label.setAttribute("for", `option${i}`);
            label.textContent = i;
            answerOptions.appendChild(radioBtn);
            answerOptions.appendChild(label);
        }
    }

    // Update question number in the UI
    document.getElementById("questionNumber").textContent = `${questionNumber}/${questions.length}`;
}

function showPreviousQuestion() {
    currentQuestionIndex--;
    showQuestion();
}

function showNextQuestion() {
    const answer = getAnswer();
    // Save answer to database or local storage using AJAX request (not implemented in this example)
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        confirmationDialog.classList.remove("hidden");
    }
}

function getAnswer() {
    if (currentQuestionIndex === questions.length - 1) {
        return document.getElementById("answer").value;
    } else {
        const selectedOptions = document.querySelectorAll("input[name='answerOption']:checked");
        const answerArray = Array.from(selectedOptions).map(option => option.value);
        return answerArray.join(", ");
    }
}

function submitSurvey() {
    // Set flag as 'COMPLETED' in the database or local storage using AJAX request (not implemented in this example)
    confirmationDialog.classList.add("hidden");
    document.querySelector(".question-container").classList.add("hidden");
    thankYouScreen.classList.remove("hidden");

    setTimeout(() => {
        document.querySelector(".thank-you-screen").classList.add("hidden");
        document.querySelector(".welcome-screen").classList.remove("hidden");
        currentQuestionIndex = 0;
    }, 5000);
}

function cancelSubmit() {
    confirmationDialog.classList.add("hidden");
}