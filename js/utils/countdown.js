import {getWordItems} from "./word.js";
import {getMode} from "./mode.js";
import {getEl} from "./elements.js";
import {getScoreObject} from "./score.js";

const TIME_CONFIG = {
  youngKids: 300,
  standard: 60,
  bonusMultiplier: 0.9,
  levelDifficultyScale: 0.05, // How much the bonus decreases per level
};

let secondsLeft = 0;

const el = getEl();

/** @param {string} word - The word used to calculate the time increase. **/
export function increaseSecondsBasedOnWord(word) {
  /** Calculate multiplier: starts high, decreases as level increases **/
  const levelAdjustedMultiplier = Math.max(
    TIME_CONFIG.bonusMultiplier - (getScoreObject().level * TIME_CONFIG.levelDifficultyScale)
  );

  const secondsToAdd = Math.round(word.length * levelAdjustedMultiplier);

  secondsLeft = secondsLeft + secondsToAdd;
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