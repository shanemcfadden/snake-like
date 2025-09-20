import { STARTING_PIXEL } from "../../constants";
import type { Coordinate, Direction } from "../../types";
import {
  getMovedCoordinate,
  getRandomCoordinate,
  getRandomInteger,
  isOppositeDirection,
  isSameCoordinate,
  type Option,
  not,
  none,
  some,
  getLast,
} from "../../util";
import { CoordinateMap, type GameState, type GameStateAction } from "./types";

export const reducer = (
  state: GameState,
  action: GameStateAction,
): GameState => {
  if (action.type === "START" || state.status === "START") {
    const display = new CoordinateMap();
    display.set(STARTING_PIXEL, true);

    return {
      status: "IN_PROGRESS",
      display,
      highScore: state.status === "START" ? none() : state.highScore,
      score: 0,
      snakeBody: [STARTING_PIXEL],
      snakeDirection: "right",
      snakeFood: calculateNextFoodCoordinate(STARTING_PIXEL, display),
    };
  }

  if (state.status === "END") {
    return state;
  }

  const nextTickDirection = getNextTickDirection(
    action.userInput,
    state.snakeDirection,
  );

  return calculateNextHeadCoordinate(
    state.snakeBody,
    nextTickDirection,
    state.display,
  )
    .map<GameState>((newHead) => {
      const newDisplay = state.display.clone();

      const isEatingFood = isSameCoordinate(newHead, state.snakeFood);
      if (isEatingFood) {
        newDisplay.set(newHead, true);
        return {
          status: "IN_PROGRESS",
          display: newDisplay,
          highScore: state.highScore,
          score: state.score + 1,
          snakeBody: [newHead, ...state.snakeBody],
          snakeFood: calculateNextFoodCoordinate(state.snakeFood, newDisplay),
          snakeDirection: nextTickDirection,
        };
      }

      newDisplay.set(state.snakeBody[state.snakeBody.length - 1], false);
      // Must set head after removing tail in case they are the same coordinate
      newDisplay.set(newHead, true);
      return {
        ...state,
        status: "IN_PROGRESS",
        display: newDisplay,
        snakeBody: [newHead, ...state.snakeBody.slice(0, -1)],
        snakeDirection: nextTickDirection,
      };
    })
    .unwrapOrElse({
      ...state,
      status: "END",
      highScore: state.highScore
        .orElse<number>(() => some(0))
        .map((latestHighScore) => Math.max(latestHighScore, state.score))
        .filter((newHighScore) => newHighScore > 0),
      isHighScore: state.highScore
        .orElse<number>(() => some(0))
        .map((highScore) => state.score > highScore)
        .unwrapOrElse(false),
    });
};

const getNextTickDirection = (
  userInputDirections: Direction[],
  currentDirection: Direction,
): Direction =>
  getLast(userInputDirections)
    .filter(not(isOppositeDirection(currentDirection)))
    .unwrapOrElse(currentDirection);

const calculateNextHeadCoordinate = (
  snakeBody: Coordinate[],
  direction: Direction,
  display: CoordinateMap,
): Option<Coordinate> => {
  const currentHead = snakeBody[0];
  const currentTail = snakeBody[snakeBody.length - 1];

  const movedHead = getMovedCoordinate(currentHead, direction);

  const isExistingCoordinateUnoccupied =
    display.get(movedHead) === false ||
    // Though the tail is occupied, it will move away in the same tick as the move
    isSameCoordinate(movedHead, currentTail);

  return isExistingCoordinateUnoccupied ? some(movedHead) : none();
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
  const isRandomCoordinateOccupied = display.get(randomCoordnate);

  return isRandomCoordinateOccupied
    ? calculateNextFoodCoordinate(oldFoodCoordinate, display, attempt + 1)
    : randomCoordnate;
};
