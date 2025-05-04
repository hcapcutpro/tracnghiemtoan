let currentQuiz = [];
let currentIndex = 0;
let answers = [];
let startTime;
let timerInterval;
let answered = false;
let quizSubmitted = false;

let countdown = null;
let countdownSeconds = 0;

function selectSubject(subject) {
  // Xử lý chọn môn học với biến subject
  // Ví dụ:
  // currentSubject = subject;
  // Hiển thị quiz-container, ẩn giao diện chọn môn, v.v.
  window.subject = subject; // Lưu lại môn hiện tại để dùng ở các nơi khác
  if (subject && questions[subject]) {
    currentQuiz = questions[subject];
    currentIndex = 0;
    answers = Array(currentQuiz.length).fill(null);
    quizSubmitted = false;
    document.getElementById("quiz-container").classList.remove("hidden");
    document.getElementById("result").classList.add("hidden");
    document.getElementById("subject-selection-grid").classList.add("hidden");
    document.getElementById("total-questions").textContent = currentQuiz.length;
    document.getElementById("submit-btn").classList.add("hidden");
    startTimer();
    showQuestion();
  }
}

function showQuestion() {
  answered = false;
  const q = currentQuiz[currentIndex];
  document.getElementById("question-text").textContent = q.question;
  document.getElementById("current-question").textContent = currentIndex + 1;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, idx) => {
    const option = document.createElement("div");
    option.classList.add("option");
    option.textContent = opt;
    if (answers[currentIndex] !== null) {
      // Đã trả lời
      if (idx === q.answer) option.classList.add("correct");
      if (answers[currentIndex] === idx && answers[currentIndex] !== q.answer)
        option.classList.add("incorrect");
      option.classList.add("disabled");
    } else {
      option.onclick = () => selectOption(idx);
    }
    optionsDiv.appendChild(option);
  });

  // Hiện thông báo đúng/sai nếu đã trả lời
  const feedback = document.getElementById("feedback");
  if (!feedback) {
    const fb = document.createElement("div");
    fb.id = "feedback";
    fb.style.marginTop = "15px";
    fb.style.fontWeight = "bold";
    fb.style.fontSize = "18px";
    optionsDiv.parentNode.appendChild(fb);
  } else {
    feedback.innerHTML = "";
  }
  if (answers[currentIndex] !== null) {
    showFeedback();
  }

  // Update navigation buttons
  document.getElementById("prev-btn").disabled = currentIndex === 0;
  document.getElementById("next-btn").disabled = answers[currentIndex] === null;
  document.getElementById("next-btn").classList.remove("hidden");
  document.getElementById("submit-btn").classList.add("hidden");

  // Nếu là câu cuối cùng và đã trả lời hết thì hiện nút Xác nhận
  if (currentIndex === currentQuiz.length - 1) {
    const allAnswered = answers.every((a) => a !== null);
    if (allAnswered && !quizSubmitted) {
      document.getElementById("next-btn").classList.add("hidden");
      document.getElementById("submit-btn").classList.remove("hidden");
    }
  }
}

function selectOption(index) {
  if (answers[currentIndex] !== null) return; // Không cho chọn lại
  answers[currentIndex] = index;
  answered = true;
  showQuestion();
}

function showFeedback() {
  const q = currentQuiz[currentIndex];
  const feedback = document.getElementById("feedback");
  if (answers[currentIndex] === q.answer) {
    feedback.innerHTML =
      '<span style="color: var(--correct-color)">Chính xác!</span>';
  } else {
    feedback.innerHTML =
      '<span style="color: var(--incorrect-color)">Chưa đúng!</span> Đáp án đúng là: <b>' +
      q.options[q.answer] +
      "</b>";
  }
}

function prevQuestion() {
  if (currentIndex > 0) {
    currentIndex--;
    showQuestion();
  }
}

function nextQuestion() {
  if (answers[currentIndex] === null) {
    alert("Vui lòng chọn một đáp án trước khi tiếp tục!");
    return;
  }
  if (currentIndex < currentQuiz.length - 1) {
    currentIndex++;
    showQuestion();
  }
}

function submitQuiz() {
  console.log("Submit button clicked");
  quizSubmitted = true;
  showResult();
}

function startTimer() {
  startTime = new Date();
  clearInterval(timerInterval);
  clearInterval(countdown);
  if (window.subject === "tonghop") {
    countdownSeconds = 15 * 60; // 15 phút
    updateCountdown();
    countdown = setInterval(() => {
      countdownSeconds--;
      updateCountdown();
      if (countdownSeconds <= 0) {
        clearInterval(countdown);
        alert("Hết giờ! Bài làm sẽ được nộp tự động.");
        quizSubmitted = true;
        showResult();
      }
    }, 1000);
  } else {
    timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
  }
}

function updateTimer() {
  const now = new Date();
  const diff = Math.floor((now - startTime) / 1000);
  const minutes = Math.floor(diff / 60);
  const seconds = diff % 60;
  document.getElementById("timer").textContent = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function updateCountdown() {
  const minutes = Math.floor(countdownSeconds / 60);
  const seconds = countdownSeconds % 60;
  document.getElementById("timer").textContent = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function showResult() {
  console.log("Starting showResult function");
  clearInterval(timerInterval);
  const correct = answers.filter(
    (ans, idx) => ans === currentQuiz[idx].answer
  ).length;
  const timeDiff = Math.floor((new Date() - startTime) / 1000);
  const minutes = Math.floor(timeDiff / 60);
  const seconds = timeDiff % 60;
  const percentage = (correct / currentQuiz.length) * 100;

  console.log("Quiz results:", {
    correct,
    total: currentQuiz.length,
    percentage,
    time: `${minutes}:${seconds}`,
  });

  // Hide quiz container and show result
  const quizContainer = document.getElementById("quiz-container");
  const resultDiv = document.getElementById("result");

  console.log("Elements before update:", {
    quizContainer: quizContainer ? "found" : "not found",
    resultDiv: resultDiv ? "found" : "not found",
  });

  // Đảm bảo quiz container được ẩn
  if (quizContainer) {
    quizContainer.classList.add("hidden");
    console.log("Quiz container hidden");
  }

  // Đảm bảo result div được hiển thị
  if (resultDiv) {
    resultDiv.classList.remove("hidden");
    console.log("Result div shown");
  }

  // Update result values
  document.getElementById("correct-answers").textContent = correct;
  document.getElementById("total-questions-result").textContent =
    currentQuiz.length;
  document.getElementById("percentage").textContent = percentage.toFixed(1);
  document.getElementById("time-taken").textContent = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  // Thêm đánh giá khích lệ
  let feedback = "";
  if (percentage >= 90) {
    feedback =
      "🎉 Xuất sắc! Em đã hoàn thành bài kiểm tra rất tốt! Hãy tiếp tục phát huy nhé!";
  } else if (percentage >= 70) {
    feedback =
      "👍 Tốt lắm! Em đã làm rất tốt! Hãy cố gắng thêm một chút nữa nhé!";
  } else if (percentage >= 50) {
    feedback =
      "💪 Khá tốt! Em đã nắm được kiến thức cơ bản. Hãy luyện tập thêm để đạt kết quả tốt hơn!";
  } else {
    feedback =
      "📚 Em đã cố gắng rồi! Hãy xem lại các câu sai và luyện tập thêm nhé! Thầy/cô tin em sẽ làm tốt hơn!";
  }

  console.log("Feedback to be displayed:", feedback);

  // Thêm phần đánh giá khích lệ vào kết quả
  let feedbackElement = document.querySelector(".feedback");
  console.log("Feedback element:", feedbackElement ? "found" : "not found");

  if (!feedbackElement) {
    console.log("Creating new feedback element");
    feedbackElement = document.createElement("p");
    feedbackElement.className = "feedback";
    resultDiv.insertBefore(
      feedbackElement,
      document.getElementById("explanations")
    );
  }
  feedbackElement.textContent = feedback;

  // Hiển thị giải thích cho từng câu
  const explanationsDiv = document.getElementById("explanations");
  console.log("Explanations div:", explanationsDiv ? "found" : "not found");

  explanationsDiv.innerHTML = "<h3>Giải thích từng câu:</h3>";
  console.log(currentQuiz);
  currentQuiz.forEach((q, idx) => {
    console.log(q);

    let userAns = answers[idx];
    let correct = userAns === q.answer;
    let explain = q.explanation
      ? `<div style='margin-top:4px'><i>${q.explanation}</i></div>`
      : "<div style='margin-top:4px'><i>Chưa có giải thích cho câu này.</i></div>";
    explanationsDiv.innerHTML += `<div style='margin-bottom:12px;padding:8px;border:1px solid #eee;border-radius:6px;'>
        <b>Câu ${idx + 1}:</b> ${q.question}<br>
        <span style='color:${correct ? "#4caf50" : "#f44336"}'>
          Đáp án của bạn: ${
            userAns !== null ? q.options[userAns] : "(Chưa chọn)"
          }
        </span><br>
        <span style='color:#4a90e2'>Đáp án đúng: ${q.options[q.answer]}</span>
        ${explain}
        ${autoExplain}
      </div>`;
  });

  console.log("Result display completed");
  console.log("Elements state:", {
    quizContainer: quizContainer
      ? quizContainer.classList.toString()
      : "not found",
    resultDiv: resultDiv ? resultDiv.classList.toString() : "not found",
  });
}

function resetQuiz() {
  currentIndex = 0;
  answers = Array(currentQuiz.length).fill(null);
  quizSubmitted = false;
  document.getElementById("result").classList.add("hidden");
  document.getElementById("quiz-container").classList.remove("hidden");
  document.getElementById("submit-btn").classList.add("hidden");
  clearInterval(countdown);
  clearInterval(timerInterval);
  startTimer();
  showQuestion();
}

function backToHome() {
  document.getElementById("result").classList.add("hidden");
  document.getElementById("quiz-container").classList.add("hidden");
  document.getElementById("subject-selection-grid").classList.remove("hidden");
  document.getElementById("subject").value = "";
}
