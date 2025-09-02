import type { PropsWithChildren } from "react";
import { GameStateContextProvider } from "./GameStateContextProvider";
import { SnakeDirectionContextProvider } from "./SnakeDirectionContextProvider";
import { MainLoopContextProvider } from "./MainLoopContextProvider";

export const AppContextProvider = ({ children }: PropsWithChildren) => (
  <GameStateContextProvider>
    <SnakeDirectionContextProvider>
      <MainLoopContextProvider>{children}</MainLoopContextProvider>
    </SnakeDirectionContextProvider>
  </GameStateContextProvider>
);
