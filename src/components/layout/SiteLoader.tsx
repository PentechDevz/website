import { useEffect, useRef, useState } from "react";
import logo from "../../assets/images/logo-light.png";

const DRAW_TIME = 1800;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// The pen's route over the PD mark, in the logo's own coordinates.
const STROKES = [
  "M 533 1390 L 533 1180 C 533 1100 580 1065 660 1065 L 820 1065 C 960 1065 1052 960 1052 842 C 1052 720 960 620 820 620 L 533 620 L 533 980",
  "M 835 770 C 945 770 945 932 835 932 Z",
  "M 893 1175 L 893 1315 L 1050 1315 C 1250 1315 1398 1170 1398 965 C 1398 790 1290 650 1090 585 C 1060 570 1030 555 1000 545",
];

/**
 * Intro loader: a pen draws the PD mark, the logo fades in, then the screen lifts away.
 * index.html decides whether to show it (first page of a visit, or a refresh) by adding .has-loader.
 */
export function SiteLoader() {
  const [active] = useState(() => document.documentElement.classList.contains("has-loader"));
  const [stage, setStage] = useState<"drawing" | "drawn" | "leaving" | "done">("drawing");
  const svgRef = useRef<SVGSVGElement>(null);
  const penRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (!active) return;
    const root = document.documentElement;
    const paths = [...svgRef.current!.querySelectorAll("path")];
    const pen = penRef.current!;
    const lengths = paths.map((path) => path.getTotalLength());
    const total = lengths.reduce((sum, length) => sum + length, 0);
    const timers: number[] = [];
    const wait = (ms: number) => new Promise<void>((resolve) => timers.push(window.setTimeout(resolve, ms)));
    let frame = 0;
    let cancelled = false;

    const pageLoaded = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
      timers.push(window.setTimeout(resolve, 3000));
    });

    try {
      sessionStorage.setItem("pd-intro-seen", "1");
    } catch {
      // without storage the intro simply plays again next visit
    }

    paths.forEach((path, i) => {
      path.style.strokeDasharray = String(lengths[i]);
      path.style.strokeDashoffset = String(lengths[i]);
    });

    const drawn = new Promise<void>((resolve) => {
      let start: number | undefined;
      function draw(now: number) {
        start ??= now;
        const progress = Math.min((now - start) / DRAW_TIME, 1);
        let remaining = easeInOut(progress) * total;

        paths.forEach((path, i) => {
          const length = Math.min(Math.max(remaining, 0), lengths[i]);
          path.style.strokeDashoffset = String(lengths[i] - length);
          if (remaining > 0 && remaining <= lengths[i]) {
            const point = path.getPointAtLength(length);
            pen.setAttribute("cx", String(point.x));
            pen.setAttribute("cy", String(point.y));
          }
          remaining -= lengths[i];
        });

        if (progress < 1) frame = requestAnimationFrame(draw);
        else resolve();
      }
      frame = requestAnimationFrame(draw);
    });

    drawn
      .then(() => {
        if (cancelled) return;
        setStage("drawn");
        return Promise.all([pageLoaded, wait(900)]);
      })
      .then(() => {
        if (cancelled) return;
        root.classList.remove("is-loading");
        setStage("leaving");
        return wait(1000);
      })
      .then(() => {
        if (cancelled) return;
        root.classList.remove("has-loader");
        setStage("done");
      });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
    };
  }, [active]);

  if (!active || stage === "done") return null;
  const drawnOrLater = stage !== "drawing";

  return (
    <div
      role="status"
      aria-label="Loading Pentech Devs"
      className={`fixed inset-0 z-1000 grid place-items-center content-center gap-7 bg-black ${
        stage === "leaving" ? "-translate-y-full transition-transform duration-1000 ease-smooth" : ""
      }`}
    >
      <svg ref={svgRef} viewBox="455 540 1020 857" aria-hidden="true" className="h-auto w-[clamp(120px,18vw,220px)] overflow-visible">
        <image
          href={logo}
          x="455"
          y="540"
          width="1020"
          height="857"
          className={`transition-opacity duration-600 ${drawnOrLater ? "opacity-100" : "opacity-0"}`}
        />
        {STROKES.map((d) => (
          <path
            key={d}
            d={d}
            className={`fill-none stroke-cream stroke-2 transition-opacity duration-500 [stroke-linecap:round] [stroke-linejoin:round] [vector-effect:non-scaling-stroke] ${
              drawnOrLater ? "opacity-0" : ""
            }`}
          />
        ))}
        <circle
          ref={penRef}
          cx="533"
          cy="1390"
          r="10"
          className={`fill-cream transition-opacity duration-300 ${drawnOrLater ? "opacity-0" : ""}`}
        />
      </svg>
      <p
        aria-hidden="true"
        className={`text-[0.85rem] tracking-[0.3em] text-muted uppercase [transition:opacity_0.6s_ease,translate_0.8s_var(--ease-smooth)] ${
          drawnOrLater ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        Pentech Devs
      </p>
    </div>
  );
}
