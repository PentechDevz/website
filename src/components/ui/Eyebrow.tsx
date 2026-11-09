import type { ReactNode } from "react";

type EyebrowProps = {
  as?: "p" | "h2";
  id?: string;
  className?: string;
  children: ReactNode;
};

/** Small uppercase label that opens a section */
export function Eyebrow({ as: Tag = "p", id, className = "", children }: EyebrowProps) {
  return (
    <Tag id={id} className={`text-[0.95rem] tracking-[0.2em] uppercase text-muted ${className}`}>
      {children}
    </Tag>
  );
}
