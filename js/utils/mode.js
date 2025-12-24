const MODE_KEY = 'type-the-word-mode';
const DEFAULT_MODE = 'standard';

let mode;

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

export function initModeSelector() {
  document.querySelector(`input[value="${getMode()}"]`).checked = true;
}

export function handleModeChange(e) {
  localStorage.setItem(MODE_KEY, JSON.stringify(e.target.value));
  window.location.reload();
}
