import { cloneDeep } from "lodash-es";
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
import { none, some, type Option } from "../../util";

export const MainLoopContextProvider = ({ children }: PropsWithChildren) => {
  const gameState = useGameStateContext();
  const dispatchGameState = useGameStateDispatchContext();

  const { ref: userInputRef, reset: resetUserInput } = useUserInputContext();
  const intervalRef = useRef<Option<number>>(INITIAL_INTERVAL_REF);

  useEffect(() => {
    if (gameState.status === "END") {
      intervalRef.current.map(clearInterval);
      intervalRef.current = none();
    }
  }, [gameState]);

  const start = useCallback(
    () => {
      resetUserInput();
      dispatchGameState({ type: "START" });

      intervalRef.current = some(
        setInterval(() => {
          const userInput = cloneDeep(userInputRef.current);
          resetUserInput();

          dispatchGameState({
            type: "TICK",
            userInput,
          });
        }, 200),
      );
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

const INITIAL_INTERVAL_REF = none<number>();
