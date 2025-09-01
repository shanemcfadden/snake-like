import type { Coordinate } from "./types";

export const DISPLAY_WIDTH = 20;
export const DISPLAY_HEIGHT = 20;

export const STARTING_PIXEL: Coordinate = [
  Math.ceil(DISPLAY_WIDTH / 2) - 1,
  Math.ceil(DISPLAY_HEIGHT / 2) - 1,
];
