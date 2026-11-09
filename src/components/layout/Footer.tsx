import type { ReactNode } from "react";
import { Link } from "react-router";
import logo from "../../assets/images/logo-light.png";
import { EMAIL, SOCIALS, type NavItem } from "../../data/site";
import { Eyebrow } from "../ui/Eyebrow";

const linkClass =
  "text-cream transition-[color,padding] duration-400 ease-smooth hover:pl-2 hover:text-white focus-visible:pl-2 focus-visible:text-white";

/** Site footer; the "Navigate" column changes per page */
export function Footer({ links }: { links: NavItem[] }) {
  return (
    <footer className="border-t border-cream/25 bg-ink px-8 pt-[clamp(64px,10vh,112px)] pb-7 max-md:px-4">
      <div className="grid grid-cols-[2fr_repeat(3,minmax(0,1fr))] gap-8 max-lg:grid-cols-3 max-md:grid-cols-2 max-md:gap-y-10">
        <div className="max-lg:col-span-full">
          <img src={logo} alt="Pentech Devs logo" width="238" height="200" className="mb-6 block h-14 w-auto" />
          <p className="text-[clamp(1.25rem,2vw,1.6rem)] leading-[1.3] text-cream">
            A creative collective.
            <br />
            Built together, step by step.
          </p>
        </div>

        <FooterColumn label="Navigate">
          {links.map((link) => (
            <li key={link.label}>
              <Link to={link.to} className={linkClass}>
                {link.label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn label="Follow">
          {SOCIALS.map((social) => (
            <li key={social.label}>
              <a href={social.href} target="_blank" rel="noopener" className={linkClass}>
                {social.label}
              </a>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn label="Get in touch">
          <li>
            <a href={`mailto:${EMAIL}`} className={linkClass}>
              {EMAIL}
            </a>
          </li>
        </FooterColumn>
      </div>

      {/* Giant brand name, cut off by the line beneath it */}
      <div aria-hidden="true" className="mt-[clamp(64px,12vh,140px)] overflow-hidden border-b border-cream text-center">
        <span className="block translate-y-[18%] bg-linear-to-b from-cream from-0% via-cream via-35% to-stone to-80% bg-clip-text text-[8.6vw] leading-[0.8] tracking-[-0.02em] whitespace-nowrap text-transparent uppercase">
          Pentech Devs
        </span>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 text-[0.8rem] tracking-[0.08em] text-muted max-md:flex-col-reverse max-md:items-start">
        <p>&copy; 2026 Pentech Devs. All rights reserved.</p>
        <Link to="#top" className="group/back text-cream">
          Back to top{" "}
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-400 ease-smooth group-hover/back:-translate-y-1 group-focus-visible/back:-translate-y-1"
          >
            &uarr;
          </span>
        </Link>
      </div>
    </footer>
  );
}

function FooterColumn({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <Eyebrow>{label}</Eyebrow>
      <ul className="mt-5 flex flex-col gap-2.5 text-muted">{children}</ul>
    </div>
  );
}
