import {getImageSrc} from "./image.js";
import {getUnshuffedWordItems} from "./word.js";
import {getMode} from "./mode.js";

const containerEl = document.querySelector('.js-brainrots');
const cardTemplate = document.querySelector('#brainrot-card-template');

/**
 * @param {string[]} scoredBrainrots - Array of brainrot identifiers (slugs) that have been unlocked.
 * @param {string} [justScoredBrainrot] - The identifier of the brainrot that was just scored/added (optional).
 */
export function renderBrainrots(scoredBrainrots, justScoredBrainrot) {
  containerEl.innerHTML = '';

  if (getMode() !== 'brainrot') {
    return;
  }

  const allBrainrots = getUnshuffedWordItems().map(item => item.image);

  allBrainrots.forEach(brainrot => {
    const clone = cardTemplate.content.cloneNode(true);

    if (scoredBrainrots.includes(brainrot)) {
      const img = clone.querySelector('img');
      img.style.viewTransitionName = brainrot;
      img.src = getImageSrc(brainrot);
    }

    containerEl.appendChild(clone);
  });

  if (justScoredBrainrot) {
    containerEl.querySelector(`img[src="${getImageSrc(justScoredBrainrot)}"]`).scrollIntoView({
      block: 'center'
    })
  }
}