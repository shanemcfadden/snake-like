import { STARTING_PIXEL } from "../../constants";
import type { Coordinate, Direction } from "../../types";
import {
  findLast,
  getMovedCoordinate,
  getRandomCoordinate,
  getRandomInteger,
  isOppositeDirection,
  isSameCoordinate,
  not,
} from "../../util";
import { CoordinateMap, type GameState, type GameStateAction } from "./types";

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
    const display = new CoordinateMap();
    display.set(STARTING_PIXEL, true);

    return {
      status: "IN_PROGRESS",
      display,
      score: 0,
      snakeBody: [STARTING_PIXEL],
      snakeDirection: "right",
      snakeFood: calculateNextFoodCoordinate(STARTING_PIXEL, display),
    };
  }

  const direction =
    findLast(
      action.userInput,
      not(isOppositeDirection(state.snakeDirection)),
    ) || state.snakeDirection;

  const newHead = calculateNextHeadCoordinate(
    state.snakeBody,
    direction,
    state.display,
  );

  if (!newHead) {
    return {
      status: "END",
      display: state.display,
      score: state.score,
      snakeFood: state.snakeFood,
      snakeBody: state.snakeBody,
    };
  }

  const newDisplay = state.display.clone();

  const isEatingFood = isSameCoordinate(newHead, state.snakeFood);
  if (isEatingFood) {
    newDisplay.set(newHead, true);
    return {
      status: "IN_PROGRESS",
      display: newDisplay,
      score: state.score + 1,
      snakeBody: [newHead, ...state.snakeBody],
      snakeFood: calculateNextFoodCoordinate(state.snakeFood, newDisplay),
      snakeDirection: direction,
    };
  }

  newDisplay.set(state.snakeBody[state.snakeBody.length - 1], false);
  // Must set head after removing tail in case they are the same coordinate
  newDisplay.set(newHead, true);
  return {
    status: "IN_PROGRESS",
    display: newDisplay,
    score: state.score,
    snakeBody: [newHead, ...state.snakeBody.slice(0, -1)],
    snakeFood: state.snakeFood,
    snakeDirection: direction,
  };
};

const calculateNextHeadCoordinate = (
  snakeBody: Coordinate[],
  direction: Direction,
  display: CoordinateMap,
): Coordinate | null => {
  const currentHead = snakeBody[0];
  const currentTail = snakeBody[snakeBody.length - 1];

  const movedHead = getMovedCoordinate(currentHead, direction);

  const isExistingCoordinateUnoccupied =
    display.get(movedHead) === false ||
    // Though the tail is occupied, it will move away in the same tick as the move
    isSameCoordinate(movedHead, currentTail);

  return isExistingCoordinateUnoccupied ? movedHead : null;
};

const calculateNextFoodCoordinate = (
  oldFoodCoordinate: Coordinate,
  display: CoordinateMap,
  attempt = 0,
): Coordinate => {
  if (attempt > 5) {
    const allFalseCoordinates = display.getAllFalseCoordinates();
    return allFalseCoordinates[getRandomInteger(allFalseCoordinates.length)];
  }

  const randomCoordnate = getRandomCoordinate();
  if (display.get(randomCoordnate) === true) {
    return calculateNextFoodCoordinate(oldFoodCoordinate, display, attempt + 1);
  }

  return randomCoordnate;
};
