/** Local Storage Keys: **/
export const MODE_KEY = 'type-the-word-mode';

const HIGH_SCORE_KEY_STANDARD = 'type-the-word-high-score';
const HIGH_SCORE_KEY_YOUNGKIDS = 'type-the-word-high-score-young-kids';
const HIGH_SCORE_KEY_BRAINROT = 'type-the-word-high-score-brainrot';

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