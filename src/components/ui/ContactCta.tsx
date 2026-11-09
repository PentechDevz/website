import { EMAIL } from "../../data/site";
import { CopyEmailButton } from "./CopyEmailButton";
import { Eyebrow } from "./Eyebrow";

/** Closing "Have an idea? Let's build it." section with the email address */
export function ContactCta({ title }: { title: [string, string] }) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-ink px-8 pt-[clamp(96px,16vh,180px)] pb-[clamp(80px,12vh,140px)] max-md:px-4"
    >
      <Eyebrow>Contact</Eyebrow>
      <h2 id="contact-heading" className="mt-8 text-[clamp(3rem,10vw,10rem)] leading-[0.95] tracking-[-0.03em] text-cream">
        {title[0]}
        <br />
        <span className="text-fade">{title[1]}</span>
      </h2>

      <div className="mt-[clamp(48px,8vh,96px)] flex flex-wrap items-center gap-x-6 gap-y-5">
        <a
          href={`mailto:${EMAIL}`}
          className="relative text-[clamp(1.5rem,4.5vw,4rem)] tracking-[-0.01em] text-cream after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-15 after:bg-current after:transition-transform after:duration-600 after:ease-smooth hover:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-cream focus-visible:after:scale-x-100"
        >
          {EMAIL}
        </a>
        <CopyEmailButton />
      </div>
    </section>
  );
}
