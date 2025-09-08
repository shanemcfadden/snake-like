import { DisplayPixel, type DisplayPixelColor } from "./DisplayPixel";
import type { Coordinate } from "../../types";
import { DISPLAY_HEIGHT, DISPLAY_WIDTH } from "../../constants";
import { useGameStateContext } from "../../contexts/GameStateContext";
import type { GameState } from "../../contexts/GameStateContext/types";
import { isSameCoordinate } from "../../util";

export const Display = () => {
  const gameState = useGameStateContext();

  return (
    <div className={`border-2 grid grid-cols-20 gap-1`}>
      {Array.from({ length: DISPLAY_WIDTH * DISPLAY_HEIGHT }).map((_, i) => (
        <DisplayPixel key={i} color={calculateColor(i, gameState)} />
      ))}
    </div>
  );
};

const indexToCoordinate = (index: number): Coordinate => [
  index % DISPLAY_WIDTH,
  Math.floor(index / DISPLAY_WIDTH),
];

const calculateColor = (
  index: number,
  gameState: GameState,
): DisplayPixelColor | null => {
  if (gameState.status === "START") {
    return null;
  }

  if (isSameCoordinate(indexToCoordinate(index), gameState.snakeFood)) {
    return "secondary";
  }

  if (gameState.display.get(indexToCoordinate(index))) {
    return "primary";
  }

  return null;
};
