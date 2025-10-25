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
import { keyboardEventToDirection } from "./util";

export const UserInputContextProvider = ({ children }: PropsWithChildren) => {
  const ref = useRef<Direction[]>([]);

  const dispatchDirection = useCallback((direction: Direction) => {
    ref.current.push(direction);
  }, []);

  const { activeDirections, addActiveDirection, removeActiveDirection } =
    useActiveDirections();

  useEffect(() => {
    const handleArrowKeydown = (e: KeyboardEvent) => {
      keyboardEventToDirection(e).map((direction) => {
        e.preventDefault();
        dispatchDirection(direction);
        addActiveDirection(direction);
      });
    };

    const handleArrowKeyup = (e: KeyboardEvent) => {
      keyboardEventToDirection(e).map((direction) => {
        e.preventDefault();
        removeActiveDirection(direction);
      });
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
