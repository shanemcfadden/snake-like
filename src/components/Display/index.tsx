import { DisplayPixel } from "./DisplayPixel";
import type { Coordinate } from "../../types";
import { DISPLAY_HEIGHT, DISPLAY_WIDTH } from "../../constants";
import { useGameStateContext } from "../../contexts/GameStateContext";

export const Display = () => {
  const gameState = useGameStateContext();

  return (
    <div className={`border-2 grid grid-cols-20 gap-1`}>
      {Array.from({ length: DISPLAY_WIDTH * DISPLAY_HEIGHT }).map((_, i) => (
          <DisplayPixel
            key={i}
            isOn={
              gameState.status !== "START" &&
              i === coordinateToIndex(gameState.snakeHead)
            }
          />
        ))}
    </div>
  );
};

const coordinateToIndex = ([x, y]: Coordinate) => y * DISPLAY_HEIGHT + x;
