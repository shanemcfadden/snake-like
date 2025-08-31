import { DisplayPixel } from "./DisplayPixel";

export const Display = () => (
  <div className={`border-2 grid grid-cols-20 gap-1`}>
    {Array.from({ length: DISPLAY_WIDTH * DISPLAY_HEIGHT }).map((_, i) => {
      const isOn = i === coordinateToIndex(STARTING_PIXEL);

      return <DisplayPixel key={i} isOn={isOn} />;
    })}
  </div>
);

const DISPLAY_WIDTH = 20;
const DISPLAY_HEIGHT = 20;

const STARTING_PIXEL: Coordinate = [
  Math.ceil(DISPLAY_WIDTH / 2) - 1,
  Math.ceil(DISPLAY_HEIGHT / 2) - 1,
];

type Coordinate = [number, number];
const coordinateToIndex = ([x, y]: Coordinate) => y * DISPLAY_HEIGHT + x;
