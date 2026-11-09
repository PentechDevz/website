import { CLIENTS } from "../../../data/home";
import { pad } from "../../../lib/format";
import { Section } from "../../ui/Section";
import { SectionHead } from "../../ui/SectionHead";
import { Testimonials } from "./Testimonials";

export function ClientsSection() {
  return (
    <Section id="clients" aria-labelledby="clients-heading">
      <SectionHead
        id="clients-heading"
        eyebrow="Clients"
        count={pad(CLIENTS.length)}
        intro="Trusted by founders, studios and teams who care about the details as much as we do."
      />

      <ul className="mt-[clamp(64px,12vh,140px)] grid grid-cols-4 gap-px border border-cream/25 bg-cream/25 max-lg:grid-cols-2">
        {CLIENTS.map((client) => (
          <li
            key={client.name}
            className="group/client relative flex min-h-[clamp(120px,15vw,200px)] flex-col items-center justify-center gap-2.5 bg-black p-6 text-center transition-colors duration-400 ease-smooth hover:bg-cream motion-reduce:transition-none max-md:px-3 max-md:py-5"
          >
            <span className="text-[clamp(1.25rem,2.2vw,2rem)] tracking-[-0.01em] text-cream transition-[color,translate] duration-500 ease-smooth group-hover/client:-translate-y-1.5 group-hover/client:text-ink motion-reduce:transition-none">
              {client.name}
            </span>
            {/* No hover on touch screens, so the details always show there */}
            <span className="absolute bottom-[18px] translate-y-2 text-xs tracking-[0.08em] text-stone opacity-0 transition-[opacity,translate] duration-500 ease-smooth group-hover/client:translate-y-0 group-hover/client:opacity-100 motion-reduce:transition-none touch:static touch:translate-y-0 touch:text-muted touch:opacity-100">
              {client.meta}
            </span>
          </li>
        ))}
      </ul>

      <Testimonials />
    </Section>
  );
}
