import {getImageSrc, preloadImage} from "./image.js";
import {getRandomHue} from "./color.js";
import {getShuffledArray} from "./array.js";

/** Get the collection of 10.000 Dutch kids friendly words **/
let wordItems = [];

/** @param {string} mode - The current game mode. **/
export function loadWordItems(mode) {
  fetch(getWordsFileName(mode))
    .then(r => r.json())
    .then(data => wordItems = getShuffledArray(data));
}

/**
 * @param {string} mode - The current game mode.
 * @returns {string} The key used for storing/retrieving the high score.
 */
export function getWordsFileName(mode) {
  if (mode === 'youngKids') {
    return 'wordsPerImageYoungKids.json?v=8';
  }

  if (mode === 'brainrot') {
    return 'wordsPerImageBrainrot.json?v=8';
  }

  return "wordsDutch.json?v=8";
}

/**
 * Check if the user typed in the current random word
 * @param {string} inputValue - The text from the input field.
 * @param {HTMLElement} wordEl - The element containing the current target word data.
 * @returns {boolean}
 */
export function isWordTyped(inputValue, wordEl) {
  const word = wordEl.getAttribute('data-current-word');
  const typedWord = inputValue.trim();
  return word.toLowerCase() === typedWord.toLowerCase();
}

/**
 * @param {string|Object} item - The raw data from the word list.
 * @param {string} mode - The current game mode.
 * @returns {Object} An object containing at least the 'word' property.
 */
export function getWordAndImage(item, mode) {
  if (mode === 'standard') {
    return {word: item}
  }
  return item;
}

let index = 0;

/**
 * Get and show a new random word
 * @param {string} mode - The current active game mode.
 * @param {Object} el - Object containing the necessary DOM elements (word, wordImage, body).
 */
export function getAndShowNewWord(mode, el) {
  const {word, image} = getWordAndImage(wordItems[index], mode);

  const {image: nextImage} = wordItems[index + 1];
  nextImage && preloadImage(nextImage, mode);

  el.word.setAttribute('data-current-word', word);

  if (image) {
    el.wordImage.src = getImageSrc(image, mode);
    el.wordImage.classList.remove('hidden');
  }

  /** We also set two random Hues **/
  el.body.style.setProperty("--randomHue1", getRandomHue());
  el.body.style.setProperty("--randomHue2", getRandomHue());

  index = index < wordItems.length - 1 ? index + 1 : 0;
}