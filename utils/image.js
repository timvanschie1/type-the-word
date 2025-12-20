/**
 * @param {string} image - The image identifier/filename.
 * @param {string} mode - The current game mode ('youngKids', 'brainrot', etc.).
 * @returns {string|null} The full path to the image or null if no image is provided.
 */
export function getImageSrc(image, mode) {
  if (!image) return null;

  return mode === 'youngKids'
    ? `images/icons/${image}.svg`
    : `images/brainrot/${image}.webp`;
}

/**
 * @param {string} image - The image identifier to preload.
 * @param {string} mode - The current game mode ('youngKids', 'brainrot', etc.).
 */
export function preloadImage(image, mode) {
  const src = getImageSrc(image, mode);
  if (!src) return;
  const preloadImg = new Image();
  preloadImg.src = src;
}