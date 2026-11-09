import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { RevealWords } from "./RevealWords";

type SectionHeadProps = {
  /** id of the heading, for the section's aria-labelledby */
  id: string;
  eyebrow: string;
  /** Shown after the eyebrow in brackets, e.g. "04" */
  count?: string;
  /** Large statement that lights up word by word */
  intro?: string;
  className?: string;
  /** Replaces the intro in the right-hand columns (e.g. the FAQ list) */
  children?: ReactNode;
};

/** Eyebrow in the first column, a large intro across the other two */
export function SectionHead({ id, eyebrow, count, intro, className = "", children }: SectionHeadProps) {
  return (
    <div className={`grid grid-cols-3 items-start gap-x-8 max-md:grid-cols-1 max-md:gap-y-6 ${className}`}>
      <Eyebrow as="h2" id={id}>
        {eyebrow}
        {count && <span className="text-cream"> ({count})</span>}
      </Eyebrow>
      {intro && (
        <RevealWords
          text={intro}
          className="col-[2/4] max-w-[24ch] text-[clamp(1.75rem,3.6vw,3.5rem)] leading-[1.15] tracking-[-0.01em] text-cream max-md:col-1"
        />
      )}
      {children}
    </div>
  );
}
