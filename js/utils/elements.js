/**
 * @typedef {Object} GameElements
 * @property {HTMLElement} word - The element displaying the current target word.
 * @property {HTMLImageElement} wordImage - The element displaying the image associated with the word.
 * @property {HTMLInputElement} input - The text input field where the user types.
 * @property {HTMLButtonElement} startButton - The button to start the game.
 * @property {HTMLButtonElement} retryButton - The button to restart the game after time runs out.
 * @property {NodeListOf<HTMLInputElement>} modeRadioButtons - Radio buttons to select the game mode.
 * @property {HTMLElement} highScoreContainer - The container for the high score display.
 * @property {HTMLElement} highScore - The element displaying the high score digits.
 * @property {HTMLElement} countDownContainer - The container for the countdown timer display.
 * @property {HTMLElement} countDown - The element displaying the remaining seconds.
 * @property {HTMLElement} scoreContainer - The container for the current score display.
 * @property {HTMLElement} score - The element displaying the current score digits.
 * @property {HTMLElement} body - The document body element.
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
  countDownContainer: document.querySelector('.js-count-down-container'),
  countDown: document.querySelector('.js-count-down'),
  scoreContainer: document.querySelector('.js-score-container'),
  score: document.querySelector('.js-score'),
  body: document.querySelector('body'),
}

/**
 * Returns the object containing all relevant DOM elements for the game.
 * @returns {GameElements}
 */
export function getEl() {
  return el;
}