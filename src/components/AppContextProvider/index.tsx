import type { PropsWithChildren } from "react";
import { GameStateContextProvider } from "./GameStateContextProvider";
import { UserInputContextProvider } from "./UserInputContextProvider";
import { MainLoopContextProvider } from "./MainLoopContextProvider";

export const AppContextProvider = ({ children }: PropsWithChildren) => (
  <GameStateContextProvider>
    <UserInputContextProvider>
      <MainLoopContextProvider>{children}</MainLoopContextProvider>
    </UserInputContextProvider>
  </GameStateContextProvider>
);
