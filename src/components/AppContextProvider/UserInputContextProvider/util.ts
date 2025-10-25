import type { Direction } from "../../../types";
import { not } from "../../../util";
import { none, some, type Option } from "../../../util/option";

export const keyboardEventToDirection = (e: KeyboardEvent): Option<Direction> =>
  some(e)
    .filter((e) => !e.repeat)
    .filter(not(isModifiedEvent))
    .map((e) => e.key)
    .andThen(keyToDirection);

const isModifiedEvent = (e: KeyboardEvent) => {
  return e.altKey || e.ctrlKey || e.metaKey;
};

const keyToDirection = (key: string): Option<Direction> => {
  switch (key) {
    case "ArrowUp":
    case "w":
    case "W":
      return some("up");
    case "ArrowDown":
    case "s":
    case "S":
      return some("down");
    case "ArrowLeft":
    case "a":
    case "A":
      return some("left");
    case "ArrowRight":
    case "d":
    case "D":
      return some("right");
    default:
      return none();
  }
};
