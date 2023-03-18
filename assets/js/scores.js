var highscoresElement = document.querySelector("#highscores");

function getStoredData () {
    // Check if there is any information in storage, if it is null, create array (object)
    storedScore = JSON.parse(localStorage.getItem("recordTotalScore"));
    if (storedScore === null) {
        storedScore = [];
    }
    return storedScore;
}

