import { Link } from "react-router";

type NextPageLinkProps = { to: string; label: string; title: string };

/** Big "next page" link at the end of a page's last section */
export function NextPageLink({ to, label, title }: NextPageLinkProps) {
  return (
    <Link
      to={to}
      className="group/next mt-[clamp(80px,14vh,160px)] inline-flex flex-col gap-3 text-cream focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-cream"
    >
      <span className="text-[0.8rem] tracking-[0.2em] uppercase text-muted">{label}</span>
      <span className="text-[clamp(2.25rem,7vw,6rem)] leading-none tracking-[-0.02em]">
        {title}{" "}
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-500 ease-smooth group-hover/next:translate-x-4 group-focus-visible/next:translate-x-4"
        >
          &rarr;
        </span>
      </span>
    </Link>
  );
}
