export const Display = () => (
  <div className={`border-2 grid grid-cols-20 gap-1`}>
    {Array.from({ length: DISPLAY_WIDTH * DISPLAY_HEIGHT }).map((_, i) => (
      <DisplayPixel key={i} />
    ))}
  </div>
);

const DisplayPixel = () => <div className="aspect-square bg-black" />;

const DISPLAY_WIDTH = 20;
const DISPLAY_HEIGHT = 20;
