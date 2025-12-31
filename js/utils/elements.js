/**
 * @typedef {Object} GameElements
 * @property {HTMLElement} word
 * @property {HTMLImageElement} wordImage
 * @property {HTMLInputElement} input
 * @property {HTMLButtonElement} startButton
 * @property {HTMLButtonElement} retryButton
 * @property {NodeListOf<HTMLInputElement>} modeRadioButtons
 * @property {HTMLElement} highScoreContainer
 * @property {HTMLElement} highScore
 * @property {HTMLElement} highScoreLevel
 * @property {HTMLElement} countDownContainer
 * @property {HTMLElement} countDown
 * @property {HTMLElement} scoreContainer
 * @property {HTMLElement} score
 * @property {HTMLElement} scoreLevel
 * @property {HTMLElement} body
 */

/** @type {GameElements} */
const el = {
  word: document.querySelector('.js-current-word'),
  wordImage: document.querySelector('.js-current-word-image'),
  input: document.querySelector("input[type='text']"),
  startButton: document.querySelector('.js-start-button'),
  retryButton: document.querySelector('.js-retry-button'),
  modeRadioButtons: document.querySelectorAll('.js-mode-container input[type="radio"]'),
  highScoreContainer: document.querySelector(".js-high-score-container"),
  highScore: document.querySelector(".js-high-score"),
  highScoreLevel: document.querySelector(".js-high-score-level"),
  countDownContainer: document.querySelector('.js-count-down-container'),
  countDown: document.querySelector('.js-count-down'),
  scoreContainer: document.querySelector('.js-score-container'),
  score: document.querySelector('.js-score'),
  scoreLevel: document.querySelector('.js-score-level'),
  body: document.querySelector('body'),
}

/** @returns {GameElements} */
export function getEl() {
  return el;
}