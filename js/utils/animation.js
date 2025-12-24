import {getEl} from "./elements.js";

const {body} = getEl();

export function initAnimations() {
  body.addEventListener('onanimationend', () => {
    body.classList.remove('six-seven-animation')
  });
}

/** @param {string} word - The word to check against the animation trigger. **/
export function doSixSevenAnimation(word) {
  if (word === 'six seven') {
    body.classList.add('six-seven-animation');
  }
}