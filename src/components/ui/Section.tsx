import type { ComponentProps } from "react";

type SectionProps = ComponentProps<"section"> & {
  /** Sections alternate between pure black and the slightly lighter ink */
  tone?: "black" | "ink";
  /** Drop the side padding, for full-bleed content like the marquee */
  flush?: boolean;
};

export function Section({ tone = "black", flush = false, className = "", ...props }: SectionProps) {
  return (
    <section
      className={`py-[clamp(96px,16vh,180px)] ${flush ? "" : "px-8 max-md:px-4"} ${tone === "ink" ? "bg-ink" : "bg-black"} ${className}`}
      {...props}
    />
  );
}
