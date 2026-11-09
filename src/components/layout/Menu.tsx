import type { MouseEvent } from "react";
import { NavLink } from "react-router";
import { MENU_GROUPS } from "../../data/site";
import { pad } from "../../lib/format";

type MenuProps = { open: boolean; onClose: () => void };

// Groups slide up one after another as the menu opens (opacity, slide, then hover colour).
const stagger = (open: boolean, delay: number) => ({ transitionDelay: open ? `${delay}s, ${delay}s, 0s` : "0s" });

/** Full-screen menu overlay */
export function Menu({ open, onClose }: MenuProps) {
  const closeOnLink = (e: MouseEvent) => {
    if ((e.target as Element).closest("a")) onClose();
  };
  const enter = `transition-[opacity,translate,color] duration-[500ms,700ms,300ms] ease-[ease,var(--ease-smooth),ease] motion-reduce:transition-none ${
    open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 motion-reduce:translate-y-0"
  }`;

  return (
    <div
      id="menu"
      inert={!open}
      onClick={closeOnLink}
      className={`fixed inset-0 z-10 flex flex-col overflow-y-auto bg-ink px-8 pt-[92px] pb-8 motion-reduce:transition-none max-md:px-4 max-md:pt-[76px] max-md:pb-6 ${
        open ? "visible opacity-100 [transition:opacity_0.4s_ease]" : "invisible opacity-0 [transition:opacity_0.4s_ease,visibility_0s_linear_0.4s]"
      }`}
    >
      <div className="m-auto w-full max-w-[1100px]">
        {MENU_GROUPS.map((group, g) => (
          <section
            key={group.label}
            style={stagger(open, 0.05 + g * 0.07)}
            className={`relative grid min-h-[clamp(150px,24vh,240px)] grid-cols-3 content-start gap-x-8 overflow-hidden border-b-2 border-cream px-5 pt-5 max-md:grid-cols-2 max-md:gap-x-4 max-md:px-3 max-md:pt-4 ${enter}`}
          >
            <h2 className="relative z-1 col-start-1 row-start-1 text-[clamp(1.25rem,2.4vw,1.75rem)] leading-none text-cream">
              {group.label}
            </h2>
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute bottom-0 left-5 text-[clamp(7rem,28vh,18rem)] leading-[0.8] tracking-[-0.04em] text-fade-deep select-none transition-transform duration-900 ease-smooth motion-reduce:transition-none max-md:left-3 max-md:text-[clamp(5.5rem,22vh,8rem)] ${
                open ? "translate-y-[28%]" : "translate-y-full"
              }`}
            >
              {pad(g + 1)}
            </span>
            <ul className="col-[2/4] row-start-1 grid grid-cols-2 gap-x-8 gap-y-[clamp(12px,3vh,28px)] pb-[clamp(16px,3vh,28px)] max-md:col-2 max-md:grid-cols-1 max-md:pb-4">
              {group.links.map((link, l) => (
                <li key={link.to} className={l === 0 ? "col-start-1 row-start-1" : "col-start-2 row-start-2 max-md:col-start-1"}>
                  <NavLink
                    to={link.to}
                    className="group/link grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-cream focus-visible:outline-2 focus-visible:outline-offset-6 focus-visible:outline-cream"
                  >
                    <span className="text-[clamp(1rem,1.5vw,1.2rem)] leading-[1.2] text-muted">{g * 2 + l + 1}.</span>
                    <span className="text-[clamp(1rem,1.6vw,1.3rem)] leading-[1.2] underline-offset-4 transition-colors duration-200 group-hover/link:text-white group-hover/link:underline group-focus-visible/link:text-white group-focus-visible/link:underline">
                      {link.title}
                    </span>
                    <span className="col-start-2 max-w-[36ch] text-[0.8rem] leading-[1.35] text-muted">{link.desc}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <p
          style={stagger(open, 0.26)}
          className={`mt-[clamp(24px,5vh,56px)] flex flex-wrap justify-between gap-x-8 gap-y-3 px-5 text-[clamp(1.25rem,2.4vw,1.75rem)] text-cream hover:text-muted max-md:px-3 ${enter}`}
        >
          Pentech Devs &bull; 2026
          <NavLink
            to="/contact"
            className="text-cream underline-offset-6 transition-colors duration-200 hover:text-white hover:underline focus-visible:text-white focus-visible:underline focus-visible:outline-2 focus-visible:outline-offset-6 focus-visible:outline-cream aria-[current=page]:text-white aria-[current=page]:underline"
          >
            Contact us <span aria-hidden="true">&rarr;</span>
          </NavLink>
        </p>
      </div>
    </div>
  );
}
