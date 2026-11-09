import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Link } from "react-router";
import { CASES } from "../../../data/cases";
import { clamp, pad } from "../../../lib/format";
import { hasFinePointer, prefersReducedMotion } from "../../../lib/media";
import { PillLink } from "../../ui/PillLink";
import { SectionHead } from "../../ui/SectionHead";

const meta = "text-[0.9rem] tracking-[0.08em] text-muted transition-colors duration-300 group-hover/row:text-cream";

/** Selected work list. With a mouse, a photo of the hovered project floats after the pointer. */
export function WorkSection() {
  const [finePointer] = useState(hasFinePointer);
  const [preview, setPreview] = useState({ src: "", active: false });
  const previewRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ target: { x: 0, y: 0 }, current: { x: 0, y: 0 }, active: false });

  useEffect(() => {
    if (!finePointer) return;
    CASES.forEach((item) => (new Image().src = item.image)); // preload so the first hover doesn't flash
    const reduceMotion = prefersReducedMotion();
    const { target, current } = pointer.current;
    let frame = 0;

    function render() {
      const follow = reduceMotion ? 1 : 0.12;
      current.x += (target.x - current.x) * follow;
      current.y += (target.y - current.y) * follow;
      const tilt = reduceMotion ? 0 : clamp((target.x - current.x) * 0.06, -8, 8);

      previewRef.current!.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) rotate(${tilt}deg)`;
      frame = requestAnimationFrame(render);
    }

    frame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frame);
  }, [finePointer]);

  function enterRow(e: MouseEvent, src: string) {
    const state = pointer.current;
    if (!state.active) {
      state.current.x = state.target.x = e.clientX;
      state.current.y = state.target.y = e.clientY;
    }
    state.active = true;
    setPreview({ src, active: true });
  }

  function moveOverList(e: MouseEvent) {
    pointer.current.target.x = e.clientX;
    pointer.current.target.y = e.clientY;
  }

  function leaveList() {
    pointer.current.active = false;
    setPreview((p) => ({ ...p, active: false }));
  }

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="bg-black px-8 pt-[clamp(96px,16vh,180px)] pb-[clamp(80px,12vh,140px)] max-md:px-4"
    >
      <SectionHead
        id="work-heading"
        eyebrow="Selected work"
        count={pad(CASES.length)}
        intro="We're a small collective of designers and makers. Here's some of what we've built together, one step at a time."
      />

      <ul
        onMouseMove={finePointer ? moveOverList : undefined}
        onMouseLeave={finePointer ? leaveList : undefined}
        className="group/list mt-[clamp(64px,12vh,140px)] border-b border-cream/25"
      >
        {CASES.map((item, i) => (
          <li key={item.id}>
            <Link
              to={`/case-studies#${item.id}`}
              onMouseEnter={finePointer ? (e) => enterRow(e, item.image) : undefined}
              className="group/row grid grid-cols-[80px_minmax(0,1fr)_220px_80px_40px] items-center gap-x-6 border-t border-cream/25 py-[clamp(24px,4vh,40px)] text-cream transition-opacity duration-400 group-hover/list:[&:not(:hover)]:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream max-md:grid-cols-[40px_minmax(0,1fr)_auto] max-md:gap-x-3 max-md:gap-y-2"
            >
              {/* Touch devices get the photo inside each row instead */}
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                className="hidden coarse:col-span-full coarse:mb-5 coarse:block coarse:aspect-[16/10] coarse:w-full coarse:rounded coarse:object-cover"
              />
              <span className={`${meta} max-md:row-start-2`}>{pad(i + 1)}</span>
              <span className="text-[clamp(2rem,5.5vw,5rem)] leading-none tracking-[-0.02em] transition-transform duration-500 ease-smooth group-hover/row:translate-x-4 group-focus-visible/row:translate-x-4 max-md:col-[2/4] max-md:row-start-2">
                {item.title}
              </span>
              <span className={`${meta} max-md:col-start-2 max-md:row-start-3`}>{item.type}</span>
              <span className={`${meta} justify-self-end max-md:col-start-3 max-md:row-start-3`}>{item.year}</span>
              <span
                aria-hidden="true"
                className="justify-self-end text-[1.4rem] transition-transform duration-500 ease-smooth group-hover/row:-rotate-45 group-focus-visible/row:-rotate-45 max-md:hidden"
              >
                &rarr;
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <PillLink to="/case-studies" slideArrow className="mt-[clamp(40px,6vh,64px)] text-cream">
        View all work
      </PillLink>

      {finePointer && (
        <div
          ref={previewRef}
          aria-hidden="true"
          className="pointer-events-none fixed top-0 left-0 z-50 m-[calc(var(--preview-w)*-0.375)_0_0_calc(var(--preview-w)*-0.5)] aspect-[4/3] w-(--preview-w) will-change-transform [--preview-w:clamp(240px,24vw,380px)]"
        >
          <div
            className={`size-full overflow-hidden rounded [transition:opacity_0.35s_ease,scale_0.5s_var(--ease-smooth)] ${
              preview.active ? "scale-100 opacity-100" : "scale-60 opacity-0"
            }`}
          >
            {preview.src && <img src={preview.src} alt="" className="block size-full object-cover" />}
          </div>
        </div>
      )}
    </section>
  );
}
