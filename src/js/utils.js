export function getNumberFilledArray(length) {
  return Array.from({ length }, (_, i) => String(i + 1));
}

export function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

export function checkDuplicateExists(array) {
  return new Set(array).size !== array.length;
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
