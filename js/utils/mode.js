/** Local Storage Keys: **/
const MODE_KEY = 'type-the-word-mode';

export function getMode() {
  return JSON.parse(localStorage.getItem(MODE_KEY)) || 'standard';
}

export function handleModeChange(e) {
  localStorage.setItem(MODE_KEY, JSON.stringify(e.target.value));
  window.location.reload();
}
