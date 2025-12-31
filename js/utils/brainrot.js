import {getImageSrc} from "./image.js";
import {getMode} from "./mode.js";
import {getWordItems} from "./word.js";
import {getScoreObject} from "./score.js";

const containerEl = document.querySelector('.js-brainrots');
const cardTemplate = document.querySelector('#brainrot-card-template');

/** @param {string} [justScoredBrainrot] - The identifier of the brainrot that was just scored/added (optional). **/
export function renderBrainrots(justScoredBrainrot) {
  containerEl.innerHTML = '';
  const score = getScoreObject().score;

  if (getMode() !== 'brainrot') {
    return;
  }

  const allBrainrots = getWordItems().map(item => item.image);
  const doLevelUpAnimation = score.length === 0 && !!justScoredBrainrot;

  allBrainrots.forEach(brainrot => {
    const clone = cardTemplate.content.cloneNode(true);

    if (doLevelUpAnimation) {
      clone.querySelector('.brainrot-card').classList.add('brainrot-card--level-up-animation');
    }

    if (score.includes(brainrot)) {
      const img = clone.querySelector('img');
      img.dataset.image = brainrot;
      img.src = getImageSrc(brainrot);

      if (brainrot === justScoredBrainrot) {
        img.style.viewTransitionName = brainrot.replace('.', '-');
      }
    }

    containerEl.appendChild(clone);
  });

  if (justScoredBrainrot) {
    containerEl.querySelector(`img[data-image="${justScoredBrainrot}"]`).scrollIntoView({
      block: 'center'
    })
  }
}