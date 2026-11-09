import { Link } from "react-router";
import { pad } from "../../lib/format";

type IndexItem = { id: string; name: string; role: string };

/** Numbered jump links to the profiles or case studies further down the page */
export function IndexList({ items, columns }: { items: IndexItem[]; columns: 4 | 5 }) {
  return (
    <ol
      className={`mt-[clamp(64px,12vh,140px)] grid gap-8 max-lg:grid-cols-2 max-lg:gap-y-6 ${columns === 5 ? "grid-cols-5" : "grid-cols-4"}`}
    >
      {items.map((item, i) => (
        <li key={item.id}>
          <Link
            to={`#${item.id}`}
            className="group/idx grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 border-t border-cream/25 pt-5 text-cream transition-colors duration-300 hover:border-cream focus-visible:border-cream focus-visible:outline-2 focus-visible:outline-offset-6 focus-visible:outline-cream"
          >
            <span className="text-[0.9rem] leading-[1.7] tracking-[0.08em] text-muted">{pad(i + 1)}</span>
            <span className="text-[clamp(1.25rem,2vw,1.6rem)] transition-transform duration-400 ease-smooth group-hover/idx:translate-x-2 group-focus-visible/idx:translate-x-2">
              {item.name}
            </span>
            <span className="col-start-2 text-[0.8rem] text-muted">{item.role}</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
