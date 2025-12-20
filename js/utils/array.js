/**
 * @param {Array} arr - The original array to shuffle.
 * @returns {Array} A new array with elements in random order.
 */
export function getShuffledArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}