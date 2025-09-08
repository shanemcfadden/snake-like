export const not =
  <T>(predicate: (arg: T) => boolean) =>
  (arg: T) =>
    !predicate(arg);
