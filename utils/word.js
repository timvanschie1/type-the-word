/**
 * @param {string} mode - The current game mode.
 * @returns {string} The key used for storing/retrieving the high score.
 */
export function getWordsFileName(mode) {
  if (mode === 'youngKids') {
    return 'wordsPerImageYoungKids.json?v=3';
  }

  if (mode === 'brainrot') {
    return 'wordsPerImageBrainrot.json?v=3';
  }

  return "wordsDutch.json?v=3";
}