import type { PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<{
  disabled?: boolean;
  onClick: () => void;
}>;

export const Button = ({ disabled, onClick, children }: ButtonProps) => (
  <button
    className="border border-black px-4 py-2 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);
