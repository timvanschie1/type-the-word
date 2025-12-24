import {getMode, handleModeChange} from "./utils/mode.js";
import {getAndShowNewWord, isWordTyped, loadWordItems, resetWordIndex} from "./utils/word.js";
import {startCountDown} from "./utils/countdown.js";
import {handleHighScoreBeforeUnload, increaseScore, initHighScore, setScore} from "./utils/score.js";
import {initAnimations} from "./utils/animation.js";
import {renderBrainrots} from "./utils/brainrot.js";

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
  brainrotToggle: document.querySelector('.js-brainrot-toggle'),
  body: document.querySelector('body'),
}

const mode = getMode();
document.querySelector(`input[value="${mode}"]`).checked = true;

loadWordItems();
initHighScore(el);
initAnimations();

/** Handle every keystroke in the input field **/
el.input.addEventListener('input', (e) => {
  if (!isWordTyped(e.target.value, el.word)) {
    return;
  }

  function updateGameState ()  {
    increaseScore(el);
    getAndShowNewWord(el);
  }

  if (document.startViewTransition && getMode() === 'brainrot') {
    document.startViewTransition(updateGameState);
  } else {
    updateGameState();
  }

  el.input.value = '';
})

window.addEventListener("beforeunload", handleHighScoreBeforeUnload);

el.startButton.addEventListener('click', reset);
el.retryButton.addEventListener('click', reset);

el.modeRadioButtons.forEach(el => {
  el.addEventListener('change', handleModeChange);
});

function reset() {
  resetWordIndex();
  startCountDown(el);
  setScore(undefined, el);
  renderBrainrots([]);
  getAndShowNewWord(el);

  el.countDownContainer.classList.remove('hidden');
  el.scoreContainer.classList.remove('hidden');
  el.input.classList.remove('hidden');

  el.startButton.classList.add('hidden');
  el.retryButton.classList.add('hidden');
  el.input.value = '';
  el.input.focus();
}