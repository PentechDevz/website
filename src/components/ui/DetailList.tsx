import { Label } from "./Label";

type Detail = { label: string; text: string };

/** Three labelled columns, e.g. problem / what we built / outcome */
export function DetailList({ items }: { items: Detail[] }) {
  return (
    <dl className="mt-[clamp(48px,8vh,88px)] grid grid-cols-3 gap-8 max-lg:grid-cols-1">
      {items.map((item) => (
        <div key={item.label} className="border-t border-cream/25 pt-5">
          <Label as="dt">{item.label}</Label>
          <dd className="mt-3.5 max-w-[32ch] text-[1.05rem] leading-[1.55] text-muted">{item.text}</dd>
        </div>
      ))}
    </dl>
  );
}
