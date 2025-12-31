import {preloadImage, renderImage} from "./image.js";
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

/** @type {WordItem[]} */
let originalWordItems = [];

/** @type {WordItem[]} */
let wordItems = [];

let activeWordIndex = 0;

const el = getEl();

export function getWordItems() {
  return wordItems;
}

export function shuffleWordItems() {
  activeWordIndex = 0;
  wordItems = getShuffledArray(originalWordItems, getMode() === 'brainrot' ? 40 : undefined);
}

export async function loadWordItems() {
  try {
    const response = await fetch(getWordsFileName());
    originalWordItems = await response.json();
    shuffleWordItems();
    return true;
  } catch (error) {
    console.error("Failed to load words:", error);
    return false;
  }
}

export function getWordsFileName() {
  const mode = getMode();

  if (mode === 'youngKids') {
    return 'wordsPerImageYoungKids.json?v=19';
  }

  if (mode === 'brainrot') {
    return 'wordsPerImageBrainrot.json?v=19';
  }

  return "wordsDutch.json?v=19";
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

export function getAndShowNewWord() {
  if (activeWordIndex >= wordItems.length) {
    activeWordIndex = 0;
  }

  const {word, image} = getWordAndImage(wordItems[activeWordIndex]);

  if (getMode() === 'brainrot' && activeWordIndex > 0) {
    increaseSecondsBasedOnWord(word);
  }

  el.word.setAttribute('data-current-word', word);

  if (image) {
    renderImage(image);
  }

  if (word.includes('six seven')) {
    doSixSevenAnimation();
  }

  const {image: nextImage} = wordItems[activeWordIndex + 1];
  nextImage && preloadImage(nextImage);

  /** We also set two random Hues **/
  el.body.style.setProperty("--randomHue1", getRandomHue());
  el.body.style.setProperty("--randomHue2", getRandomHue());

  activeWordIndex++;
}

/**
 * @param {Array} arr - The original array to shuffle.
 * @param {number} [sliceEnd] - The original array to shuffle.
 * @returns {Array} A new array with elements in random order.
 */
export function getShuffledArray(arr, sliceEnd) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }

  if (sliceEnd) {
    return a.slice(0, sliceEnd);
  }

  return a;
}