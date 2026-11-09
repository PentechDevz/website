import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { Cursor } from "./Cursor";
import { Menu } from "./Menu";
import { Nav } from "./Nav";
import { SiteLoader } from "./SiteLoader";

/** Shell shared by every page: nav, menu overlay, intro loader and custom cursor */
export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  useScrollOnNavigate();

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <SiteLoader />
      <Nav menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((open) => !open)} menuButtonRef={menuButtonRef} />
      <Outlet />
      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <Cursor />
    </>
  );
}

/** Jump to the top of a new page, or to the #section in the URL. Within the same page it scrolls smoothly. */
function useScrollOnNavigate() {
  const { pathname, hash, key } = useLocation();
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    const behavior = previousPath.current === pathname ? "smooth" : "instant";
    previousPath.current = pathname;

    const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
    if (target) target.scrollIntoView({ behavior });
    else window.scrollTo({ top: 0, behavior });
  }, [pathname, hash, key]);
}
