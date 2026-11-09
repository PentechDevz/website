import { useState, type ReactNode } from "react";
import { ADDONS, BASES, DEAL_OPTIONS, MAX_PAGES, PAGE_PRICE } from "../../../data/packages";
import { clamp, formatRand } from "../../../lib/format";
import { savePackage } from "../../../lib/package";
import { Fieldset } from "../../forms/Fieldset";
import { OptionCard } from "../../forms/OptionCard";
import { PillLink } from "../../ui/PillLink";

const toPages = (text: string) => clamp(Math.round(Number(text) || 0), 0, MAX_PAGES);
const row = "flex justify-between gap-4 py-2.5 text-[0.95rem] leading-[1.4]";
const ruledRow = `${row} border-t border-ink/12`;
const summaryLabel = "text-xs tracking-[0.2em] text-stone uppercase";

type PackageBuilderProps = { deal: string; onDealChange: (deal: string) => void };

/** Live estimate from the chosen starting point, add-ons and deal */
export function PackageBuilder({ deal, onDealChange }: PackageBuilderProps) {
  const [base, setBase] = useState(BASES[0].value);
  const [pagesText, setPagesText] = useState("0");
  const [addons, setAddons] = useState<string[]>([]);

  const pages = toPages(pagesText);
  const baseOption = BASES.find((b) => b.value === base)!;
  const dealOption = DEAL_OPTIONS.find((d) => d.value === deal)!;
  const lines = [
    { label: baseOption.label, price: baseOption.price },
    ...(pages > 0 ? [{ label: `${pages} extra page${pages > 1 ? "s" : ""}`, price: pages * PAGE_PRICE }] : []),
    ...ADDONS.filter((addon) => addons.includes(addon.label)),
  ];
  const subtotal = lines.reduce((sum, line) => sum + line.price, 0);
  const discount = Math.round(subtotal * dealOption.discount);
  const total = subtotal - discount;

  const toggleAddon = (label: string) =>
    setAddons((current) => (current.includes(label) ? current.filter((l) => l !== label) : [...current, label]));
  const step = (by: number) => setPagesText(String(clamp(pages + by, 0, MAX_PAGES)));

  // "Send this to us" carries the estimate over to the contact form
  const sendToContact = () =>
    savePackage({
      name: "Custom package",
      price: `Estimated ${formatRand(total)}`,
      need: "Website",
      lines: [
        ...lines.map((line) => `${line.label}: ${formatRand(line.price)}`),
        ...(discount > 0 ? [`${dealOption.label}: −${formatRand(discount)}`] : []),
      ],
    });

  return (
    <div className="mt-[clamp(64px,12vh,140px)] grid grid-cols-3 items-start gap-8 max-lg:grid-cols-1">
      <form
        aria-label="Package builder"
        onSubmit={(e) => e.preventDefault()}
        className="col-[1/3] flex flex-col gap-[clamp(48px,8vh,80px)] max-lg:col-1"
      >
        <Fieldset num="01" legend="Choose a starting point">
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
            {BASES.map((option) => (
              <OptionCard
                key={option.value}
                name="base"
                value={option.value}
                checked={base === option.value}
                onSelect={setBase}
                title={option.label}
                desc={option.desc}
                price={formatRand(option.price)}
              />
            ))}
          </div>
        </Fieldset>

        <Fieldset num="02" legend="Add what you need">
          <div className="border-b border-cream/12">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-t border-cream/12 py-4">
              <AddonInfo id="pages-label" name="Extra pages" desc={`Case studies, an about page or a project gallery. R${PAGE_PRICE} each.`} />
              <span className="flex items-center rounded-full border border-cream/40">
                <StepperButton label="Remove a page" onClick={() => step(-1)}>
                  &minus;
                </StepperButton>
                <input
                  type="number"
                  name="pages"
                  min="0"
                  max={MAX_PAGES}
                  value={pagesText}
                  aria-labelledby="pages-label"
                  onChange={(e) => setPagesText(e.target.value)}
                  onBlur={() => setPagesText(String(pages))}
                  className="w-9 bg-transparent text-center text-base text-cream [appearance:textfield] focus-visible:rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <StepperButton label="Add a page" onClick={() => step(1)}>
                  +
                </StepperButton>
              </span>
            </div>

            {ADDONS.map((addon) => {
              const checked = addons.includes(addon.label);
              return (
                <label
                  key={addon.label}
                  className="group/add relative grid cursor-pointer grid-cols-[22px_minmax(0,1fr)_auto] items-center gap-4 border-t border-cream/12 py-4"
                >
                  <input
                    type="checkbox"
                    name="addon"
                    checked={checked}
                    onChange={() => toggleAddon(addon.label)}
                    className="peer pointer-events-none absolute opacity-0"
                  />
                  <span
                    aria-hidden="true"
                    className={`relative size-[22px] rounded border transition-colors duration-200 after:absolute after:top-[3px] after:left-[7px] after:h-2.5 after:w-[5px] after:rotate-45 after:border-r-2 after:border-b-2 after:border-ink after:transition-transform after:duration-250 after:ease-smooth peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-cream ${
                      checked ? "border-cream bg-cream after:scale-100" : "border-cream/40 group-hover/add:border-cream after:scale-0"
                    }`}
                  />
                  <AddonInfo name={addon.label} desc={addon.desc} />
                  <span className="text-base text-cream">{formatRand(addon.price)}</span>
                </label>
              );
            })}
          </div>
        </Fieldset>

        <Fieldset num="03" legend="Apply a deal">
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
            {DEAL_OPTIONS.map((option) => (
              <OptionCard
                key={option.value}
                name="deal"
                value={option.value}
                checked={deal === option.value}
                onSelect={onDealChange}
                title={option.name}
                desc={option.desc}
                price={option.tag}
              />
            ))}
          </div>
        </Fieldset>
      </form>

      {/* Running total, in the same cream as the recommended price card */}
      <aside aria-labelledby="summary-heading" className="sticky top-8 rounded bg-cream p-8 text-ink max-lg:static max-md:p-6">
        <p id="summary-heading" className={summaryLabel}>
          Your package
        </p>
        <ul className="mt-4">
          {lines.map((line) => (
            <li key={line.label} className={ruledRow}>
              <span>{line.label}</span>
              <span>{formatRand(line.price)}</span>
            </li>
          ))}
        </ul>
        <dl className="mb-7 border-t border-ink">
          <div className={row}>
            <dt className="text-stone">Subtotal</dt>
            <dd>{formatRand(subtotal)}</dd>
          </div>
          {discount > 0 && (
            <div className={ruledRow}>
              <dt className="text-stone">{dealOption.label}</dt>
              <dd>&minus;{formatRand(discount)}</dd>
            </div>
          )}
        </dl>
        <p className={summaryLabel}>Estimated total</p>
        <p aria-live="polite" className="mt-2 text-[clamp(2.5rem,4.4vw,4rem)] leading-none tracking-[-0.03em]">
          {formatRand(total)}
        </p>
        <PillLink to="/contact" inverted className="mt-8 w-full" onClick={sendToContact}>
          Send this to us
        </PillLink>
        <p className="mt-4 text-[0.8rem] leading-normal text-stone">
          This is an estimate. We confirm the final price in a fixed quote, and deals need proof of student or graduate status.
        </p>
      </aside>
    </div>
  );
}

function AddonInfo({ id, name, desc }: { id?: string; name: string; desc: string }) {
  return (
    <span className="flex flex-col gap-1">
      <span id={id} className="text-[1.05rem] text-cream">
        {name}
      </span>
      <span className="text-[0.85rem] leading-[1.45] text-muted">{desc}</span>
    </span>
  );
}

function StepperButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="size-10 text-[1.1rem] text-cream hover:text-white focus-visible:rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
    >
      {children}
    </button>
  );
}
