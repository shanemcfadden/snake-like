import type { PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<{
  disabled?: boolean;
  onClick: () => void;
}>;

export const Button = ({ disabled, onClick, children }: ButtonProps) => (
  <button
    className={[
      "bg-primary",
      "border-black",
      "cursor-pointer",
      "disabled:cursor-not-allowed",
      "disabled:hover:bg-primary",
      "disabled:opacity-50",
      "hover:bg-secondary",
      "px-4",
      "py-2",
      "text-background",
    ].join(" ")}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);
