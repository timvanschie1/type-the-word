import {getMode, handleModeChange} from "./utils/mode.js";
import {getAndShowNewWord, isWordTyped, loadWordItems} from "./utils/word.js";
import {startCountDown} from "./utils/countdown.js";
import {handleHighScoreBeforeUnload, increaseScore, initHighScore, setScore} from "./utils/score.js";
import {initAnimations} from "./utils/animation.js";

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

const mode = getMode();
document.querySelector(`input[value="${mode}"]`).checked = true;

loadWordItems(mode);
initHighScore(mode, el);
initAnimations();

/** Handle every keystroke in the input field **/
el.input.addEventListener('input', (e) => {
  if (isWordTyped(e.target.value, el.word)) {
    increaseScore(el);
    getAndShowNewWord(mode, el);
    el.input.value = '';
  }
})


window.addEventListener("beforeunload", () => handleHighScoreBeforeUnload(mode));

function reset() {
  startCountDown(mode, el);
  setScore(0, el);
  getAndShowNewWord(mode, el);

  el.countDownContainer.classList.remove('hidden');
  el.scoreContainer.classList.remove('hidden');
  el.input.classList.remove('hidden');

  el.startButton.classList.add('hidden');
  el.retryButton.classList.add('hidden');
  el.input.value = '';
  el.input.focus();
}

el.startButton.addEventListener('click', reset);
el.retryButton.addEventListener('click', reset);

el.modeRadioButtons.forEach(el => {
  el.addEventListener('change', handleModeChange);
});