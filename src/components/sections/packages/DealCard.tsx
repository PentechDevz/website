import type { DEALS } from "../../../data/packages";
import { PillLink } from "../../ui/PillLink";
import { PlusList } from "../../ui/PlusList";

type DealCardProps = { deal: (typeof DEALS)[number]; onPick: (deal: string) => void };

/** A student or graduate discount; its button pre-selects the deal in the builder below */
export function DealCard({ deal, onPick }: DealCardProps) {
  return (
    <article
      aria-labelledby={`deal-${deal.value}`}
      className="flex flex-col rounded border border-cream/25 p-[clamp(24px,3vw,40px)] text-cream transition-colors duration-300 [--line:rgb(244_241_234/0.25)] [--soft:var(--color-muted)] hover:border-cream"
    >
      <p className="flex items-baseline gap-3 bg-linear-to-b from-cream from-30% to-stone bg-clip-text text-[clamp(4rem,9vw,8rem)] leading-[0.9] tracking-[-0.04em] text-transparent">
        {deal.amount}
        <span className="text-base tracking-[0.2em] text-muted uppercase">off</span>
      </p>
      <h3 id={`deal-${deal.value}`} className="mt-8 text-[clamp(1.5rem,2.4vw,2.25rem)] tracking-[-0.01em]">
        {deal.name}
      </h3>
      <p className="mt-2.5 max-w-[40ch] text-[1.05rem] leading-normal text-muted">{deal.text}</p>
      <PlusList items={deal.items} className="mt-7 flex-1" />
      <PillLink to="#builder" className="mt-8 self-start" onClick={() => onPick(deal.value)}>
        {deal.cta}
      </PillLink>
    </article>
  );
}
