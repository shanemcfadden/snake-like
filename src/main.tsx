import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./components/App.tsx";
import { GameStateContextProvider } from "./components/GameStateContextProvider.tsx";
import { SnakeDirectionContextProvider } from "./components/SnakeDirectionContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameStateContextProvider>
      <SnakeDirectionContextProvider>
        <App />
      </SnakeDirectionContextProvider>
    </GameStateContextProvider>
  </StrictMode>,
);
