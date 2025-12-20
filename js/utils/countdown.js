/**
 * Count down from 60 to 0
 * @param {string} mode - The current game mode, used to determine timer duration.
 * @param {Object} el - Object containing relevant DOM elements (countDown, word, input, retryButton).
 */
export function startCountDown(mode, el) {
  let secondsLeft = mode === 'youngKids' ? 120 : 60;
  el.countDown.textContent = secondsLeft.toString();

  const countDownInterval = setInterval(() => {
    secondsLeft--;

    el.countDown.textContent = secondsLeft.toString();

    if (secondsLeft === 0) {
      el.word.setAttribute('data-current-word', "Nog eens?");
      el.input.classList.add('hidden');
      el.retryButton.classList.remove('hidden');
      el.retryButton.focus();
      clearInterval(countDownInterval);
    }
  }, 1000);
}