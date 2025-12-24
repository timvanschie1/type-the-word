import {getEl} from "./elements.js";

const {body} = getEl();

export function initAnimations() {
  body.addEventListener('animationend', (e) => {
    if (e.animationName === 'sixSeven') {
      body.classList.remove('six-seven-animation');
    }
  });
}

export function doSixSevenAnimation() {
  body.classList.add('six-seven-animation');
}