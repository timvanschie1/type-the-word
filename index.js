const HIGH_SCORE_KEY = 'type-the-word-high-score';

let currentScore = 0;
let highScore = 0;

const wordEl = document.querySelector('.js-current-word');
const inputEl = document.querySelector('input');
const startButtonEl = document.querySelector('.js-start-button');
const retryButtonEl = document.querySelector('.js-retry-button');

const countDownContainerEl = document.querySelector('.js-count-down-container');
const countDownEl = document.querySelector('.js-count-down');
const scoreContainerEl = document.querySelector('.js-score-container');
const scoreEl = document.querySelector('.js-score');

const bodyEl = document.querySelector('body');

function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Get the collection of 10.000 Dutch kids friendly words **/
let words = [];
fetch("wordsDutch.json")
  .then(r => r.json())
  .then(data => {
    words = shuffleArray(data);
  });

/** Get a random word from the list of 10.000 words **/
let index = 0;

function getRandomWord() {
  if (index >= words.length) {
    index = 0;
    words = shuffleArray(words);
  }
  return words[index++];
}

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
  const word = getRandomWord();
  wordEl.setAttribute('data-current-word', word);

  /** We also set two random Hues **/
  bodyEl.style.setProperty("--randomHue1", getRandomHue());
  bodyEl.style.setProperty("--randomHue2", getRandomHue());
}

/** Set and show the highscore  **/
function renewHighScore(score) {
  highScore = score;

  const highScoreEl = document.querySelector(".js-high-score");
  const splittedHighScore = score.toString().split("");

  highScoreEl.innerHTML = "";
  splittedHighScore.forEach((digit, i) => {
    highScoreEl.innerHTML = highScoreEl.innerHTML + `<span style="--i: ${i};">${digit}</span>`
  })

  document.querySelector(".js-high-score-container").classList.remove("hidden");
}

function setScore(score) {
  currentScore = score;
  scoreEl.innerHTML = "";
  const splittedScore = score.toString().split("");
  splittedScore.forEach((digit, i) => {
    scoreEl.innerHTML = scoreEl.innerHTML + `<span style="--i: ${i};">${digit}</span>`
  })
}

/** Increase and show the score (and if needed also the highscore) **/
function increaseScore() {
  const newScore = currentScore + wordEl.getAttribute('data-current-word').length * 10;

  setScore(newScore);

  if (newScore > Number(highScore)) {
    renewHighScore(newScore);
  }
}

/** Retrieve and show high score from local storage, if there is one **/
const savedData = localStorage.getItem(HIGH_SCORE_KEY);
if (savedData) {
  const {score} = JSON.parse(savedData);
  renewHighScore(score);
}

/** Count down from 60 to 0 **/
function startCountDown() {
  let secondsLeft = 60;
  countDownEl.textContent = secondsLeft.toString();

  const countDownInterval = setInterval(() => {
    secondsLeft--;

    countDownEl.textContent = secondsLeft.toString();

    if (secondsLeft === 0) {
      wordEl.setAttribute('data-current-word', "Nog eens?");
      inputEl.classList.add('hidden');
      retryButtonEl.classList.remove('hidden');
      retryButtonEl.focus();
      clearInterval(countDownInterval);
    }
  }, 1000);
}

/** Handle every keystroke in the input field **/
inputEl.addEventListener('input', (e) => {
  if (!isWordTyped(e.target.value)) return;

  increaseScore();
  getAndShowNewWord();
  inputEl.value = '';
})

/** Save high score, right before the page closes **/
window.addEventListener("beforeunload", () => {
  const highScoreData = {
    score: highScore,
  };

  localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(highScoreData));
});

function reset() {
  startCountDown();
  setScore(0);
  getAndShowNewWord();

  [countDownContainerEl, scoreContainerEl, inputEl].forEach(el => {
    el.classList.remove('hidden')
  });

  [startButtonEl, retryButtonEl].forEach(el => {
    el.classList.add('hidden')
  });

  inputEl.value = '';
  inputEl.focus();
}

startButtonEl.addEventListener('click', reset);
retryButtonEl.addEventListener('click', reset);