const wordEl = document.querySelector('[data-current-word]');
const scoreEl = document.querySelector('[data-score]');
const inputEl = document.querySelector('input');
const bodyEl = document.querySelector('body');

function clearInput() {
    inputEl.value = ''
}

function wordIsTyped(inputValue) {
    const word = wordEl.getAttribute('data-current-word');
    const typedWord = inputValue.trim();
    return word === typedWord;
}

function generateRandom() {
    const rand = Math.random() * 256;
    return Math.floor(rand).toString();
}

function getAndSetNewWord() {
    fetch('https://random-word-api.herokuapp.com/word')
        .then(response => response.json())
        .then(wordArray => {
            const word = wordArray[0];
            wordEl.setAttribute('data-current-word', word);
            bodyEl.style.setProperty("--first", generateRandom());
            bodyEl.style.setProperty("--second", generateRandom());
            bodyEl.style.setProperty("--third", generateRandom());
        })
        .catch(err => console.error(err));
}

function increaseScore() {
    const oldScore = Number(scoreEl.getAttribute('data-score'));
    const newScore = oldScore + wordEl.getAttribute('data-current-word').length * 10;
    const newScoreString = newScore.toString();
    scoreEl.setAttribute('data-score', newScoreString);

    scoreEl.innerHTML = "";
    const splittedScore = newScoreString.split("");
    splittedScore.forEach((digit, i) => {
        scoreEl.innerHTML = scoreEl.innerHTML + `<span style="--i: ${i};">${digit}</span>`
    })
}

inputEl.addEventListener('input', (e) => {
    if (!wordIsTyped(e.target.value)) return;
    increaseScore();
    getAndSetNewWord();
    clearInput();
})

getAndSetNewWord();