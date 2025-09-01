import { useCallback, useEffect, useRef, type RefObject } from "react";
import type { Direction } from "../types";

export const useSnakeDirectionRef = (): {
  ref: RefObject<Direction>;
  reset: () => void;
} => {
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

  return {
    ref,
    reset,
  };
};
