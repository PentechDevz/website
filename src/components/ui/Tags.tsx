/** Row of rounded outline tags, e.g. tools or tech stack */
export function Tags({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2.5">
      {items.map((item) => (
        <li key={item} className="rounded-full border border-cream/35 px-4 py-2 text-[0.85rem] text-cream">
          {item}
        </li>
      ))}
    </ul>
  );
}
