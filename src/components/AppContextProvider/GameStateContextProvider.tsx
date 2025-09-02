import { useReducer, type PropsWithChildren } from "react";
import {
  GameStateContext,
  GameStateDispatchContext,
} from "../../contexts/GameStateContext";
import { reducer } from "../../contexts/GameStateContext/reducer";

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
