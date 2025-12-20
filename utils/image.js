export function getImageSrc(image, mode) {
  if (!image) return null;
  return mode === 'youngKids'
    ? `images/icons/${image}.svg`
    : `images/brainrot/${image}.webp`;
}

export function preloadImage(image) {
  const src = getImageSrc(image);
  if (!src) return;
  const preloadImg = new Image();
  preloadImg.src = src;
}