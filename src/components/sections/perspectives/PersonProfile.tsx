import type { TeamMember } from "../../../data/team";
import { useInView } from "../../../hooks/useInView";
import { pad } from "../../../lib/format";
import { Label } from "../../ui/Label";
import { Tags } from "../../ui/Tags";

/** One team member: sticky number and initial, their words, and a photo that colours in on hover */
export function PersonProfile({ person, index }: { person: TeamMember; index: number }) {
  // The big initial rises into place as the profile scrolls in
  const [ref, inView] = useInView<HTMLElement>("0px 0px -20% 0px");

  return (
    <article
      ref={ref}
      id={person.id}
      aria-labelledby={`${person.id}-name`}
      className="group/person grid scroll-mt-6 grid-cols-3 gap-x-8 border-t border-cream/25 pt-[clamp(32px,5vh,48px)] pb-[clamp(64px,12vh,140px)] max-lg:grid-cols-2 max-lg:gap-y-10 max-md:grid-cols-1"
    >
      <div className="sticky top-8 self-start max-lg:static max-lg:row-start-1 max-md:flex max-md:items-end max-md:justify-between max-md:gap-4">
        <p className="flex gap-4 text-[0.9rem] tracking-[0.08em] text-muted max-md:flex-col max-md:gap-1.5">
          <span>{pad(index + 1)}</span>
          <span>{person.role}</span>
        </p>
        {/* Big initial cut off by the line beneath it, like the menu numbers */}
        <div aria-hidden="true" className="mt-8 max-w-[280px] overflow-hidden border-b-2 border-cream max-md:mt-0 max-md:w-[120px]">
          <span
            className={`block text-[clamp(7rem,16vw,14rem)] leading-[0.8] tracking-[-0.04em] text-fade-deep transition-transform duration-900 ease-smooth motion-reduce:transition-none max-md:text-[7rem] ${
              inView ? "translate-y-[28%]" : "translate-y-full"
            }`}
          >
            {person.name[0]}
          </span>
        </div>
      </div>

      <div className="col-start-2 max-lg:col-span-full max-lg:row-start-2 max-md:col-start-1 max-md:row-start-3">
        <h3 id={`${person.id}-name`} className="text-[clamp(3rem,6vw,5.5rem)] leading-none tracking-[-0.02em] text-cream">
          {person.name}
        </h3>
        <blockquote className="mt-[clamp(28px,4vh,40px)]">
          <p className="max-w-[28ch] text-[clamp(1.4rem,2vw,1.75rem)] leading-[1.25] tracking-[-0.01em] text-cream">
            &ldquo;{person.quote}&rdquo;
          </p>
        </blockquote>

        <div className="mt-[clamp(40px,7vh,72px)] grid grid-cols-1 gap-10 max-lg:grid-cols-2 max-md:grid-cols-1">
          <div>
            <Label as="h4">Tech stack</Label>
            <dl className="mt-4">
              {person.stack.map((row) => (
                <div key={row.label} className="group/stack grid grid-cols-[96px_minmax(0,1fr)] gap-4 border-t border-cream/12 py-4">
                  <dt className="text-[0.8rem] leading-[1.8] tracking-[0.08em] text-muted">{row.label}</dt>
                  <dd className="text-[1.05rem] leading-[1.4] text-cream transition-transform duration-400 ease-smooth group-hover/stack:translate-x-2">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <Label as="h4">Reaches for</Label>
            <Tags items={person.tools} />
          </div>
        </div>
      </div>

      <figure className="sticky top-8 col-start-3 aspect-[4/5] w-full max-w-[400px] self-start justify-self-center overflow-hidden rounded bg-black max-lg:static max-lg:col-start-2 max-lg:row-start-1 max-md:col-start-1 max-md:row-start-2 max-md:max-w-[240px] max-md:justify-self-start">
        <img
          src={person.photo}
          alt={`Portrait of ${person.name}`}
          loading="lazy"
          className="block size-full scale-[1.04] object-cover grayscale [transition:filter_0.6s_ease,scale_0.9s_var(--ease-smooth)] group-hover/person:scale-100 group-hover/person:grayscale-0 motion-reduce:[transition:none]"
        />
      </figure>
    </article>
  );
}
