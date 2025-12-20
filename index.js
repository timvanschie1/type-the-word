import {getImageSrc, getWordAndImage, preloadImage} from "./utils/image.js";
import {getShuffledArray} from "./utils/array.js";
import {getHighScoreKey, MODE_KEY} from "./utils/keys.js";

const score = {
  current: 0,
  high: 0
}

const el = {
  word: document.querySelector('.js-current-word'),
  wordImage: document.querySelector('.js-current-word-image'),
  input: document.querySelector("input[type='text']"),
  startButton: document.querySelector('.js-start-button'),
  retryButton: document.querySelector('.js-retry-button'),
  modeRadioButtons: document.querySelectorAll('.js-mode-container input[type="radio"]'),
  highScore: document.querySelector(".js-high-score"),
  countDownContainer: document.querySelector('.js-count-down-container'),
  countDown: document.querySelector('.js-count-down'),
  scoreContainer: document.querySelector('.js-score-container'),
  score: document.querySelector('.js-score'),
  body: document.querySelector('body'),
}

const mode = localStorage.getItem(MODE_KEY) ? JSON.parse(localStorage.getItem(MODE_KEY)) : 'standard';
document.querySelector(`input[value="${mode}"]`).checked = true;

/** Get the collection of 10.000 Dutch kids friendly words **/
let wordItems = [];

let fileName = "wordsDutch.json?v=3";
if (mode === 'youngKids') {
  fileName = 'wordsPerImageYoungKids.json?v=3';
} else if (mode === 'brainrot') {
  fileName = 'wordsPerImageBrainrot.json?v=3';
}

fetch(fileName)
  .then(r => r.json())
  .then(data => wordItems = getShuffledArray(data));

/** Check if the user typed in the current random word **/
function isWordTyped(inputValue) {
  const word = el.word.getAttribute('data-current-word');
  const typedWord = inputValue.trim();
  return word.toLowerCase() === typedWord.toLowerCase();
}

/** Get random Hue to be used as the third parameter of the oklch color syntax **/
function getRandomHue() {
  return Math.floor(Math.random() * 361).toString(); // Hue ranges from 0 to 360
}

let index = 0;

/** Get and show a new random word **/
function getAndShowNewWord() {
  const {word, image} = getWordAndImage(wordItems[index], mode);

  const {image: nextImage} = wordItems[index + 1];
  nextImage && preloadImage(nextImage);

  el.word.setAttribute('data-current-word', word);

  if (image) {
    el.wordImage.src = getImageSrc(image, mode);
    el.wordImage.classList.remove('hidden');
  }

  /** We also set two random Hues **/
  el.body.style.setProperty("--randomHue1", getRandomHue());
  el.body.style.setProperty("--randomHue2", getRandomHue());

  index = index < wordItems.length - 1 ? index + 1 : 0;
}

/** Set and show the highscore  **/
function renewHighScore(newScore) {
  score.high = newScore;

  const splittedHighScore = newScore.toString().split("");

  el.highScore.innerHTML = "";
  splittedHighScore.forEach((digit, i) => {
    el.highScore.innerHTML = el.highScore.innerHTML + `<span style="--i: ${i};">${digit}</span>`
  })

  document.querySelector(".js-high-score-container").classList.remove("hidden");
}

function setScore(newScore) {
  score.current = newScore;
  el.score.innerHTML = "";
  const splittedScore = newScore.toString().split("");
  splittedScore.forEach((digit, i) => {
    el.score.innerHTML = el.score.innerHTML + `<span style="--i: ${i};">${digit}</span>`
  })
}

/** Increase and show the score (and if needed also the highscore) **/
function increaseScore() {
  const newScore = score.current + el.word.getAttribute('data-current-word').length * 10;

  setScore(newScore);

  if (newScore > Number(score.high)) {
    renewHighScore(newScore);
  }
}

/** Retrieve and show high score from local storage, if there is one **/
const savedHighScoreData = localStorage.getItem(getHighScoreKey(mode));
if (savedHighScoreData) {
  const {score} = JSON.parse(savedHighScoreData);
  renewHighScore(score);
}

/** Count down from 60 to 0 **/
function startCountDown() {
  let secondsLeft = mode === 'youngKids' ? 120 : 60;
  el.countDown.textContent = secondsLeft.toString();

  const countDownInterval = setInterval(() => {
    secondsLeft--;

    el.countDown.textContent = secondsLeft.toString();

    if (secondsLeft === 0) {
      el.word.setAttribute('data-current-word', "Nog eens?");
      el.input.classList.add('hidden');
      el.retryButton.classList.remove('hidden');
      el.retryButton.focus();
      clearInterval(countDownInterval);
    }
  }, 1000);
}

/** Handle every keystroke in the input field **/
el.input.addEventListener('input', (e) => {
  if (!isWordTyped(e.target.value)) return;

  increaseScore();
  getAndShowNewWord();
  el.input.value = '';
})

/** Save high score, right before the page closes **/
window.addEventListener("beforeunload", () => {
  const highScoreData = {
    score: score.high,
  };

  localStorage.setItem(getHighScoreKey(mode), JSON.stringify(highScoreData));
});

function reset() {
  startCountDown();
  setScore(0);
  getAndShowNewWord();

  [el.countDownContainer, el.scoreContainer, el.input].forEach(el => {
    el.classList.remove('hidden')
  });

  [el.startButton, el.retryButton].forEach(el => {
    el.classList.add('hidden')
  });

  el.input.value = '';
  el.input.focus();
}

el.startButton.addEventListener('click', reset);
el.retryButton.addEventListener('click', reset);

el.modeRadioButtons.forEach(el => el.addEventListener('change', (e) => {
  localStorage.setItem(MODE_KEY, JSON.stringify(e.target.value));
  window.location.reload();
}));