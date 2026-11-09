import type { Ref } from "react";
import { Link, useLocation } from "react-router";
import logo from "../../assets/images/logo-light.png";

type NavProps = {
  menuOpen: boolean;
  onToggleMenu: () => void;
  menuButtonRef: Ref<HTMLButtonElement>;
};

export function Nav({ menuOpen, onToggleMenu, menuButtonRef }: NavProps) {
  const { pathname } = useLocation();
  const bar = "block h-0.5 w-full bg-white transition-transform duration-400 ease-smooth motion-reduce:transition-none";

  return (
    <nav className="absolute inset-x-0 top-0 z-20 grid grid-cols-[1fr_auto_1fr] items-center px-8 py-6 max-md:p-4">
      <button
        ref={menuButtonRef}
        type="button"
        onClick={onToggleMenu}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="menu"
        className="col-start-1 row-start-1 -ml-2.5 flex size-11 flex-col justify-center gap-1.5 justify-self-start p-2.5"
      >
        <span className={`${bar} ${menuOpen ? "translate-y-1 rotate-45" : ""}`} />
        <span className={`${bar} ${menuOpen ? "-translate-y-1 -rotate-45" : ""}`} />
      </button>

      <Link
        to="/"
        className="col-start-2 inline-flex items-center gap-[0.6em] text-2xl tracking-[0.2em] uppercase max-md:text-[0.95rem] max-md:tracking-[0.12em] max-md:whitespace-nowrap"
      >
        <img src={logo} alt="" width="238" height="200" className="h-[1.4em] w-auto" />
        Pentech Devs
      </Link>

      <Link
        to={pathname === "/contact" ? "#enquiry" : "/contact"}
        className="relative col-start-3 row-start-1 justify-self-end py-1.5 text-[0.85rem] tracking-[0.08em] text-cream after:absolute after:bottom-0.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-30 after:bg-current after:transition-transform after:duration-400 after:ease-smooth hover:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream focus-visible:after:scale-x-100"
      >
        Let's talk
      </Link>
    </nav>
  );
}
