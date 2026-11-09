import hero from "../../../assets/images/hero.jpg";
import { Intro } from "../../ui/Intro";

export function Hero() {
  return (
    <header id="top" className="relative h-svh overflow-hidden">
      <img
        src={hero}
        alt="Dark stone staircase rising beside a tiled concrete wall"
        className="block size-full object-cover object-[30%_center]"
      />
      {/* Film grain over the photo, then a shade so the text stays readable */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-1 bg-grain opacity-14 mix-blend-overlay" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-hero-shade" />

      <div className="absolute inset-x-8 top-[clamp(120px,24vh,240px)] z-1 max-w-[900px] text-cream max-md:inset-x-4 max-md:top-[clamp(110px,18vh,180px)] *:rise-in [&>:nth-child(2)]:[--rise-delay:0.1s] [&>:nth-child(3)]:[--rise-delay:0.2s]">
        <Intro
          eyebrow="A creative collective"
          title={["Built together,", "step by step."]}
          fade={false}
          text="Collective efforts, individual perspectives. We shape brands, ideas and digital work that last."
        />
      </div>

      <div className="absolute inset-x-8 bottom-7 z-1 grid animate-rise-late grid-cols-[1fr_auto_1fr] items-end text-xs tracking-[0.08em] text-muted opacity-0 motion-reduce:animate-none motion-reduce:opacity-100 max-md:inset-x-4 max-md:bottom-5 max-md:grid-cols-[1fr_auto] max-md:gap-4 max-md:text-[0.7rem]">
        <p />
        <div aria-hidden="true" className="flex flex-col items-center gap-3 tracking-[0.2em] uppercase max-md:hidden">
          <span>Scroll</span>
          <span className="relative h-12 w-px overflow-hidden bg-cream/25 after:absolute after:top-0 after:left-0 after:h-[40%] after:w-full after:animate-scroll-cue after:bg-cream motion-reduce:after:animate-none" />
        </div>
        <p className="justify-self-end">&copy; 2026 Pentech Devs</p>
      </div>
    </header>
  );
}
