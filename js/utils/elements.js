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

export function getEl() {
  return el;
}