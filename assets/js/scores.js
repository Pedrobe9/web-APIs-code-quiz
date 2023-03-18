var highscoresElement = document.querySelector("#highscores");

function getStoredData () {
    // Check if there is any information in storage, if it is null, create array (object)
    storedScore = JSON.parse(localStorage.getItem("recordTotalScore"));
    if (storedScore === null) {
        storedScore = [];
    }
    return storedScore;
}

function displayScore (){
    var highScores = getStoredData();
    console.log("highScores:", highScores);
    console.log("highScores-length:", highScores.length);
    for (let i = 0; i < highScores.length; i++) {
        var hsli = document.createElement("li");
        hsli.textContent = `${highScores[i].initials} . . . . . . ${highScores[i].score}`;
        var hsp = document.createElement("p");
        hsli.appendChild(hsp);
        highscoresElement.appendChild(hsli);
    }  
}

displayScore();
