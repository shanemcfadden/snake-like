import type { PropsWithChildren } from "react";

export const Container = ({ children }: PropsWithChildren) => (
  <div className="max-w-xs mx-auto">{children}</div>
);
