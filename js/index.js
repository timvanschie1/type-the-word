import {MODE_KEY} from "./utils/keys.js";
import {getAndShowNewWord, isWordTyped, loadWordItems} from "./utils/word.js";
import {startCountDown} from "./utils/countdown.js";
import {getHighScoreKey, increaseScore, initHighScore, setScore} from "./utils/score.js";

const scoreObj = {
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
  highScoreContainer: document.querySelector(".js-high-score-container"),
  countDownContainer: document.querySelector('.js-count-down-container'),
  countDown: document.querySelector('.js-count-down'),
  scoreContainer: document.querySelector('.js-score-container'),
  score: document.querySelector('.js-score'),
  body: document.querySelector('body'),
}

const mode = localStorage.getItem(MODE_KEY) ? JSON.parse(localStorage.getItem(MODE_KEY)) : 'standard';
document.querySelector(`input[value="${mode}"]`).checked = true;

loadWordItems(mode);
initHighScore(mode, scoreObj, el);

/** Handle every keystroke in the input field **/
el.input.addEventListener('input', (e) => {
  if (!isWordTyped(e.target.value, el.word)) return;
  increaseScore(scoreObj, el);
  getAndShowNewWord(mode, el);
  el.input.value = '';
})

/** Save high score, right before the page closes **/
window.addEventListener("beforeunload", () => {
  const highScoreData = { score: scoreObj.high };
  localStorage.setItem(getHighScoreKey(mode), JSON.stringify(highScoreData));
});

function reset() {
  startCountDown(mode, el);
  setScore(scoreObj, 0, el);
  getAndShowNewWord(mode, el);

  [el.countDownContainer, el.scoreContainer, el.input].forEach(element => {
    element.classList.remove('hidden')
  });

  [el.startButton, el.retryButton].forEach(element => {
    element.classList.add('hidden')
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