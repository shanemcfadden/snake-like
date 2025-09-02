import { createContext, useContext, type RefObject } from "react";
import type { Direction } from "../../types";

export const UserInputContext = createContext<{
  ref: RefObject<Direction[]>;
  reset: () => void;
}>({ ref: { current: [] }, reset: () => {} });

export const useUserInputContext = () => useContext(UserInputContext);
