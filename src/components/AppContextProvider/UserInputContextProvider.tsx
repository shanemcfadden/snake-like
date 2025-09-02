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

  useEffect(() => {
    const handleArrowKey = (e: KeyboardEvent) => {
      e.preventDefault();
      switch (e.key) {
        case "ArrowUp":
          ref.current.push("up");
          break;
        case "ArrowDown":
          ref.current.push("down");
          break;
        case "ArrowLeft":
          ref.current.push("left");
          break;
        case "ArrowRight":
          ref.current.push("right");
          break;
      }
    };

    window.addEventListener("keydown", handleArrowKey);
    return () => window.removeEventListener("keydown", handleArrowKey);
  }, []);

  const reset = useCallback(() => {
    ref.current = [];
  }, []);

  const context = useMemo(
    () => ({
      ref,
      reset,
    }),
    [reset],
  );

  return (
    <UserInputContext.Provider value={context}>
      {children}
    </UserInputContext.Provider>
  );
};
