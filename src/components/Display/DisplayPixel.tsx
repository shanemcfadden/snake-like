import { memo } from "react";

type DisplayPixelProps = {
  color: DisplayPixelColor | null;
};

export const DisplayPixel = memo(({ color }: DisplayPixelProps) => {
  const colorClass = color ? DISPLAY_COLOR_TO_CLASS_MAP[color] : "";

  return <div className={`aspect-square ${colorClass}`} />;
});

export type DisplayPixelColor = "primary" | "secondary";
const DISPLAY_COLOR_TO_CLASS_MAP: Record<DisplayPixelColor, string> = {
  primary: "bg-black",
  secondary: "bg-green-600",
};
