let words = []; // Array to store the words
let currentWordIndex = 0;

function checkAnswer(element, selectedOptionIndex) {
    const correctOptionIndex = words[currentWordIndex].correctOptionIndex;

    if (selectedOptionIndex === correctOptionIndex) {
        element.style.backgroundColor = 'green';
        setTimeout(nextCard, 1000); // Automatically go to the next card after 1 second
    } else {
        element.style.backgroundColor = 'red';
        translateWord(words[currentWordIndex].word, 'uz'); // Show translation in Uzbek
    }
}

async function fetchWordData(word) {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();

        if (data && data.length > 0) {
            const meaning = data[0].meanings[0].definitions[0].definition;
            const example = data[0].meanings[0].definitions[0].example || "No example available.";
            words[currentWordIndex].definition = `${meaning} Example: ${example}`;
            updateQuizCard();
        } else {
            document.getElementById('definition').textContent = 'No data found for this word.';
        }
    } catch (error) {
        document.getElementById('definition').textContent = 'Error fetching word data.';
        console.error('Error fetching word data:', error);
    }
}

async function translateWord(word, targetLanguage) {
    try {
        const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=Your-API-Key`, {
            method: "POST",
            body: JSON.stringify({
                q: word,
                target: targetLanguage
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
        words.push({
            word: newWord,
            correctOptionIndex: Math.floor(Math.random() * 4) // Randomly choose the correct option
        });
        currentWordIndex = words.length - 1;
        fetchWordData(newWord);
        setBackground(newWord);
        updateWordCount();
        document.getElementById('newWordInput').value = '';
    }
}

function updateQuizCard() {
    const currentWord = words[currentWordIndex];
    document.getElementById('definition').textContent = currentWord.definition || 'Loading...';
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.textContent = `Option ${index + 1}`;
        option.style.backgroundColor = '#f4e1c1';
    });
    options[currentWord.correctOptionIndex].textContent = currentWord.word;
}

function nextCard() {
    if (currentWordIndex < words.length - 1) {
        currentWordIndex++;
        updateQuizCard();
        setBackground(words[currentWordIndex].word);
    }
}

function previousCard() {
    if (currentWordIndex > 0) {
        currentWordIndex--;
        updateQuizCard();
        setBackground(words[currentWordIndex].word);
    }
}

function updateWordCount() {
    document.getElementById('wordCount').textContent = `Words Entered: ${words.length}`;
}
