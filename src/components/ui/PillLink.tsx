import { Link, type LinkProps } from "react-router";
import { pillClass } from "./pill";

type PillLinkProps = LinkProps & {
  inverted?: boolean;
  /** Nudge the arrow right on hover */
  slideArrow?: boolean;
};

export function PillLink({ inverted, slideArrow, className = "", children, ...props }: PillLinkProps) {
  return (
    <Link className={`${pillClass(inverted)} ${className}`} {...props}>
      {children}
      <span
        aria-hidden="true"
        className={slideArrow ? "transition-transform duration-300 ease-smooth group-hover/pill:translate-x-1 group-focus-visible/pill:translate-x-1" : ""}
      >
        &rarr;
      </span>
    </Link>
  );
}
