import { createContext, useContext, type Dispatch } from "react";
import type { GameState, GameStateAction } from "./types";

export const GameStateContext = createContext<GameState>({ status: "START" });
export const useGameStateContext = () => useContext(GameStateContext);

export const GameStateDispatchContext = createContext<
  Dispatch<GameStateAction>
>(() => {});
export const useGameStateDispatchContext = () =>
  useContext(GameStateDispatchContext);
