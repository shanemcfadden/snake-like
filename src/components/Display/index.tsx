import { DisplayPixel, type DisplayPixelColor } from "./DisplayPixel";
import type { Coordinate } from "../../types";
import { DISPLAY_HEIGHT, DISPLAY_WIDTH } from "../../constants";
import { useGameStateContext } from "../../contexts/GameStateContext";
import type { GameState } from "../../contexts/GameStateContext/types";

export const Display = () => {
  const gameState = useGameStateContext();

  return (
    <div className={`border-2 grid grid-cols-20 gap-1`}>
      {Array.from({ length: DISPLAY_WIDTH * DISPLAY_HEIGHT }).map((_, i) => {
        return <DisplayPixel key={i} color={calculateColor(i, gameState)} />;
      })}
    </div>
  );
};

const coordinateToIndex = ([x, y]: Coordinate) => y * DISPLAY_HEIGHT + x;

const calculateColor = (
  index: number,
  gameState: GameState,
): DisplayPixelColor | null => {
  if (gameState.status === "START") {
    return null;
  }

  if (index === coordinateToIndex(gameState.snakeHead)) {
    return "primary";
  }

  if (index === coordinateToIndex(gameState.snakeFood)) {
    return "secondary";
  }

  return null;
};
