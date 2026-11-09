import { useState } from "react";
import { TESTIMONIALS } from "../../../data/home";
import { pad } from "../../../lib/format";
import { Eyebrow } from "../../ui/Eyebrow";

const arrowButton =
  "grid size-12 place-items-center rounded-full border border-cream text-[1.1rem] text-cream transition-colors duration-300 hover:bg-cream hover:text-ink focus-visible:bg-cream focus-visible:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream";

/** Steps through client quotes with previous/next buttons */
export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const show = (next: number) => setCurrent((next + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <div className="mt-[clamp(80px,14vh,160px)] grid grid-cols-3 gap-x-8 max-md:grid-cols-1">
      <div className="max-md:mt-10">
        <Eyebrow className="max-md:hidden">What they say</Eyebrow>
        <div className="mt-8 flex items-center gap-3">
          <span className="min-w-18 text-[0.9rem] tracking-[0.08em] text-muted">
            <span className="text-cream">{pad(current + 1)}</span> / {pad(TESTIMONIALS.length)}
          </span>
          <button type="button" aria-label="Previous testimonial" onClick={() => show(current - 1)} className={arrowButton}>
            &larr;
          </button>
          <button type="button" aria-label="Next testimonial" onClick={() => show(current + 1)} className={arrowButton}>
            &rarr;
          </button>
        </div>
      </div>

      {/* All quotes share one grid cell, so the box keeps the height of the longest */}
      <div aria-live="polite" className="col-[2/4] grid max-md:col-1 max-md:row-start-1">
        {TESTIMONIALS.map((item, i) => {
          const active = i === current;
          return (
            <blockquote
              key={item.by}
              aria-hidden={!active}
              className={`[grid-area:1/1] motion-reduce:[transition:none] ${
                active
                  ? "visible translate-y-0 opacity-100 [transition:opacity_0.5s_ease_0.15s,translate_0.7s_var(--ease-smooth)_0.15s]"
                  : "invisible translate-y-4 opacity-0 [transition:opacity_0.5s_ease,translate_0.7s_var(--ease-smooth),visibility_0s_linear_0.5s]"
              }`}
            >
              <p className="max-w-[32ch] text-[clamp(1.5rem,3vw,2.75rem)] leading-[1.2] tracking-[-0.01em] text-cream">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-7 text-[0.9rem] tracking-[0.08em] text-muted before:mr-3 before:inline-block before:h-px before:w-8 before:bg-muted before:align-middle">
                {item.by}
              </footer>
            </blockquote>
          );
        })}
      </div>
    </div>
  );
}
