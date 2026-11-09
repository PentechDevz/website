import type { ReactNode } from "react";

type CardProps = { num: string; title: string; children: ReactNode };

/** Numbered column with a cream rule on top, used for tools and pillars */
export function Card({ num, title, children }: CardProps) {
  return (
    <article className="border-t border-cream pt-6">
      <span className="text-[0.9rem] tracking-[0.08em] text-muted">{num}</span>
      <h3 className="mt-3 mb-7 text-[clamp(1.4rem,2vw,1.75rem)] text-cream">{title}</h3>
      {children}
    </article>
  );
}
