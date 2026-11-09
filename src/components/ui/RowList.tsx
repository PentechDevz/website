import { pad } from "../../lib/format";
import { Tags } from "./Tags";

type Row = { title: string; text: string; tags?: string[] };

type RowListProps = {
  items: Row[];
  as?: "ul" | "ol";
  /** Services get roomier rows and a heading per row */
  variant?: "value" | "service";
};

/** Numbered full-width rows; hovering one dims the rest */
export function RowList({ items, as: List = "ul", variant = "value" }: RowListProps) {
  const service = variant === "service";
  const Title = service ? "h3" : "span";

  return (
    <List className="group/list mt-[clamp(64px,12vh,140px)] border-b border-cream/25">
      {items.map((item, i) => (
        <li
          key={item.title}
          className={`group/row grid grid-cols-[80px_minmax(0,1.2fr)_minmax(0,1fr)] items-baseline gap-x-6 border-t border-cream/25 transition-opacity duration-400 group-hover/list:[&:not(:hover)]:opacity-30 max-md:grid-cols-[40px_minmax(0,1fr)] max-md:gap-x-3 ${
            service ? "py-[clamp(32px,5vh,48px)] max-md:gap-y-4" : "py-[clamp(24px,4vh,40px)] max-md:gap-y-2.5"
          }`}
        >
          <span className="text-[0.9rem] tracking-[0.08em] text-muted">{pad(i + 1)}</span>
          <Title className="text-[clamp(1.75rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-cream transition-transform duration-500 ease-smooth group-hover/row:translate-x-4">
            {item.title}
          </Title>
          <div className="max-md:col-start-2">
            <p className="max-w-[36ch] text-[1.05rem] leading-normal text-muted">{item.text}</p>
            {item.tags && <Tags items={item.tags} />}
          </div>
        </li>
      ))}
    </List>
  );
}
