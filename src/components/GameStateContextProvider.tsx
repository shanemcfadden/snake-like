import { useReducer, type PropsWithChildren } from "react";
import type { Coordinate, Direction } from "../types";
import {
  GameStateContext,
  GameStateDispatchContext,
  type GameState,
  type GameStateAction,
} from "../contexts/GameStateContext";
import { DISPLAY_HEIGHT, DISPLAY_WIDTH, STARTING_PIXEL } from "../constants";

export const GameStateContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, {
    status: "START",
  });

  return (
    <GameStateContext.Provider value={state}>
      <GameStateDispatchContext.Provider value={dispatch}>
        {children}
      </GameStateDispatchContext.Provider>
    </GameStateContext.Provider>
  );
};

const reducer = (state: GameState, action: GameStateAction): GameState => {
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
      snakeFood: [5, 5],
    };
  }

  const newHead = moveCoordinate(state.snakeHead, action.direction);

  if (!newHead) {
    return {
      status: "END",
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

const isValidCoordinate = ([x, y]: Coordinate): boolean => x >= 0 && x < DISPLAY_WIDTH && y >= 0 && y < DISPLAY_HEIGHT;
