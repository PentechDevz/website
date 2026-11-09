type OptionCardProps = {
  name: string;
  value: string;
  checked: boolean;
  onSelect: (value: string) => void;
  title: string;
  desc: string;
  price?: string;
  required?: boolean;
};

/** A radio button drawn as a selectable card. The real radio stays for keyboards and screen readers. */
export function OptionCard({ name, value, checked, onSelect, title, desc, price, required }: OptionCardProps) {
  return (
    <label className="group/opt relative flex cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        required={required}
        onChange={() => onSelect(value)}
        className="peer pointer-events-none absolute opacity-0"
      />
      <span
        className={`flex flex-1 flex-col gap-2 rounded border p-5 transition-colors duration-300 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-cream ${
          checked ? "border-cream bg-cream/8" : "border-cream/25 group-hover/opt:border-cream/60"
        }`}
      >
        <span className="text-[1.15rem] text-cream">{title}</span>
        <span className="flex-1 text-[0.85rem] leading-[1.45] text-muted">{desc}</span>
        {price && <span className="mt-2 text-[1.05rem] text-cream">{price}</span>}
      </span>
    </label>
  );
}
