let words = [];
let currentWordIndex = 0;

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
        document.getElementById('newWordInput').value = ''; // Clear the input field
    }
}

// Existing functions (fetchWordData, checkAnswer, translateWord, setBackground, nextCard, previousCard) should remain the same as previously provided.
