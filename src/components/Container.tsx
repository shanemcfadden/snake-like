import type { PropsWithChildren } from "react";

export const Container = ({ children }: PropsWithChildren) => (
  <div className="max-w-sm mx-auto">{children}</div>
);
