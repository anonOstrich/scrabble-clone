// This is not as simple as () => 0.5 - Math.random() as the shuffle function
// (i.e. if you want a suitable probability distribution)
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array: unknown[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function getRandomElements<T>(elements: T[], n: number): T[] {
  const copied = [...elements];
  shuffleArray(copied);
  return copied.slice(0, n);
}
