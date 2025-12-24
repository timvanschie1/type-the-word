import {renderBrainrots} from "./brainrot.js";
import {getMode} from "./mode.js";

const HIGH_SCORE_KEY_STANDARD = 'type-the-word-high-score';
const HIGH_SCORE_KEY_YOUNGKIDS = 'type-the-word-high-score-young-kids';
const HIGH_SCORE_KEY_BRAINROT = 'type-the-word-high-score-brainrot';

let scoreObj = {
  current: 0,
  brainrots: [],
  high: 0
};

/**
 * Set and show the highscore
 * @param {number} newScore - The new score value to be recorded as the high score.
 * @param {Object} el - Object containing the DOM elements (highScore, highScoreContainer).
 */
export function renewHighScore(newScore, el) {
  scoreObj.high = newScore;

  const splittedHighScore = newScore.toString().split("");

  el.highScoreContainer.classList.remove("hidden");
  el.highScore.innerHTML = "";

  splittedHighScore.forEach((digit, i) => {
    el.highScore.innerHTML = el.highScore.innerHTML + `<span style="--i: ${i};">${digit}</span>`
  })
}

/**
 * @returns {string} The key used for storing/retrieving the high score.
 */
export function getHighScoreKey() {
  const mode = getMode();

  if (mode === 'brainrot') {
    return HIGH_SCORE_KEY_BRAINROT;
  }

  if (mode === 'youngKids') {
    return HIGH_SCORE_KEY_YOUNGKIDS;
  }

  return HIGH_SCORE_KEY_STANDARD;
}

/**
 * Updates the current game score and refreshes the UI.
 * @param {Object} [newScoreObj] - The new score object to set.
 * @param {Object} el - Object containing the DOM elements (score).
 */
export function setScore(newScoreObj, el) {
  if (newScoreObj) {
    scoreObj = newScoreObj;
  } else {
    scoreObj.current = 0;
    scoreObj.brainrots = [];
  }

  el.score.innerHTML = "";
  const splittedScore = scoreObj.current.toString().split("");
  splittedScore.forEach((digit, i) => {
    el.score.innerHTML = el.score.innerHTML + `<span style="--i: ${i};">${digit}</span>`
  })
}

/**
 * Increase and show the score (and if needed also the highscore)
 * @param {Object} el - Object containing the DOM elements (word, score, etc.).
 */
export function increaseScore(el) {
  const word = el.word.getAttribute('data-current-word');

  const newScoreObj = {
    ...scoreObj,
    current: scoreObj.current + word.length * 10,
  }

  if (getMode() === 'brainrot') {
    const brainrot = word.replaceAll(' ', '-');
    newScoreObj.brainrots.push(brainrot);
    renderBrainrots(newScoreObj.brainrots, brainrot);
  }

  setScore(newScoreObj, el);

  if (newScoreObj.current > Number(scoreObj.high)) {
    renewHighScore(newScoreObj.current, el);
  }
}

/**
 * Retrieve and show high score from local storage, if there is one
 * @param {Object} el - Object containing the DOM elements for high score display.
 */
export function initHighScore(el) {
  const savedHighScoreData = localStorage.getItem(getHighScoreKey());

  if (savedHighScoreData) {
    const {score} = JSON.parse(savedHighScoreData);
    renewHighScore(score, el);
  }
}

/** Save high score, right before the page closes **/
export function handleHighScoreBeforeUnload() {
  const highScoreData = {score: scoreObj.high};
  localStorage.setItem(getHighScoreKey(), JSON.stringify(highScoreData));
}