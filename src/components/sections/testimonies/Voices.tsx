import { useState } from "react";
import { VOICE_FILTERS, VOICES } from "../../../data/testimonies";
import { pad } from "../../../lib/format";

const countFor = (filter: string) => VOICES.filter((voice) => filter === "all" || voice.type === filter).length;

/** Client quotes, filterable by the kind of work we did for them */
export function Voices() {
  const [filter, setFilter] = useState("all");
  // Only announced once someone has used a filter
  const [status, setStatus] = useState("");

  function pick(value: string) {
    setFilter(value);
    setStatus(`Showing ${countFor(value)} of ${VOICES.length}`);
  }

  return (
    <>
      <div className="mt-[clamp(64px,12vh,140px)] flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <div role="group" aria-label="Filter testimonies by type of work" className="flex flex-wrap gap-2.5">
          {VOICE_FILTERS.map((option) => {
            const pressed = option.value === filter;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={pressed}
                onClick={() => pick(option.value)}
                className={`rounded-full border px-5 py-2.5 text-[0.9rem] transition-[background-color,color,border-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream motion-reduce:transition-none ${
                  pressed ? "border-cream bg-cream text-ink" : "border-cream/35 text-cream hover:border-cream"
                }`}
              >
                {option.label}{" "}
                <span className={`transition-colors duration-300 ${pressed ? "text-stone" : "text-muted"}`}>
                  ({pad(countFor(option.value))})
                </span>
              </button>
            );
          })}
        </div>
        <p role="status" aria-live="polite" className="text-[0.9rem] tracking-[0.08em] text-muted">
          {status}
        </p>
      </div>

      <ul className="group/list mt-12 grid grid-cols-2 gap-x-8 max-md:grid-cols-1">
        {VOICES.map((voice) => (
          <li
            key={voice.client}
            hidden={filter !== "all" && voice.type !== filter}
            className="group/voice border-t border-cream/25 py-[clamp(32px,5vh,48px)] transition-opacity duration-400 group-hover/list:[&:not(:hover)]:opacity-30 motion-reduce:transition-none"
          >
            <figure className="flex h-full flex-col">
              <blockquote>
                <p className="max-w-[30ch] text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.25] tracking-[-0.01em] text-cream transition-transform duration-500 ease-smooth group-hover/voice:translate-x-3 motion-reduce:transition-none">
                  &ldquo;{voice.quote}&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-auto grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 pt-8">
                <span className="text-[1.05rem] text-cream">{voice.client}</span>
                <span className="row-start-2 text-[0.85rem] text-muted">{voice.role}</span>
                <span className="col-start-2 row-[1/3] self-end text-xs tracking-[0.08em] text-stone">{voice.tag}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </>
  );
}
