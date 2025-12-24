import {getWordItems} from "./word.js";
import {getMode} from "./mode.js";
import {getEl} from "./elements.js";

const TIME_CONFIG = {
  youngKids: 300,
  standard: 60,
  bonusMultiplier: 0.4
};

let secondsLeft = 0;

const el = getEl();

/** @param {string} word - The word used to calculate the time increase. **/
export function increaseSecondsBasedOnWord(word) {
  secondsLeft = secondsLeft + Math.round(word.length * TIME_CONFIG.bonusMultiplier);
  el.countDown.textContent = secondsLeft.toString();
}

let countDownInterval;

export function startCountDown() {
  clearInterval(countDownInterval);

  const mode = getMode();
  if (mode === 'brainrot') {
    increaseSecondsBasedOnWord(getWordItems()[0].word);
  } else {
    secondsLeft = TIME_CONFIG[mode];
  }

  el.countDown.textContent = secondsLeft.toString();

  countDownInterval = setInterval(() => {
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