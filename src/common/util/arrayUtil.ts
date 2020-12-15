export function hasDuplicates(array: string[]) {
  return new Set(array).size !== array.length;
}

export function shuffle<T>(array: T[]): T[] {
  const copiedArray = ([] as T[]).concat(array);

  for (var i = copiedArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = copiedArray[i];
    copiedArray[i] = copiedArray[j];
    copiedArray[j] = temp;
  }

  return copiedArray;
}

export function zipTwoWith<T, U, V>(
  first: T[],
  second: U[],
  callback: (elem1: T, elem2: U) => V
): V[] {
  const zipped: V[] = [];

  for (let i = 0; i < first.length; i++) {
    zipped.push(callback(first[i], second[i]));
  }
  return zipped;
}
