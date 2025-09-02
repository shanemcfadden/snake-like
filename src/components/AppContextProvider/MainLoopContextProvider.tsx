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
import { useSnakeDirectionContext } from "../../contexts/SnakeDirectionContext";
import { MainLoopContext } from "../../contexts/MainLoopContext";

export const MainLoopContextProvider = ({ children }: PropsWithChildren) => {
  const gameState = useGameStateContext();
  const dispatchGameState = useGameStateDispatchContext();

  const { ref: directionRef, reset: resetDirection } =
    useSnakeDirectionContext();
  const intervalRef = useRef<number | null>(null);

  // TODO: this is not getting called since useStartGame is getting unmounted
  // We should store this logic in some sort of persisted state that's not tied to the play button being visible
  useEffect(() => {
    if (gameState.status === "END" && intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [gameState]);

  const start = useCallback(
    () => {
      resetDirection();

      intervalRef.current = setInterval(() => {
        dispatchGameState({
          type: "TICK",
          direction: directionRef.current,
        });
      }, 500);
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
