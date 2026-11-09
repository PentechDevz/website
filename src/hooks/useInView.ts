import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../lib/media";

/** True once the element has scrolled into view (and stays true). Starts true when motion is reduced. */
export function useInView<T extends Element>(rootMargin = "0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(() => prefersReducedMotion() || !("IntersectionObserver" in window));

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { rootMargin });

    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, rootMargin]);

  return [ref, inView] as const;
}
