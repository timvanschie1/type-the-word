import {getMode} from "./mode.js";
import {getEl} from "./elements.js";

const el = getEl();

/**
 * @param {string} imgString - The image identifier/filename.
 * @returns {string|null} The full path to the image or null if no image is provided.
 */
export function getImageSrc(imgString) {
  if (!imgString) return null;

  return getMode() === 'youngKids'
    ? `images/icons/${imgString}`
    : `images/brainrot/${imgString}`;
}

/** @param {string} imgString - The image identifier/filename. **/
export function renderImage(imgString) {
    el.wordImage.style.viewTransitionName = imgString.replace('.', '-');
    el.wordImage.src = getImageSrc(imgString);
    el.wordImage.dataset.image = imgString;
    el.wordImage.classList.remove('hidden');
}

/** @param {string} imgString - The image identifier to preload. **/
export function preloadImage(imgString) {
  const src = getImageSrc(imgString);
  if (!src) return;
  const preloadImg = new Image();
  preloadImg.src = src;
}