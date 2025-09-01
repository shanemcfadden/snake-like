import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type PropsWithChildren,
} from "react";
import type { Direction } from "../types";
import { SnakeDirectionContext } from "../contexts/SnakeDirectionContext";

export const SnakeDirectionContextProvider = ({
  children,
}: PropsWithChildren) => {
  const ref = useRef<Direction>("right");

  useEffect(() => {
    const handleArrowKey = (e: KeyboardEvent) => {
      e.preventDefault();
      switch (e.key) {
        case "ArrowUp":
          ref.current = "up";
          break;
        case "ArrowDown":
          ref.current = "down";
          break;
        case "ArrowLeft":
          ref.current = "left";
          break;
        case "ArrowRight":
          ref.current = "right";
          break;
      }
    };

    window.addEventListener("keydown", handleArrowKey);
    return () => window.removeEventListener("keydown", handleArrowKey);
  }, []);

  const reset = useCallback(() => {
    ref.current = "right";
  }, []);

  const context = useMemo(() => ({
      ref,
      reset,
    }), [reset]);

  return (
    <SnakeDirectionContext.Provider value={context}>
      {children}
    </SnakeDirectionContext.Provider>
  );
};
