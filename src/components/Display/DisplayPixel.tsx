import { memo } from "react";

type DisplayPixelProps = {
  isOn: boolean;
};

export const DisplayPixel = memo(({ isOn }: DisplayPixelProps) => (
  <div className={`aspect-square ${isOn ? "bg-black" : ""}`} />
));
