/**
 * Get random Hue to be used as the third parameter of the oklch color syntax
 * @returns {string} A value between 0 and 360.
 */
export function getRandomHue() {
  return Math.floor(Math.random() * 361).toString(); // Hue ranges from 0 to 360
}