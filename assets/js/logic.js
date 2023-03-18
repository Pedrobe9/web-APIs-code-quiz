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
var pElement = document.createElement("p");
var finalScore = document.querySelector("#final-score");
var buttonElement = document.querySelector("#submit");

// Use file questions.js to store the questions and answers as seeing in
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

// Check for click in list of posible answers
function clickAnswer() { 
    // https://www.w3schools.com/JSREF/prop_node_childnodes.asp
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
               
                if (timerCount >= 0) {
                    if (indexQ < question.length) {
                        indexQ = indexQ;
                    } else {
                        indexQ = indexQ - question.length;
                    }
                    //timeout will delay 1.5s to call the function
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
    //Initialise to empty strings
    questionElement.textContent = "";
    choicesElement.textContent = "";
    // Change hide class to show the questions
    document.getElementById("questions").className = "myClass";
    // Display the questions
    questionElement.textContent = question[iQ];
    var answer = multAnswer[iQ];
    for (let i = 0; i < 4; i++) {
        
        var li = document.createElement("li");
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
    document.getElementById("start-screen").className = "hide";
    rightQuestion = false;
    timerCount = 60;
    // start questions at random, then continue in order
    const index = Math.floor(Math.random() * question.length);
    document.getElementById("questions").className = "MyClass";

    indexQ = index;;
    startTimer();
    displayQuiz(indexQ);
}

function getInitials(event) {
    // When form is submitted...
    let initials = document.getElementById("initials").value;
    initials = initials.trim().toUpperCase();
    console.log("initials:", initials);
    // if initials are not less than 3 letters, ask again
    if (initials.lenght > 3 || initials === "") {
        alert("Initials must be a maximum of 3 letters. Enter them again. The initials will be recorded capitalised.");
        setTimeout(() => {
            endQuiz();
          }, "3000");        
    } else {
        var storedScore = [];
        var recordTotalScore = [];
        storedScore = JSON.parse(localStorage.getItem("recordTotalScore"));
        // If todos were retrieved from localStorage, update the todos array to it
        if (storedScore !== null) {
            recordTotalScore = storedScore;   
        } 
        // Add to array of objects to store
        let recordScore = {initials: initials, score: score};
        recordTotalScore.push(recordScore); 

        // stringify the object and store JSON in localStorage
        localStorage.setItem("recordTotalScore", JSON.stringify(recordTotalScore));
        console.log("recordTotalScore: ", recordTotalScore);
    }
    document.getElementById("initials").value = "";
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
