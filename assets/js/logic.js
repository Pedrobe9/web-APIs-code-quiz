// Access elements
var timerElement = document.querySelector("#time");
var startButton = document.querySelector("#start");
var questionElement = document.querySelector("#question-title");
var choicesElement = document.querySelector("#choices");
var finalScoreSpan = document.querySelector("#final-score");
var initialsInput = document.querySelector("#initials");

// global variables
var rightQuestion = false;
var timerCount;


// Call startQuiz function with a click -associate event listener to start button
startButton.addEventListener("click", startQuiz);

function startQuiz() {
    rightQuestion = false;
    timerCount = 10;
    // Deactivate startButton to prevent
    startButton.disabled = true;
    displayQuiz();
    startTimer();
}



// start timer and check if quiz is right
function startTimer() {
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;
      if (timerCount >= 0) {
        // if question right in time set, Clears interval and stops timer
        if (rightQuestion && timerCount > 0) {
          clearInterval(timer);
          winQuiz();
        }
      }
      // Tests if time has run out, clears interval and triggers loseQuiz function
      if (timerCount === 0) {
        // Clears interval
        clearInterval(timer);
        loseQuiz();
      }
    }, 1000);
  }