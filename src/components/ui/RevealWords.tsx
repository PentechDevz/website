import { Fragment, useRef, useState } from "react";
import { useScrollFrame } from "../../hooks/useScrollFrame";
import { clamp } from "../../lib/format";
import { prefersReducedMotion } from "../../lib/media";

type RevealWordsProps = { text: string; className?: string };

/** A paragraph whose words light up one by one as it scrolls into view. */
export function RevealWords({ text, className = "" }: RevealWordsProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [animate] = useState(() => !prefersReducedMotion());

  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const vh = window.innerHeight;
    // Starts when the paragraph reaches 85% down the screen, finishes at 35%.
    const progress = clamp((vh * 0.85 - el.getBoundingClientRect().top) / (vh * 0.5), 0, 1);
    const lit = progress * el.children.length;

    [...el.children].forEach((word, i) => {
      (word as HTMLElement).style.opacity = String(0.15 + clamp(lit - i, 0, 1) * 0.85);
    });
  }, animate);

  if (!animate) return <p className={className}>{text}</p>;

  const words = text.trim().split(/\s+/);
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="opacity-15 transition-opacity duration-200 ease-linear">{word}</span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </p>
  );
}
