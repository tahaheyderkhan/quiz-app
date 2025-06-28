const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Central Style Sheet",
      "Cascading Style Sheet",
      "Cascading Simple Sheet",
      "Cars SUVs Sailboats"
    ],
    answer: "Cascading Style Sheet"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");

function showQuestion() {
  let q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  q.options.forEach(option => {
    let li = document.createElement("li");
    li.innerHTML = `<label><input type="radio" name="option" value="${option}"> ${option}</label>`;
    optionsEl.appendChild(li);
  });
}

function showResult() {
  questionEl.classList.add("hide");
  optionsEl.classList.add("hide");
  nextBtn.classList.add("hide");
  resultEl.classList.remove("hide");
  resultEl.textContent = `You scored ${score} out of ${questions.length}`;
}

nextBtn.addEventListener("click", () => {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert("Please select an option");
    return;
  }

  if (selected.value === questions[currentQuestion].answer) {
    score++;
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

showQuestion();
