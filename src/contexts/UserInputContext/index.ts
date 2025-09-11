import { createContext, useContext, type RefObject } from "react";
import type { Direction } from "../../types";

export const UserInputContext = createContext<{
  dispatchDirection: (direction: Direction) => void;
  ref: RefObject<Direction[]>;
  reset: () => void;
}>({
  dispatchDirection: () => {},
  ref: { current: [] },
  reset: () => {},
});

export const useUserInputContext = () => useContext(UserInputContext);
