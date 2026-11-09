import type { Tier } from "../../../data/pricing";
import { pad } from "../../../lib/format";
import { savePackage } from "../../../lib/package";
import { PillLink } from "../../ui/PillLink";
import { PlusList } from "../../ui/PlusList";

/** A price package. The recommended one flips to cream so it stands out. */
export function TierCard({ tier, index }: { tier: Tier; index: number }) {
  const featured = Boolean(tier.featured);

  return (
    <article
      aria-labelledby={tier.id}
      className={`flex flex-col rounded border p-8 transition-[border-color,translate] duration-[300ms,500ms] ease-[ease,var(--ease-smooth)] hover:-translate-y-1.5 hover:border-cream max-md:p-6 ${
        featured
          ? "border-cream bg-cream text-ink [--line:rgb(17_17_17/0.15)] [--soft:var(--color-stone)]"
          : "border-(--line) text-cream [--line:rgb(244_241_234/0.25)] [--soft:var(--color-muted)]"
      }`}
    >
      <div className="flex min-h-7 items-center justify-between gap-3">
        <span className="text-[0.9rem] tracking-[0.08em] text-(--soft)">{pad(index + 1)}</span>
        {tier.badge && <span className="rounded-full border border-current px-3 py-1 text-xs tracking-[0.08em]">{tier.badge}</span>}
      </div>
      <h3 id={tier.id} className="mt-6 text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.1] tracking-[-0.01em]">
        {tier.name}
      </h3>
      <p className="mt-2.5 min-h-[3em] text-[0.95rem] leading-normal text-(--soft)">{tier.for}</p>
      <p className="mt-8 border-t border-(--line) pt-6">
        <span className="block text-xs tracking-[0.2em] text-(--soft) uppercase">From</span>
        <span className="mt-2 block text-[clamp(2.5rem,4.4vw,4rem)] leading-none tracking-[-0.03em]">{tier.price}</span>
      </p>
      <p className="mt-3 text-[0.9rem] text-(--soft)">{tier.time}</p>
      <PlusList items={tier.items} className="mt-8 flex-1" />
      <PillLink
        to="/contact"
        inverted={featured}
        className="mt-8"
        onClick={() => savePackage({ name: `${tier.name} package`, price: `From ${tier.price}`, need: tier.need, lines: [] })}
      >
        {tier.cta}
      </PillLink>
    </article>
  );
}
