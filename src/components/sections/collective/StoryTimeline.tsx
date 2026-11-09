import { useRef, useState } from "react";
import { CHAPTERS } from "../../../data/collective";
import { useScrollFrame } from "../../../hooks/useScrollFrame";
import { clamp, pad } from "../../../lib/format";

/** The timeline fills and each chapter lights up as you scroll past it */
export function StoryTimeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const [reached, setReached] = useState(0);

  useScrollFrame(() => {
    const list = listRef.current;
    if (!list) return;
    const mark = window.innerHeight * 0.6;
    const rect = list.getBoundingClientRect();

    list.style.setProperty("--progress", String(clamp((mark - rect.top) / rect.height, 0, 1)));
    setReached([...list.children].filter((chapter) => chapter.getBoundingClientRect().top < mark).length);
  });

  return (
    <ol
      ref={listRef}
      className="relative mt-[clamp(64px,12vh,140px)] before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-cream/25 after:absolute after:inset-y-0 after:left-0 after:w-px after:origin-top after:bg-cream after:[transform:scaleY(var(--progress,1))]"
    >
      {CHAPTERS.map((chapter, i) => {
        const isReached = i < reached;
        return (
          <li
            key={chapter.title}
            className={`relative grid grid-cols-3 gap-x-8 pb-[clamp(64px,12vh,140px)] before:absolute before:top-2 before:-left-[5px] before:z-1 before:size-[11px] before:rounded-full before:border before:transition-colors before:duration-300 last:pb-0 max-md:grid-cols-1 max-md:gap-y-4 ${
              isReached ? "before:border-cream before:bg-cream" : "before:border-muted before:bg-black"
            }`}
          >
            <div className="flex flex-col gap-2.5 pl-8 max-md:pl-6">
              <span className="text-[clamp(2rem,4vw,3.5rem)] leading-none tracking-[-0.02em] text-fade">{pad(i + 1)}</span>
              <span className="text-[0.8rem] tracking-[0.2em] text-muted uppercase">{chapter.when}</span>
            </div>
            <div className={`col-[2/4] transition-opacity duration-500 max-md:col-1 max-md:pl-6 ${isReached ? "" : "opacity-30"}`}>
              <h3 className="max-w-[22ch] text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.1] tracking-[-0.01em] text-cream">
                {chapter.title}
              </h3>
              <p className="mt-5 max-w-[52ch] text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.6] text-muted">{chapter.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
