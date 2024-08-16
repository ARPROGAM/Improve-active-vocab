// Other functions

async function fetchWordData(word) {
    const response = await fetch(`https://api.wordsapi.com/v2/entries/en/${word}`, {
        headers: { 'Authorization': 'Your-API-Key' }
    });
    const data = await response.json();
    document.getElementById('definition').textContent = data.meaning;
    // Populate options with correct and incorrect words
}

async function setBackground(word) {
    const response = await fetch(`https://api.unsplash.com/photos/random?query=${word}&client_id=Your-Client-ID`);
    const data = await response.json();
    document.body.style.backgroundImage = `url(${data.urls.full})`;
}

function addNewWord() {
    const newWord = document.getElementById('newWordInput').value.trim();
    if (newWord) {
        fetchWordData(newWord);
        setBackground(newWord);
        updateQuizOptions(newWord);
        document.getElementById('newWordInput').value = '';
    }
}

function updateQuizOptions(correctWord) {
    // Update the circles with the correct word and new wrong options
    const circles = document.querySelectorAll('.circle');
    circles[0].textContent = correctWord;
    circles[0].setAttribute('onclick', "checkAnswer(this, 'correct')");
    
    // For demonstration, adding random wrong words. Replace these with real words.
    circles[1].textContent = "Wrong Word 1";
    circles[1].setAttribute('onclick', "checkAnswer(this, 'wrong')");
    
    circles[2].textContent = "Wrong Word 2";
    circles[2].setAttribute('onclick', "checkAnswer(this, 'wrong')");
}
