import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type PropsWithChildren,
} from "react";
import {
  useGameStateContext,
  useGameStateDispatchContext,
} from "../../contexts/GameStateContext";
import { useUserInputContext } from "../../contexts/UserInputContext";
import { MainLoopContext } from "../../contexts/MainLoopContext";

export const MainLoopContextProvider = ({ children }: PropsWithChildren) => {
  const gameState = useGameStateContext();
  const dispatchGameState = useGameStateDispatchContext();

  const { ref: userInputRef, reset: resetUserInput } = useUserInputContext();
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (gameState.status === "END" && intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [gameState]);

  const start = useCallback(
    () => {
      resetUserInput();
      dispatchGameState({ type: "START" });

      intervalRef.current = setInterval(() => {
        dispatchGameState({
          type: "TICK",
          userInput: userInputRef.current,
        });
        resetUserInput();
      }, 200);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const value = useMemo(() => ({ start }), [start]);

  return (
    <MainLoopContext.Provider value={value}>
      {children}
    </MainLoopContext.Provider>
  );
};
