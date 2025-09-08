import type { PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<{
  disabled?: boolean;
  onClick: () => void;
}>;

export const Button = ({ disabled, onClick, children }: ButtonProps) => (
  <button
    className="bg-primary text-background border-black px-4 py-2 hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-primary"
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);
