import { type Option, some, none } from "./option";

export const findLast = <T>(
  array: T[],
  predicate: (element: T) => boolean,
): Option<T> => {
  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i])) {
      return some(array[i]);
    }
  }

  return none();
};

export const getLast = <T>(array: T[]): Option<T> =>
  array.length === 0 ? none() : some(array[array.length - 1]);
