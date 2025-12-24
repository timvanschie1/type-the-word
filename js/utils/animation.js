import {getEl} from "./elements.js";

const el = getEl();

export function initAnimations() {
  el.body.addEventListener('animationend', (e) => {
    if (e.animationName === 'sixSeven') {
      el.body.classList.remove('six-seven-animation');
    }
  });
}

export function doSixSevenAnimation() {
  el.body.classList.add('six-seven-animation');
}