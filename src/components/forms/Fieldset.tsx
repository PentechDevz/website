import type { ReactNode } from "react";

type FieldsetProps = { num: string; legend: string; children: ReactNode };

/** A numbered step in the package builder and contact form */
export function Fieldset({ num, legend, children }: FieldsetProps) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-6 flex items-baseline gap-4 text-[clamp(1.4rem,2.2vw,2rem)] text-cream">
        <span className="text-[0.9rem] tracking-[0.08em] text-muted">{num}</span>
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}
