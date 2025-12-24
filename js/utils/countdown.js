import {getWordItems} from "./word.js";
import {getMode} from "./mode.js";

let secondsLeft = 0;

/**
 * @param {string} word - The word used to calculate the time increase.
 * @param {Object} el - Object containing relevant DOM elements (countDown).
 */
export function increaseSecondsBasedOnWord(word, el) {
  secondsLeft = secondsLeft + Math.round(word.length * 0.4);
  el.countDown.textContent = secondsLeft.toString();
}

/**
 * Count down from 60 to 0
 * @param {Object} el - Object containing relevant DOM elements (countDown, word, input, retryButton).
 */
export function startCountDown(el) {
  const mode = getMode();

  if (mode === 'youngKids') {
    secondsLeft = 300;
  } else if (mode === 'brainrot') {
    increaseSecondsBasedOnWord(getWordItems()[0].word, el);
  } else {
    secondsLeft = 60;
  }

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