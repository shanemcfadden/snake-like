import { useCallback, useState } from "react";
import type { Direction } from "../../../types";

export const useActiveDirections = () => {
  const [activeDirections, setActiveDirections] = useState<Set<Direction>>(
    new Set(),
  );

  const addActiveDirection = useCallback((direction: Direction) => {
    setActiveDirections((previousState) =>
      new Set(previousState).add(direction),
    );
  }, []);

  const removeActiveDirection = useCallback((direction: Direction) => {
    setActiveDirections((previousState) => {
      const newSet = new Set(previousState);
      newSet.delete(direction);
      return newSet;
    });
  }, []);

  return {
    activeDirections,
    addActiveDirection,
    removeActiveDirection,
  };
};
