import { useEffect, useEffectEvent } from "react";

/** Runs `update` once on mount, then at most once per frame while scrolling, and on resize. */
export function useScrollFrame(update: () => void, enabled = true) {
  const onFrame = useEffectEvent(update);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        onFrame();
      });
    };
    const onResize = () => onFrame();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onFrame();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [enabled]);
}
