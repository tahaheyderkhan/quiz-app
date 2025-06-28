const SUPABASE_URL = 'https://hwwoovsayomjkvuqdjfm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3d29vdnNheW9tamt2dXFkamZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMDU3OTAsImV4cCI6MjA2NjY4MTc5MH0.OTWUmNAsZZiCcifUQxMfUhUmfarz8kWpjY6TIWg1hQk';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);





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


async function showResult() {
  questionEl.classList.add("hide");
  optionsEl.classList.add("hide");
  nextBtn.classList.add("hide");
  resultEl.classList.remove("hide");
  resultEl.textContent = `You scored ${score} out of ${questions.length}`;

  // Save only score to Supabase
  const { data, error } = await supabaseClient
    .from('quiz_result') // Make sure this table exists
    .insert([{ score }]);

  if (error) {
    console.error("Error saving score:", error);
  } else {
    console.log("Score saved:", data);
  }
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
