import {getImageSrc, preloadImage} from "./image.js";
import {getRandomHue} from "./color.js";
import {getShuffledArray} from "./array.js";
import {doSixSevenAnimation} from "./animation.js";
import {increaseSecondsBasedOnWord} from "./countdown.js";
import {getMode} from "./mode.js";

/** Get the collection of 10.000 Dutch kids friendly words **/
let wordItemsUnshuffled = [];
let wordItems = [];

export function getUnshuffedWordItems() {
  return wordItemsUnshuffled;
}

export function getWordItems() {
  return wordItems;
}

export function loadWordItems() {
  fetch(getWordsFileName())
    .then(r => r.json())
    .then(data => {
      wordItemsUnshuffled = data;
      wordItems = getShuffledArray(data)
    });
}

/**
 * @returns {string} The key used for storing/retrieving the high score.
 */
export function getWordsFileName() {
  const mode = getMode();

  if (mode === 'youngKids') {
    return 'wordsPerImageYoungKids.json?v=12';
  }

  if (mode === 'brainrot') {
    return 'wordsPerImageBrainrot.json?v=12';
  }

  return "wordsDutch.json?v=12";
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
 * @returns {Object} An object containing at least the 'word' property.
 */
export function getWordAndImage(item) {
  if (getMode() === 'standard') {
    return {word: item}
  }
  return item;
}

let index = 0;

export function resetWordIndex() {
  index = 0;
}

/**
 * Get and show a new random word
 * @param {Object} el - Object containing the necessary DOM elements (word, wordImage, body).
 */
export function getAndShowNewWord(el) {
  const {word, image} = getWordAndImage(wordItems[index]);

  if (getMode() === 'brainrot' && index > 0) {
    increaseSecondsBasedOnWord(word, el);
  }

  if (word === 'six seven') {
    doSixSevenAnimation(word);
  }

  const {image: nextImage} = wordItems[index + 1];
  nextImage && preloadImage(nextImage);

  el.word.setAttribute('data-current-word', word);

  if (image) {
    el.wordImage.style.viewTransitionName = image;
    el.wordImage.src = getImageSrc(image);
    el.wordImage.classList.remove('hidden');
  }

  /** We also set two random Hues **/
  el.body.style.setProperty("--randomHue1", getRandomHue());
  el.body.style.setProperty("--randomHue2", getRandomHue());

  index = index < wordItems.length - 1 ? index + 1 : 0;
}