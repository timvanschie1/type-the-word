import {getMode} from "./mode.js";

/**
 * @param {string} imgString - The image identifier/filename.
 * @returns {string|null} The full path to the image or null if no image is provided.
 */
export function getImageSrc(imgString) {
  if (!imgString) return null;

  return getMode() === 'youngKids'
    ? `images/icons/${imgString}.svg`
    : `images/brainrot/${imgString}.webp`;
}

/** @param {string} imgString - The image identifier to preload. **/
export function preloadImage(imgString) {
  const src = getImageSrc(imgString);
  if (!src) return;
  const preloadImg = new Image();
  preloadImg.src = src;
}