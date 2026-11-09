import type { ReactNode } from "react";
import type { NavItem } from "../../data/site";
import { Footer } from "./Footer";

type PageProps = {
  /** Shown before "— Pentech Devs" in the browser tab; omit on the home page */
  title?: string;
  footerLinks: NavItem[];
  children: ReactNode;
};

/** Wraps a page's header and main content with its tab title and footer */
export function Page({ title, footerLinks, children }: PageProps) {
  return (
    <>
      <title>{title ? `${title} — Pentech Devs` : "Pentech Devs"}</title>
      {children}
      <Footer links={footerLinks} />
    </>
  );
}
