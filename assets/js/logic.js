/*In order to complete this challenge, the exercise completed in class '07-Stu-Word-Guess'
has been used as referent.*/
// Access elements
var timerElement = document.querySelector("#time");
var startButton = document.querySelector("#start");
var questionElement = document.querySelector("#question-title");
var choicesElement = document.querySelector("#choices");
var finalScoreSpan = document.querySelector("#final-score");
var initialsInput = document.querySelector("#initials");

// Use questions.js to store the questions and answers.
console.log(questions[1]);

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

function displayQuiz() {
questionElement.textContent = 0;
}


// When timer reaches 0, loseQuiz function is called.
// Start button is activated again.
function loseQuiz() {
    wordBlank.textContent = "GAME OVER";
    loseCounter++
    startButton.disabled = false;
    
  }