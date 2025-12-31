import {renderBrainrots} from "./brainrot.js";
import {getMode} from "./mode.js";
import {getEl} from "./elements.js";
import {getWordItems} from "./word.js";

const HIGH_SCORE_KEY = {
  standard: 'type-the-word-high-score-4',
  youngKids: 'type-the-word-high-score-young-kids-4',
  brainrot: 'type-the-word-high-score-brainrot-4'
}

/** @typedef {string} ImgString**/

/**
 * @typedef {Object} ScoreObject
 * @property {number | ImgString[]} score
 * @property {number} level
 */

/** @type {ScoreObject} */
let scoreObj = {
  score: 0,
  level: 1,
};

/** @type {ScoreObject} */
let highScoreObj = {
  score: 0,
  level: 1,
}

const el = getEl();

export function getLevel() {
  return scoreObj.level
}

/** @param {'score' | 'highScore'} type - The type of score to render. **/
function renderScore(type) {
  const mode = getMode();
  const {score, level} = type === 'highScore' ? highScoreObj : scoreObj;

  let scoreEl;
  let levelEl;
  if (type === 'highScore') {
    scoreEl = el.highScore;
    levelEl = el.highScoreLevel;
    el.highScoreContainer.classList.remove("hidden");
  } else {
    scoreEl = el.score;
    levelEl = el.scoreLevel;
  }

  let scoreString;
  if (mode === 'brainrot') {
    scoreString = score.length + '/' + getWordItems().length;
    levelEl.classList.remove('hidden');
    levelEl.textContent = 'Level ' + level.toString();
  } else {
    scoreString = score.toString();
  }

  const splittedScore = scoreString.split("");

  scoreEl.innerHTML = "";
  splittedScore.forEach((char, i) => {
    scoreEl.innerHTML = scoreEl.innerHTML + `<span style="--i: ${i};">${char}</span>`
  })
}

export function resetScore() {
  scoreObj.score = getMode() === 'brainrot' ? [] : 0;
  renderScore('score');
}

/** Increase and show the score (and if needed also the highscore) **/
export function increaseScore() {
  if (getMode() === 'brainrot') {
    const brainrot = el.wordImage.getAttribute('data-image');
    const isBrainrotsComplete = scoreObj.score.length + 1 === getWordItems().length;

    if (isBrainrotsComplete) {
      scoreObj.score = [];
      scoreObj.level++;
      renderBrainrots(scoreObj.score, getWordItems());
    } else {
      scoreObj.score.push(brainrot);
      renderBrainrots(scoreObj.score, getWordItems(), brainrot);
    }

    const levelIncreased = scoreObj.level > highScoreObj.level;
    const scoreIncreased = scoreObj.level === highScoreObj.level && scoreObj.score.length > highScoreObj.score.length;

    if (levelIncreased || scoreIncreased) {
      highScoreObj.score = [...scoreObj.score];
      highScoreObj.level = scoreObj.level;
      renderScore('highScore');
    }

    renderScore('score');
    return;
  }

  const currentWord = el.word.getAttribute('data-current-word');
  const newScore = scoreObj.score + currentWord.length * 10;
  scoreObj.score = newScore;
  renderScore('score');

  if (newScore > Number(highScoreObj.score)) {
    highScoreObj.score = newScore;
    renderScore('highScore');
  }
}

/** Retrieve and show high score from local storage, if there is one **/
export function initHighScore() {
  const mode = getMode();
  const savedHighScoreData = localStorage.getItem(HIGH_SCORE_KEY[mode]);
  const parsedSavedHighScoreData = JSON.parse(savedHighScoreData);

  if (parsedSavedHighScoreData) {
    highScoreObj = parsedSavedHighScoreData;
    scoreObj.level = highScoreObj.level;
  } else {
    highScoreObj.score = mode === 'brainrot' ? [] : 0;
  }
  renderScore('highScore');
}

/** Save high score, right before the page closes **/
export function handleHighScoreBeforeUnload() {
  localStorage.setItem(HIGH_SCORE_KEY[getMode()], JSON.stringify(highScoreObj));
}