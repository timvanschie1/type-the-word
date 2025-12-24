import {renderBrainrots} from "./brainrot.js";
import {getMode} from "./mode.js";
import {getEl} from "./elements.js";

const HIGH_SCORE_KEY = {
  standard: 'type-the-word-high-score',
  youngKids: 'type-the-word-high-score-young-kids',
  brainrot: 'type-the-word-high-score-brainrot'
}

let scoreObj = {
  current: 0,
  brainrots: [],
  high: 0
};

const el = getEl();

/**
 * Set and show the highscore
 * @param {number} newScore - The new score value to be recorded as the high score.
 */
export function renewHighScore(newScore) {
  scoreObj.high = newScore;

  const splittedHighScore = newScore.toString().split("");

  el.highScoreContainer.classList.remove("hidden");
  el.highScore.innerHTML = "";

  splittedHighScore.forEach((digit, i) => {
    el.highScore.innerHTML = el.highScore.innerHTML + `<span style="--i: ${i};">${digit}</span>`
  })
}

/**
 * Updates the current game score and refreshes the UI.
 * @param {Object} [newScoreObj] - The new score object to set.
 */
export function setScore(newScoreObj) {
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

/** Increase and show the score (and if needed also the highscore) **/
export function increaseScore() {
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

  setScore(newScoreObj);

  if (newScoreObj.current > Number(scoreObj.high)) {
    renewHighScore(newScoreObj.current);
  }
}

/** Retrieve and show high score from local storage, if there is one **/
export function initHighScore() {
  const savedHighScoreData = localStorage.getItem(HIGH_SCORE_KEY[getMode()]);

  if (savedHighScoreData) {
    const {score} = JSON.parse(savedHighScoreData);
    renewHighScore(score);
  }
}

/** Save high score, right before the page closes **/
export function handleHighScoreBeforeUnload() {
  const highScoreData = {score: scoreObj.high};
  localStorage.setItem(HIGH_SCORE_KEY[getMode()], JSON.stringify(highScoreData));
}