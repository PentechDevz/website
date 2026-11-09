import type { ComponentProps, ReactNode } from "react";
import { Intro } from "./Intro";

type PageHeaderProps = ComponentProps<typeof Intro> & { children?: ReactNode };

/** Header for every page except home; its children rise in one after another */
export function PageHeader({ children, ...intro }: PageHeaderProps) {
  return (
    <header
      id="top"
      className="px-8 pt-[clamp(160px,28vh,280px)] pb-[clamp(64px,10vh,120px)] text-cream max-md:px-4 *:rise-in [&>:nth-child(2)]:[--rise-delay:0.1s] [&>:nth-child(3)]:[--rise-delay:0.2s] [&>:nth-child(4)]:[--rise-delay:0.3s]"
    >
      <Intro {...intro} />
      {children}
    </header>
  );
}
