import {getEl} from "./elements.js";

const el = getEl();

export function initAnimations() {
  el.body.addEventListener('animationend', (e) => {
    if (e.animationName === 'sixSeven') {
      el.body.classList.remove('six-seven-animation');
    }
  });

  [el.startButton, el.retryButton].forEach(button => {
    let isTransitioning = false;
    button.addEventListener("transitionstart", () => isTransitioning = true);
    button.addEventListener("transitionend", () => isTransitioning = false);

    button.addEventListener('mouseenter', () => button.classList.add('hover'))
    button.addEventListener('mouseleave', () => {
      if (isTransitioning) {
        button.addEventListener('transitionend', () => button.classList.remove('hover'), {once: true})
      } else {
        button.classList.remove('hover')
      }
    })
  })
}

export function doSixSevenAnimation() {
  el.body.classList.add('six-seven-animation');
}