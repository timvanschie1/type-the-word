import {getMode, handleModeChange, initMode} from "./utils/mode.js";
import {
  getAndShowNewWord,
  getWordItems,
  isWordTyped,
  loadWordItems,
  resetWordIndex
} from "./utils/word.js";
import {startCountDown} from "./utils/countdown.js";
import {handleHighScoreBeforeUnload, increaseScore, initHighScore, resetScore} from "./utils/score.js";
import {initAnimations} from "./utils/animation.js";
import {renderBrainrots} from "./utils/brainrot.js";
import {getEl} from "./utils/elements.js";

await loadWordItems();
initAnimations();
initMode();
initHighScore();

const el = getEl();

/** Handle every keystroke in the input field **/
el.input.addEventListener('input', (e) => {
  if (!isWordTyped(e.target.value)) {
    return;
  }

  function updateGameState ()  {
    increaseScore();
    getAndShowNewWord();
  }

  if (document.startViewTransition && getMode() === 'brainrot') {
    document.startViewTransition(updateGameState);
  } else {
    updateGameState();
  }

  el.input.value = '';
})

window.addEventListener("beforeunload", handleHighScoreBeforeUnload);

el.startButton.addEventListener('click', reset);
el.retryButton.addEventListener('click', reset);

el.modeRadioButtons.forEach(el => {
  el.addEventListener('change', handleModeChange);
});

function reset() {
  resetWordIndex();
  startCountDown();
  resetScore();
  renderBrainrots([], getWordItems());
  getAndShowNewWord();

  el.countDownContainer.classList.remove('hidden');
  el.scoreContainer.classList.remove('hidden');
  el.input.classList.remove('hidden');

  el.startButton.classList.add('hidden');
  el.retryButton.classList.add('hidden');
  el.input.value = '';
  el.input.focus();
}