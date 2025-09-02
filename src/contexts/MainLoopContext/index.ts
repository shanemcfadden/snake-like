import { createContext, useContext } from "react";

export const MainLoopContext = createContext({ start: () => {} });

export const useMainLoopContext = () => useContext(MainLoopContext);
