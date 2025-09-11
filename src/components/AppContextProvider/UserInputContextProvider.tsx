import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type PropsWithChildren,
} from "react";
import type { Direction } from "../../types";
import { UserInputContext } from "../../contexts/UserInputContext";

export const UserInputContextProvider = ({ children }: PropsWithChildren) => {
  const ref = useRef<Direction[]>([]);

  const dispatchDirection = useCallback((direction: Direction) => {
    ref.current.push(direction);
  }, []);

  useEffect(() => {
    const handleArrowKey = (e: KeyboardEvent) => {
      e.preventDefault();
      switch (e.key) {
        case "ArrowUp":
          dispatchDirection("up");
          break;
        case "ArrowDown":
          dispatchDirection("down");
          break;
        case "ArrowLeft":
          dispatchDirection("left");
          break;
        case "ArrowRight":
          dispatchDirection("right");
          break;
      }
    };

    window.addEventListener("keydown", handleArrowKey);
    return () => window.removeEventListener("keydown", handleArrowKey);
  }, [dispatchDirection]);

  const reset = useCallback(() => {
    ref.current = [];
  }, []);

  const context = useMemo(
    () => ({
      dispatchDirection,
      ref,
      reset,
    }),
    [reset, dispatchDirection],
  );

  return (
    <UserInputContext.Provider value={context}>
      {children}
    </UserInputContext.Provider>
  );
};
