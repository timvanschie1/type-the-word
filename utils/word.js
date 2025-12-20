/**
 * @param {string} mode - The current game mode.
 * @returns {string} The key used for storing/retrieving the high score.
 */
export function getWordsFileName(mode) {
  if (mode === 'youngKids') {
    return 'wordsPerImageYoungKids.json?v=4';
  }

  if (mode === 'brainrot') {
    return 'wordsPerImageBrainrot.json?v=4';
  }

  return "wordsDutch.json?v=4";
}