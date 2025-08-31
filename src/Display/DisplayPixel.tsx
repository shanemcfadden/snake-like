type DisplayPixelProps = {
  isOn: boolean;
};

export const DisplayPixel = ({ isOn }: DisplayPixelProps) => (
  <div className={`aspect-square ${isOn ? "bg-black" : ""}`} />
);
