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
import { keyToDirection } from "./util";

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

      keyToDirection(e.key).map((direction) => {
        dispatchDirection(direction);
        addActiveDirection(direction);
      });
    };

    const handleArrowKeyup = (e: KeyboardEvent) => {
      e.preventDefault();

      keyToDirection(e.key).map(removeActiveDirection);
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
