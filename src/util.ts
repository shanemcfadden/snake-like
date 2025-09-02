export const findLast = <T>(
  array: T[],
  predicate: (element: T) => boolean,
): T | undefined => {
  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i])) {
      return array[i];
    }
  }
};

export const not =
  <T>(predicate: (arg: T) => boolean) =>
  (arg: T) =>
    !predicate(arg);
