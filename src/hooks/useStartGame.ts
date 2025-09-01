import { useCallback, useEffect, useRef } from "react";
import {
  useGameStateContext,
  useGameStateDispatchContext,
} from "../contexts/GameStateContext";
import { useSnakeDirectionContext } from "../contexts/SnakeDirectionContext";

export const useStartGame = () => {
  const gameState = useGameStateContext();
  const dispatchGameState = useGameStateDispatchContext();

  const { ref: directionRef, reset: resetDirection } =
    useSnakeDirectionContext();
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (gameState.status === "END" && intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [gameState]);

  return useCallback(
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
    [gameState],
  );
};
