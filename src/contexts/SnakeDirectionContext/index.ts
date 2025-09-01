import { createContext, useContext, type RefObject } from "react";
import type { Direction } from "../../types";

export const SnakeDirectionContext = createContext<{
  ref: RefObject<Direction>;
  reset: () => void;
}>({ ref: { current: "right" }, reset: () => {} });
export const useSnakeDirectionContext = () => useContext(SnakeDirectionContext);
