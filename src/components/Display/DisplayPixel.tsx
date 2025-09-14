import { memo } from "react";
import { fromNullable } from "../../util";

type DisplayPixelProps = {
  color: DisplayPixelColor | null;
};

export const DisplayPixel = memo(({ color }: DisplayPixelProps) => {
  const colorClass = fromNullable(color)
    .map((displayColor) => DISPLAY_COLOR_TO_CLASS_MAP[displayColor])
    .unwrapOrElse("");

  return <div className={`aspect-square ${colorClass}`} />;
});

export type DisplayPixelColor = "primary" | "secondary";
const DISPLAY_COLOR_TO_CLASS_MAP: Record<DisplayPixelColor, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
};
