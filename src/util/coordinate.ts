import { DISPLAY_HEIGHT, DISPLAY_WIDTH } from "../constants";
import type { Coordinate, Direction } from "../types";
import { getRandomInteger } from "./random";

export const isSameCoordinate = (
  [x1, y1]: Coordinate,
  [x2, y2]: Coordinate,
): boolean => x1 === x2 && y1 === y2;

export const getMovedCoordinate = (
  coordinate: Coordinate,
  direction: Direction,
): Coordinate => {
  switch (direction) {
    case "up":
      return [coordinate[0], coordinate[1] - 1];
    case "down":
      return [coordinate[0], coordinate[1] + 1];
    case "left":
      return [coordinate[0] - 1, coordinate[1]];
    case "right":
      return [coordinate[0] + 1, coordinate[1]];
  }
};

export const getRandomCoordinate = (): Coordinate => [
  getRandomInteger(DISPLAY_WIDTH),
  getRandomInteger(DISPLAY_HEIGHT),
];
