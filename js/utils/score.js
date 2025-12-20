const HIGH_SCORE_KEY_STANDARD = 'type-the-word-high-score';
const HIGH_SCORE_KEY_YOUNGKIDS = 'type-the-word-high-score-young-kids';
const HIGH_SCORE_KEY_BRAINROT = 'type-the-word-high-score-brainrot';

/**
 * Set and show the highscore
 * @param {Object} scoreObj - The global score state object containing the 'high' property.
 * @param {number} newScore - The new score value to be recorded as the high score.
 * @param {Object} el - Object containing the DOM elements (highScore, highScoreContainer).
 */
export function renewHighScore(scoreObj, newScore, el) {
  scoreObj.high = newScore;

  const splittedHighScore = newScore.toString().split("");

  el.highScoreContainer.classList.remove("hidden");
  el.highScore.innerHTML = "";

  splittedHighScore.forEach((digit, i) => {
    el.highScore.innerHTML = el.highScore.innerHTML + `<span style="--i: ${i};">${digit}</span>`
  })
}

/**
 * @param {string} mode - The current game mode.
 * @returns {string} The key used for storing/retrieving the high score.
 */
export function getHighScoreKey(mode) {
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
 * @param {Object} scoreObj - The global score state object.
 * @param {number} newScore - The new score value to set.
 * @param {Object} el - Object containing the DOM elements (score).
 */
export function setScore(scoreObj, newScore, el) {
  scoreObj.current = newScore;
  el.score.innerHTML = "";
  const splittedScore = newScore.toString().split("");
  splittedScore.forEach((digit, i) => {
    el.score.innerHTML = el.score.innerHTML + `<span style="--i: ${i};">${digit}</span>`
  })
}

/**
 * Increase and show the score (and if needed also the highscore)
 * @param {Object} scoreObj - The global score state object.
 * @param {Object} el - Object containing the DOM elements (word, score, etc.).
 */
export function increaseScore(scoreObj, el) {
  const newScore = scoreObj.current + el.word.getAttribute('data-current-word').length * 10;
  setScore(scoreObj, newScore, el);

  if (newScore > Number(scoreObj.high)) {
    renewHighScore(scoreObj, newScore, el);
  }
}

/**
 * Retrieve and show high score from local storage, if there is one
 * @param {string} mode - The current game mode.
 * @param {Object} scoreObj - The global score state object to be updated.
 * @param {Object} el - Object containing the DOM elements for high score display.
 */
export function initHighScore(mode, scoreObj, el) {
  const savedHighScoreData = localStorage.getItem(getHighScoreKey(mode));

  if (savedHighScoreData) {
    const {score} = JSON.parse(savedHighScoreData);
    renewHighScore(scoreObj, score, el);
  }
}