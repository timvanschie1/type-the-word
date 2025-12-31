import {getImageSrc} from "./image.js";
import {getMode} from "./mode.js";

const containerEl = document.querySelector('.js-brainrots');
const cardTemplate = document.querySelector('#brainrot-card-template');

/**
 * @param {string[]} scoredBrainrots - Array of brainrot identifiers (slugs) that have been unlocked.
 * @param {Object[]} allBrainrotItems - The full list of word items.
 * @param {string} [justScoredBrainrot] - The identifier of the brainrot that was just scored/added (optional).
 */
export function renderBrainrots(scoredBrainrots, allBrainrotItems, justScoredBrainrot) {
  containerEl.innerHTML = '';

  if (getMode() !== 'brainrot') {
    return;
  }

  const allBrainrots = allBrainrotItems.map(item => item.image);

  allBrainrots.forEach(brainrot => {
    const clone = cardTemplate.content.cloneNode(true);

    if (scoredBrainrots.includes(brainrot)) {
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