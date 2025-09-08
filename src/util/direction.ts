import type { Direction } from "../types";

export const isOppositeDirection =
  (direction1: Direction) => (direction2: Direction) => {
    const directions = new Set([direction1, direction2]);

    return (
      (directions.has("up") && directions.has("down")) ||
      (directions.has("left") && directions.has("right"))
    );
  };
