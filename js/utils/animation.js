export function initAnimations() {
  document.body.addEventListener('onanimationend', (el) => el.classList.remove('six-seven-animation'));
}

/** @param {string} word - The word to check against the animation trigger. **/
export function doSixSevenAnimation(word) {
  if (word === 'six seven') {
    document.body.classList.add('six-seven-animation');
  }
}