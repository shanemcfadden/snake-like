import { DISPLAY_HEIGHT, DISPLAY_WIDTH, STARTING_PIXEL } from "../../constants";
import type { Coordinate, Direction } from "../../types";
import { findLast, not } from "../../util";
import type { GameState, GameStateAction } from "./types";

export const reducer = (
  state: GameState,
  action: GameStateAction,
): GameState => {
  if (action.type === "RESET") {
    return { status: "START" };
  }

  if (state.status === "END") {
    return state;
  }

  if (state.status === "START") {
    return {
      status: "IN_PROGRESS",
      snakeHead: STARTING_PIXEL,
      snakeBody: [STARTING_PIXEL],
      snakeDirection: "right",
      snakeFood: [5, 5],
    };
  }

  const direction =
    findLast(
      action.userInput,
      not(isOppositeDirection(state.snakeDirection)),
    ) || state.snakeDirection;

  const newHead = moveCoordinate(state.snakeHead, direction);

  if (!newHead) {
    return {
      status: "END",
      snakeFood: state.snakeFood,
      snakeHead: state.snakeHead,
      snakeBody: state.snakeBody,
      snakeLength: state.snakeBody.length,
    };
  }

  return {
    status: "IN_PROGRESS",
    snakeHead: newHead,
    snakeBody: [newHead, ...state.snakeBody.slice(0, -1)],
    snakeFood: state.snakeFood,
    snakeDirection: direction,
  };
};

const moveCoordinate = (
  coordinate: Coordinate,
  direction: Direction,
): Coordinate | null => {
  switch (direction) {
    case "up":
      return isValidCoordinate([coordinate[0], coordinate[1] - 1])
        ? [coordinate[0], coordinate[1] - 1]
        : null;
    case "down":
      return isValidCoordinate([coordinate[0], coordinate[1] + 1])
        ? [coordinate[0], coordinate[1] + 1]
        : null;
    case "left":
      return isValidCoordinate([coordinate[0] - 1, coordinate[1]])
        ? [coordinate[0] - 1, coordinate[1]]
        : null;
    case "right":
      return isValidCoordinate([coordinate[0] + 1, coordinate[1]])
        ? [coordinate[0] + 1, coordinate[1]]
        : null;
  }
};

const isOppositeDirection =
  (direction1: Direction) => (direction2: Direction) =>
    (direction1 === "up" && direction2 === "down") ||
    (direction1 === "down" && direction2 === "up") ||
    (direction1 === "left" && direction2 === "right") ||
    (direction1 === "right" && direction2 === "left");

const isValidCoordinate = ([x, y]: Coordinate): boolean =>
  x >= 0 && x < DISPLAY_WIDTH && y >= 0 && y < DISPLAY_HEIGHT;
