import { DisplayPixel, type DisplayPixelColor } from "./DisplayPixel";
import type { Coordinate } from "../../types";
import { DISPLAY_HEIGHT, DISPLAY_WIDTH } from "../../constants";
import { useGameStateContext } from "../../contexts/GameStateContext";
import type { GameState } from "../../contexts/GameStateContext/types";
import { isSameCoordinate } from "../../util";
import { PlayButton } from "../PlayButton";
import type { PropsWithChildren } from "react";

export const Display = () => {
  const gameState = useGameStateContext();

  if (gameState.status === "IN_PROGRESS") {
    return (
      <DisplayContainer>
        <div className={`grid grid-cols-20 gap-1`}>
          {Array.from({ length: DISPLAY_WIDTH * DISPLAY_HEIGHT }).map(
            (_, i) => (
              <DisplayPixel key={i} color={calculateColor(i, gameState)} />
            ),
          )}
        </div>
      </DisplayContainer>
    );
  }

  return (
    <DisplayContainer>
      <div className={`flex h-full justify-center`}>
        <div className="my-auto text-center">
          {gameState.status === "END" && (
            <>
              <div className="my-4 text-center text-lg">Game Over</div>
              <div className="my-4">Final Score: {gameState.score}</div>
            </>
          )}
          <PlayButton again={gameState.status === "END"} />
        </div>
      </div>
    </DisplayContainer>
  );
};

const DisplayContainer = ({ children }: PropsWithChildren) => (
  <div className={`border-1 aspect-square border-primary`}>{children}</div>
);

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
