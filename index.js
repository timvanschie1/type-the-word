const HIGH_SCORE_KEY = 'type-the-word-high-score';
let currentScore = 0;
let highScore = 0;
let secondsLeft = 60;

const wordEl = document.querySelector('.js-current-word');
const scoreEl = document.querySelector('.js-score');
const inputEl = document.querySelector('input');
const tryAgainButton = document.querySelector('.js-current-word-container button');
const bodyEl = document.querySelector('body');

/** Check if the user typed in the current random word **/
function isWordTyped(inputValue) {
  const word = wordEl.getAttribute('data-current-word');
  const typedWord = inputValue.trim();
  return word.toLowerCase() === typedWord.toLowerCase();
}

/** Get random Hue to be used as the third parameter of the oklch color syntax **/
function getRandomHue() {
  return Math.floor(Math.random() * 361).toString(); // Hue ranges from 0 to 360
}

/** Get and show a new random (often non-existing) word **/
function getAndShowNewWord() {
  fetch('https://random-word-api.herokuapp.com/word')
    .then(response => response.json())
    .then(wordArray => {
      const word = wordArray[0];
      wordEl.setAttribute('data-current-word', word);

      /** We also set two random Hues **/
      bodyEl.style.setProperty("--randomHue1", getRandomHue());
      bodyEl.style.setProperty("--randomHue2", getRandomHue());
    })
    .catch(err => console.error(err));
}

/** Set and show the highscore and date when it was obtained **/
function renewHighScore(score, timestamp) {
  highScore = score;

  const highScoreEl = document.querySelector(".js-high-score");
  const splittedHighScore = score.split("");

  highScoreEl.innerHTML = "";
  splittedHighScore.forEach((digit, i) => {
    highScoreEl.innerHTML = highScoreEl.innerHTML + `<span style="--i: ${i};">${digit}</span>`
  })

  const dateEl = document.querySelector(".js-high-score-date");
  dateEl.textContent = timestamp ? new Date(timestamp).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '/') : '';

  document.querySelector(".js-high-score-container").classList.remove("hidden");
}

/** Increase and show the score (and if needed also the highscore) **/
function increaseScore() {
  const oldScore = Number(scoreEl.getAttribute('data-score'));
  const newScore = oldScore + wordEl.getAttribute('data-current-word').length * 10;

  currentScore = newScore.toString()
  scoreEl.setAttribute('data-score', currentScore);

  if (Number(currentScore) > Number(highScore)) {
    renewHighScore(currentScore, new Date().toISOString());
  }

  scoreEl.innerHTML = "";
  const splittedScore = currentScore.split("");
  splittedScore.forEach((digit, i) => {
    scoreEl.innerHTML = scoreEl.innerHTML + `<span style="--i: ${i};">${digit}</span>`
  })
}

/** Handle every keystroke in the input field **/
inputEl.addEventListener('input', (e) => {
  if (!isWordTyped(e.target.value)) return;
  if (!secondsLeft) return;
  increaseScore();
  getAndShowNewWord();
  inputEl.value = '';
})

/** Retrieve and show high score from local storage, if there is one **/
const savedData = localStorage.getItem(HIGH_SCORE_KEY);
if (savedData) {
  const {score, timestamp} = JSON.parse(savedData);
  renewHighScore(score, timestamp);
}

/** Count down from 60 to 0 **/
const countDownTimer = setInterval(() => {
  secondsLeft--;

  document.querySelector('.js-count-down').textContent = secondsLeft.toString();

  if (secondsLeft <= 0) {
    wordEl.setAttribute('data-current-word', "Nog eens?");
    inputEl.classList.add('hidden');
    tryAgainButton.classList.remove('hidden');
    tryAgainButton.focus();
    clearInterval(countDownTimer);
  }
}, 1000);

/** Save high score, right before the page closes **/
window.addEventListener("beforeunload", () => {
  const highScoreData = {
    score: highScore,
    timestamp: new Date().toISOString()
  };

  localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(highScoreData));
});

getAndShowNewWord();