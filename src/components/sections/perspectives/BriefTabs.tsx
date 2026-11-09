import { useRef, useState, type KeyboardEvent } from "react";
import { TEAM } from "../../../data/team";
import { pad } from "../../../lib/format";
import { Label } from "../../ui/Label";

/** Tabs showing where each member would start the same brief */
export function BriefTabs() {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: KeyboardEvent, i: number) {
    const keys: Record<string, number> = {
      ArrowDown: i + 1,
      ArrowRight: i + 1,
      ArrowUp: i - 1,
      ArrowLeft: i - 1,
      Home: 0,
      End: TEAM.length - 1,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const next = (keys[e.key] + TEAM.length) % TEAM.length;
    setSelected(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="mt-[clamp(64px,12vh,140px)] grid grid-cols-3 items-start gap-x-8 max-md:grid-cols-1">
      <div>
        <Label>The brief</Label>
        <p className="mt-4 max-w-[30ch] text-[1.25rem] leading-[1.4] text-cream">
          &ldquo;A community clinic wants patients to book appointments online, instead of queuing outside before sunrise.&rdquo;
        </p>

        <div
          role="tablist"
          aria-label="Team members"
          aria-orientation="vertical"
          className="mt-10 flex flex-col border-b border-cream/25 max-md:grid max-md:grid-cols-2 max-md:gap-x-4 max-md:border-b-0"
        >
          {TEAM.map((person, i) => {
            const isSelected = i === selected;
            return (
              <button
                key={person.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${person.id}`}
                aria-controls={`panel-${person.id}`}
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setSelected(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 border-t py-[18px] text-left transition-colors duration-300 hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream ${
                  isSelected ? "border-cream/25 text-cream max-md:border-cream" : "border-cream/25 text-muted"
                }`}
              >
                <span className="text-[0.8rem] leading-[1.9] tracking-[0.08em]">{pad(i + 1)}</span>
                <span
                  className={`text-[1.25rem] transition-transform duration-400 ease-smooth ${isSelected ? "translate-x-3 max-md:translate-x-0" : ""}`}
                >
                  {person.name}
                </span>
                <span className="col-start-2 text-[0.8rem]">{person.role}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Panels stay mounted; un-hiding one restarts its rise animation */}
      {TEAM.map((person, i) => (
        <div
          key={person.id}
          role="tabpanel"
          id={`panel-${person.id}`}
          aria-labelledby={`tab-${person.id}`}
          tabIndex={0}
          hidden={i !== selected}
          className="col-[2/4] rise-in [--rise-duration:0.7s] [--rise-y:16px] focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-cream max-md:col-1 max-md:mt-12"
        >
          <Label>First move</Label>
          <h3 className="mt-4 max-w-[16ch] text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.02em] text-cream">
            {person.brief.title}
          </h3>
          <p className="mt-7 max-w-[40ch] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-normal text-muted">{person.brief.text}</p>
          <p className="mt-10 flex max-w-[40ch] flex-col gap-2 border-t border-cream pt-5 text-[1.05rem] leading-[1.4] text-cream">
            <Label as="span">What you'd see first</Label>
            {person.brief.output}
          </p>
        </div>
      ))}
    </div>
  );
}
