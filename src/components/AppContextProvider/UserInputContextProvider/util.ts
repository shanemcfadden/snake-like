import type { Direction } from "../../../types";
import { none, some, type Option } from "../../../util/option";

export const keyToDirection = (key: string): Option<Direction> => {
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
