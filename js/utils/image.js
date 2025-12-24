import {getMode} from "./mode.js";

/**
 * @param {string} image - The image identifier/filename.
 * @returns {string|null} The full path to the image or null if no image is provided.
 */
export function getImageSrc(image) {
  if (!image) return null;

  return getMode() === 'youngKids'
    ? `images/icons/${image}.svg`
    : `images/brainrot/${image}.webp`;
}

/**
 * @param {string} image - The image identifier to preload.
 */
export function preloadImage(image) {
  const src = getImageSrc(image);
  if (!src) return;
  const preloadImg = new Image();
  preloadImg.src = src;
}