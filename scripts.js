function checkAnswer(element, status) {
    if (status === 'correct') {
        element.style.backgroundColor = 'green';
    } else {
        element.style.backgroundColor = 'red';
    }
}

async function fetchWordData(word) {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();

        if (data && data.length > 0) {
            const meaning = data[0].meanings[0].definitions[0].definition;
            const example = data[0].meanings[0].definitions[0].example || "No example available.";
            document.getElementById('definition').textContent = `${meaning} Example: ${example}`;
            translateWord(word);
        } else {
            document.getElementById('definition').textContent = 'No data found for this word.';
        }
    } catch (error) {
        document.getElementById('definition').textContent = 'Error fetching word data.';
        console.error('Error fetching word data:', error);
    }
}

async function translateWord(word) {
    try {
        const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=Your-API-Key`, {
            method: "POST",
            body: JSON.stringify({
                q: word,
                target: "es" // Set the target language here
            })
        });
        const data = await response.json();

        if (data && data.data && data.data.translations) {
            document.getElementById('translatedWord').textContent = data.data.translations[0].translatedText;
        } else {
            document.getElementById('translatedWord').textContent = 'No translation available.';
        }
    } catch (error) {
        document.getElementById('translatedWord').textContent = 'Error fetching translation.';
        console.error('Error fetching translation:', error);
    }
}

async function setBackground(word) {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?query=${word}&client_id=Your-Client-ID`);
        const data = await response.json();
        if (data && data.urls) {
            document.body.style.backgroundImage = `url(${data.urls.full})`;
        } else {
            document.body.style.backgroundImage = `none`;
        }
    } catch (error) {
        console.error('Error fetching background image:', error);
    }
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
    const options = document.querySelectorAll('.option');
    options[0].textContent = "Option 1";
    options[1].textContent = "Option 2";
    options[2].textContent = correctWord;
    options[2].setAttribute('onclick', "checkAnswer(this, 'correct')");
    
    // Randomly set the other options as wrong
    for (let i = 0; i < options.length; i++) {
        if (i !== 2) {
            options[i].setAttribute('onclick', "checkAnswer(this, 'wrong')");
        }
    }
}
