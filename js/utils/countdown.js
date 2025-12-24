import {getWordItems} from "./word.js";
import {getMode} from "./mode.js";
import {getEl} from "./elements.js";

let secondsLeft = 0;

const el = getEl();

/** @param {string} word - The word used to calculate the time increase. **/
export function increaseSecondsBasedOnWord(word) {
  secondsLeft = secondsLeft + Math.round(word.length * 0.4);
  el.countDown.textContent = secondsLeft.toString();
}

export function startCountDown() {
  const mode = getMode();

  if (mode === 'youngKids') {
    secondsLeft = 300;
  } else if (mode === 'brainrot') {
    increaseSecondsBasedOnWord(getWordItems()[0].word);
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