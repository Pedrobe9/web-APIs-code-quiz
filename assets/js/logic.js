/*In order to complete this challenge, the exercise completed in class '07-Stu-Word-Guess'
has been used as referent.*/
// Access elements
var timerElement = document.querySelector("#time");
var startScreen = document.querySelector("#start-screen");
var startButton = document.querySelector("#start");
var questionElement = document.querySelector("#question-title");
var choicesElement = document.querySelector("#choices");
// https://www.w3schools.com/JSREF/prop_node_childnodes.asp
var choicesListElement = choicesElement.childNodes;
var finalScoreSpan = document.querySelector("#final-score");
var initialsInput = document.querySelector("#initials");
var displayQuestions = document.querySelector("#questions");
var displayElement = document.querySelector(".hide");
var pElement = document.createElement("p");
var finalScore = document.querySelector("#final-score");
var buttonElement = document.querySelector("#submit");

// Use file questions.js to store the questions and answers as seein g in
// https://stackoverflow.com/questions/41255861/how-to-pass-variable-from-one-javascript-to-another-javascript-file


// global variables
var wrongQuestion = false;
var score = 0;
var timerCount;
var indexQuestion = 0;
var timer;
var indexQ;
var answers;
var answerList;



// start timer and check if quiz is right
function startTimer() {
    timer = setInterval(function() {
        // Time left decreases each second
        timerCount--;
        if (timerCount < 0) {
            timerCount = 0;
        }
        //display time left on screen
        timerElement.textContent = timerCount;
        if (timerCount > 0) {
            // if question wrong, discount 10s
            if (wrongQuestion) {
                timerCount -= 10;
            }
            wrongQuestion = false;
        } else {
            // when time is up, stop timer and show end screen
            clearInterval(timer);
            endQuiz()
        }
      
    }, 1000);
}

//functions to show in screen message for right and wrong answers
function rightMessage() {
    pElement.textContent = "Right Answer";
    choicesElement.appendChild(pElement);
}
function wrongMessage() {
    pElement.textContent = "Wrong Answer";
    choicesElement.appendChild(pElement);
}

function clickAnswer() {
    // Check for click in list of posible answers
    var choicesListElement = choicesElement.childNodes;
    var answer = multAnswer[indexQ];
    for (let i = 0; i < answer.length; i++) {
        choicesListElement[i].addEventListener("click", function(event) {
            var answerClick = event.target;
            answerList = answerClick.textContent;
            console.log("answerList: ", answerList, "rightAnswers[indexQ]: ", rightAnswers[indexQ]);
            if (answerList === rightAnswers[indexQ]) {
                // print message of right answer and corresponding sound
                rightMessage();
                /* Play audio as shown in https://dobrian.github.io/cmp/topics/sample-recording-and-
                playback-with-web-audio-api/1.loading-and-playing-sound-files.html#:~:
                text=Method%202%3A%20JavaScript,back%20the%20sound%20with%20the%20.*/
                const audio = new Audio("./assets/sfx/correct.wav");
                audio.play()
                // if right answer, increase score and index question 
                score++;
                indexQ++;
                //loop question index, if it is greater that number of questions, start with 0 again
                if (timerCount >= 0) {
                    if (indexQ < question.length) {
                        indexQ = indexQ;
                    } else {
                        indexQ = indexQ - question.length;
                    }
                    //timeout will delay 2s to call the function
                    setTimeout(() => {
                        displayQuiz(indexQ);
                      }, "1500");
                }   
                
            } else {
                // print message error and corresponding sound
                wrongMessage();
                const audio = new Audio("./assets/sfx/incorrect.wav");
                audio.play()
                wrongQuestion = true;
                // increase index question
                indexQ++;
                //loop question index, if it is greater that number of questions, start with 0 again
                if (timerCount >= 0) {
                    if (indexQ < question.length) {
                        indexQ = indexQ;
                    } else {
                        indexQ = indexQ - question.length;
                    }
                    //timeout will delay 2s to call the function
                    setTimeout(() => {
                        displayQuiz(indexQ);
                      }, "1500");
                }   
            }
        });
    }
    
}

function displayQuiz(iQ) {
    questionElement.textContent = "";
    choicesElement.textContent = "";
    // Change hide class to show the questions
    document.getElementById("questions").className = "myClass";
    //questionElement.textContent = "";
    questionElement.textContent = question[iQ];
    var answer = multAnswer[iQ];
    console.log(question[iQ], "---", answer);
    console.log("after if: ", iQ);
    for (let i = 0; i < 4; i++) {
        
        var li = document.createElement("li");
        //li.textContent = multAnswer;
        li.setAttribute("data-index", i);
    
        var button = document.createElement("button");
        button.textContent = answer[i];
    
        li.appendChild(button);
        choicesElement.appendChild(li);
    
    }
    clickAnswer();
}

function startQuiz() {
    // Hide the starting screen so the questions can be seeing.
    //startScreen.innerHTML = "";
    document.getElementById("start-screen").className = "hide";
    rightQuestion = false;
    timerCount = 60;
    // Deactivate startButton to prevent click
    //startButton.disabled = true;
    const index = Math.floor(Math.random() * question.length);
    document.getElementById("questions").className = "MyClass";
    console.log("init: ", index);
    indexQ = index;;
    startTimer();
    displayQuiz(indexQ);
}

function getInitials(event) {
    initialsInput
    // When form is submitted...
    event.preventDefault();
    let initials = document.getElementById("initials").value;
    initials = initials.trim().toUpperCase();
    console.log(initials);
    // if initials are not less than 3 letters, ask again
    if (initials.lenght > 3 || initials === "") {
        alert("Initials must be a maximum of 3 letters. Enter them again. The initials will be recorded capitalised.");
        setTimeout(() => {
            endQuiz();
          }, "3000");        
    } else {
        let recordScore = {initials: initials, score: score};
        // stringify the object
        const recordScoreJSON = JSON.stringify(recordScore);
        // store JSON in localStorage
        localStorage.setItem("recordScore", recordScoreJSON);
        console.log(recordScoreJSON);
    }

}

// When timer reaches 0, endQuiz function is called.
// Start button is activated again.
function endQuiz() {
    // Hide questions, multiple answers and show end screen
    document.getElementById("questions").className = "hide";
    document.getElementById("choices").className = "hide";
    document.getElementById("end-screen").className = "start";
    document.getElementById("final-score").innerHTML = score;
    buttonElement.addEventListener("click", getInitials);
  }


  // Call startQuiz function with a click -associate event listener to start button
startButton.addEventListener("click", startQuiz);
console.log("passed");
//function endQuiz()