import { useEffect, useRef, useState } from "react";
import { hasFinePointer, prefersReducedMotion } from "../../lib/media";

/**
 * Custom cursor: a dot that tracks the mouse and a ring that trails behind it.
 * Only on devices with a precise pointer (mouse/trackpad).
 */
export function Cursor() {
  const [enabled] = useState(hasFinePointer);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const dotRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const reduceMotion = prefersReducedMotion();
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...mouse };
    let ringScale = 1;
    let hover = false;
    let pressed = false;
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onOver = (e: MouseEvent) => {
      hover = e.target instanceof Element && Boolean(e.target.closest("a, button"));
      setHovering(hover);
    };
    const onDown = () => (pressed = true);
    const onUp = () => (pressed = false);

    function render() {
      const follow = reduceMotion ? 1 : 0.18;
      const targetScale = pressed ? 0.8 : hover ? 1.8 : 1;

      ringPos.x += (mouse.x - ringPos.x) * follow;
      ringPos.y += (mouse.y - ringPos.y) * follow;
      ringScale += (targetScale - ringScale) * (reduceMotion ? 1 : 0.2);

      dotRef.current!.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      ringRef.current!.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) scale(${ringScale})`;
      frame = requestAnimationFrame(render);
    }

    document.body.classList.add("has-cursor");
    document.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      document.body.classList.remove("has-cursor");
      document.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  // Over links and buttons the ring fills in and inverts what's beneath it
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-100 mix-blend-difference">
      <span
        ref={ringRef}
        className={`absolute top-0 left-0 -mt-5 -ml-5 size-10 rounded-full border border-white transition-[opacity,background-color] duration-300 will-change-transform ${
          visible ? "opacity-100" : "opacity-0"
        } ${hovering ? "bg-white" : ""}`}
      />
      <span
        ref={dotRef}
        className={`absolute top-0 left-0 -mt-[3px] -ml-[3px] size-1.5 rounded-full bg-white transition-opacity duration-300 will-change-transform ${
          visible && !hovering ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
