import type { Coordinate, Direction } from "../../types";

export type GameState = StartOfGameState | InProgressState | EndOfGameState;

type InProgressState = {
  status: "IN_PROGRESS";
  snakeDirection: Direction;
  snakeHead: Coordinate;
  snakeBody: Coordinate[];
  snakeFood: Coordinate;
};

type StartOfGameState = {
  status: "START";
};

type EndOfGameState = {
  status: "END";
  snakeHead: Coordinate;
  snakeBody: Coordinate[];
  snakeLength: number;
  snakeFood: Coordinate;
};

export type GameStateAction =
  | { type: "TICK"; userInput: Direction[] }
  | { type: "RESET" };
