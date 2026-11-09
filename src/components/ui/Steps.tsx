import { pad } from "../../lib/format";

type Step = { title: string; text: string };

/** Numbered process steps laid out in columns */
export function Steps({ items }: { items: Step[] }) {
  const cols = items.length === 3 ? "grid-cols-3" : "grid-cols-5 max-lg:grid-cols-2 max-lg:gap-y-12";

  return (
    <ol className={`mt-[clamp(64px,12vh,140px)] grid gap-8 max-md:grid-cols-1 max-md:gap-y-10 ${cols}`}>
      {items.map((step, i) => (
        <li key={step.title} className="border-t border-cream/25 pt-5 transition-colors duration-300 hover:border-cream">
          <span className="block text-[clamp(2rem,4vw,3.5rem)] leading-none tracking-[-0.02em] text-fade">{pad(i + 1)}</span>
          <h3 className="mt-6 text-[clamp(1.15rem,1.6vw,1.4rem)] text-cream">{step.title}</h3>
          <p className="mt-3 text-[0.95rem] leading-[1.55] text-muted">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
