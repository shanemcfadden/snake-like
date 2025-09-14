import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type PropsWithChildren,
} from "react";
import type { Direction } from "../../../types";
import { useActiveDirections } from "./useActiveDirections";
import { UserInputContext } from "../../../contexts/UserInputContext";

export const UserInputContextProvider = ({ children }: PropsWithChildren) => {
  const ref = useRef<Direction[]>([]);

  const dispatchDirection = useCallback((direction: Direction) => {
    ref.current.push(direction);
  }, []);

  const { activeDirections, addActiveDirection, removeActiveDirection } =
    useActiveDirections();

  useEffect(() => {
    const handleArrowKeydown = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.repeat) {
        return;
      }

      switch (e.key) {
        case "ArrowUp":
          dispatchDirection("up");
          addActiveDirection("up");
          break;
        case "ArrowDown":
          dispatchDirection("down");
          addActiveDirection("down");
          break;
        case "ArrowLeft":
          dispatchDirection("left");
          addActiveDirection("left");
          break;
        case "ArrowRight":
          dispatchDirection("right");
          addActiveDirection("right");
          break;
      }
    };

    const handleArrowKeyup = (e: KeyboardEvent) => {
      e.preventDefault();

      switch (e.key) {
        case "ArrowUp":
          removeActiveDirection("up");
          break;
        case "ArrowDown":
          removeActiveDirection("down");
          break;
        case "ArrowLeft":
          removeActiveDirection("left");
          break;
        case "ArrowRight":
          removeActiveDirection("right");
          break;
      }
    };

    window.addEventListener("keydown", handleArrowKeydown);
    window.addEventListener("keyup", handleArrowKeyup);

    return () => {
      window.removeEventListener("keydown", handleArrowKeydown);
      window.removeEventListener("keyup", handleArrowKeyup);
    };
  }, [dispatchDirection, addActiveDirection, removeActiveDirection]);

  const reset = useCallback(() => {
    ref.current = [];
  }, []);

  const context = useMemo(
    () => ({
      activeDirections,
      dispatchDirection,
      ref,
      reset,
    }),
    [activeDirections, dispatchDirection, reset],
  );

  return (
    <UserInputContext.Provider value={context}>
      {children}
    </UserInputContext.Provider>
  );
};
