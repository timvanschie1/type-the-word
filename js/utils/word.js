import {getImageSrc, preloadImage} from "./image.js";
import {getRandomHue} from "./color.js";
import {doSixSevenAnimation} from "./animation.js";
import {increaseSecondsBasedOnWord} from "./countdown.js";
import {getMode} from "./mode.js";
import {getEl} from "./elements.js";

/**
 * @typedef {Object} WordItem
 * @property {string} word - The text to be typed.
 * @property {string} [image] - Optional identifier for the associated image.
 */

const el = getEl();

/** @type {WordItem[]} */
let wordItemsUnshuffled = [];
/** @type {WordItem[]} */
let wordItems = [];

export function getWordItemUnshuffled() {
  return wordItemsUnshuffled;
}

export function getWordItems() {
  return wordItems;
}

export async function loadWordItems() {
  try {
    const response = await fetch(getWordsFileName());
    const data = await response.json();
    wordItemsUnshuffled = data;
    wordItems = getShuffledArray(data);
    return true;
  } catch (error) {
    console.error("Failed to load words:", error);
    return false;
  }
}

export function getWordsFileName() {
  const mode = getMode();

  if (mode === 'youngKids') {
    return 'wordsPerImageYoungKids.json?v=13';
  }

  if (mode === 'brainrot') {
    return 'wordsPerImageBrainrot.json?v=13';
  }

  return "wordsDutch.json?v=13";
}

/** @param {string} inputValue - The text from the input field. **/
export function isWordTyped(inputValue) {
  const word = el.word.getAttribute('data-current-word');
  const typedWord = inputValue.trim();
  return word.toLowerCase() === typedWord.toLowerCase();
}

/**
 * @param {string|WordItem} item - The raw data from the word list.
 * @returns {WordItem} An object containing at least the 'word' property.
 */
export function getWordAndImage(item) {
  if (getMode() === 'standard') {
    return {word: item}
  }

  return {word: item.word, image: item.image}
}

let index = 0;

export function resetWordIndex() {
  index = 0;
}

export function getAndShowNewWord() {
  const {word, image} = getWordAndImage(wordItems[index]);

  if (getMode() === 'brainrot' && index > 0) {
    increaseSecondsBasedOnWord(word);
  }

  if (word.includes('six seven')) {
    doSixSevenAnimation();
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