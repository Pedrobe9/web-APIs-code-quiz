/*In order to complete this challenge, the exercise completed in class '07-Stu-Word-Guess'
has been used as referent.*/
// Access elements
var timerElement = document.querySelector("#time");
var startScreen = document.querySelector("#start-screen");
var startButton = document.querySelector("#start");
var questionElement = document.querySelector("#question-title");
var choicesElement = document.querySelector("#choices");
var finalScoreSpan = document.querySelector("#final-score");
var initialsInput = document.querySelector("#initials");
var displayQuestions = document.querySelector("#questions");
var displayElement = document.querySelector(".hide");


// Use file questions.js to store the questions and answers as seein g in
// https://stackoverflow.com/questions/41255861/how-to-pass-variable-from-one-javascript-to-another-javascript-file


// global variables
var rightQuestion = false;
var timerCount;
var questionChoice = question;
var multAnswerChoice = multAnswer;
var rightAnswer = rightAnswers


// Call startQuiz function with a click -associate event listener to start button
startButton.addEventListener("click", startQuiz);

function startQuiz() {
    startScreen.innerHTML = "";
    rightQuestion = false;
    timerCount = 200;
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
    var index = Math.floor(Math.random() * questionChoice.length);
    document.getElementById("questions").className = "MyClass";

    for (let i = 0; i < questionChoice.length; i++) {
        index = index + i;
        if (timerCount >= 0) {
            if (index < questionChoice.length) {
                index = index;
            } else {
                index = index - questionChoice.length;
            }
            document.getElementById("questions").className = "myClass";
            //questionElement.textContent = "";
            questionElement.textContent = questionChoice[index];
            //choicesElement.textContent = multAnswerChoice[index];
            var multAnswer = multAnswerChoice[i];
            for (let i = 0; i < multAnswer.length; i++) {
                
                var li = document.createElement("li");
                //li.textContent = multAnswer;
                li.setAttribute("data-index", i);
            
                var button = document.createElement("button");
                button.textContent = multAnswer[i];
            
                li.appendChild(button);
                choicesElement.appendChild(li);
            }

            choicesElement.addEventListener("click", function(event) {
                var element = event.target;
              
                // If that element is a button...
                if (element.matches("button") === true) {
                  // Get its data-index value and remove the todo element from the list
                  var index = element.parentElement.getAttribute("data-index");
                  todos.splice(index, 1);
              
                  // Store updated todos in localStorage, re-render the list
                  storeTodos();
                  renderTodos();
                }
              });
            console.log(questionChoice[index], "-----", multAnswerChoice[index]);
        }
        
    }
    

}


// When timer reaches 0, loseQuiz function is called.
// Start button is activated again.
function loseQuiz() {
    wordBlank.textContent = "GAME OVER";
    loseCounter++
    startButton.disabled = false;
    
  }