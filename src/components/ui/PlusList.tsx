/**
 * Feature list with a "+" before each line, used in price and deal cards.
 * Colours come from the card's --line and --soft variables.
 */
export function PlusList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 border-t border-(--line) py-3 text-[0.95rem] leading-[1.4] before:flex-none before:text-(--soft) before:content-['+']"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
