import { DISPLAY_HEIGHT, DISPLAY_WIDTH } from "../../constants";
import type { Coordinate, Direction } from "../../types";
import type { Option } from "../../util";

export type GameState = StartOfGameState | InProgressState | EndOfGameState;

type InProgressState = {
  status: "IN_PROGRESS";
  display: CoordinateMap;
  highScore: Option<number>;
  score: number;
  snakeDirection: Direction;
  snakeBody: Coordinate[];
  snakeFood: Coordinate;
};

type StartOfGameState = {
  status: "START";
};

type EndOfGameState = {
  status: "END";
  display: CoordinateMap;
  highScore: Option<number>;
  isHighScore: boolean;
  score: number;
  snakeBody: Coordinate[];
  snakeFood: Coordinate;
};

export type GameStateAction =
  | { type: "TICK"; userInput: Direction[] }
  | { type: "START" };

export class CoordinateMap {
  private map: Map<string, boolean>;

  constructor(mapToClone?: Map<string, boolean>) {
    this.map = mapToClone
      ? new Map(mapToClone)
      : new Map<string, boolean>(
          Array.from({ length: DISPLAY_WIDTH }, (_, x) =>
            Array.from(
              { length: DISPLAY_HEIGHT },
              (_, y): [string, boolean] => [
                this.coordinateToKey([x, y]),
                false,
              ],
            ),
          ).flat(),
        );
  }

  clone(): CoordinateMap {
    return new CoordinateMap(this.map);
  }

  get(coordinate: Coordinate): boolean | undefined {
    return this.map.get(this.coordinateToKey(coordinate));
  }

  getAllFalseCoordinates(): Coordinate[] {
    return Array.from(this.map.entries()).flatMap(([key, value]) =>
      value ? [] : [this.keyToCoordinate(key)],
    );
  }

  set(coordinate: Coordinate, boolean: boolean): void {
    this.map.set(this.coordinateToKey(coordinate), boolean);
  }

  private coordinateToKey([x, y]: Coordinate): string {
    return `${x}:${y}`;
  }

  private keyToCoordinate(key: string): Coordinate {
    const [x, y] = key.split(":").map(Number);
    return [x, y];
  }
}
