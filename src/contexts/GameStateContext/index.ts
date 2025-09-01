import { createContext, useContext, type Dispatch } from "react";
import type { Coordinate, Direction } from "../../types";

export const GameStateContext = createContext<GameState>({ status: "START" });
export const useGameStateContext = () => useContext(GameStateContext);

export type GameState = StartOfGameState | InProgressState | EndOfGameState;

type InProgressState = {
  status: "IN_PROGRESS";
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
};

export const GameStateDispatchContext = createContext<
  Dispatch<GameStateAction>
>(() => {});
export const useGameStateDispatchContext = () =>
  useContext(GameStateDispatchContext);

export type GameStateAction =
  | { type: "TICK"; direction: Direction }
  | { type: "RESET" };
