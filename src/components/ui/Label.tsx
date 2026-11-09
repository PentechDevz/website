import type { ReactNode } from "react";

type LabelProps = {
  as?: "p" | "h4" | "dt" | "span";
  id?: string;
  children: ReactNode;
};

/** Smaller uppercase label used inside cards and profiles */
export function Label({ as: Tag = "p", id, children }: LabelProps) {
  return (
    <Tag id={id} className="block text-[0.8rem] tracking-[0.2em] uppercase text-muted">
      {children}
    </Tag>
  );
}
