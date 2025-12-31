import {getEl} from "./elements.js";

const MODE_KEY = 'type-the-word-mode';
const DEFAULT_MODE = 'standard';

const el = getEl();

let mode;

/** @returns {'standard' | 'brainrot' | 'youngKids'} **/
export function getMode() {
  if (mode) {
    return mode;
  }

  try {
    const saved = localStorage.getItem(MODE_KEY);
    mode = saved ? JSON.parse(saved) : DEFAULT_MODE;
  } catch (e) {
    mode = DEFAULT_MODE;
  }

  return mode;
}

export function initMode() {
  const mode = getMode();
  document.querySelector(`input[value="${mode}"]`).checked = true;
  el.body.classList.add(`mode--${mode}`);
}

export function handleModeChange(e) {
  localStorage.setItem(MODE_KEY, JSON.stringify(e.target.value));
  window.location.reload();
}
