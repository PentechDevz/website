import { Page } from "../components/layout/Page";
import { ContactCta } from "../components/ui/ContactCta";
import { DetailList } from "../components/ui/DetailList";
import { IndexList } from "../components/ui/IndexList";
import { Label } from "../components/ui/Label";
import { NextPageLink } from "../components/ui/NextPageLink";
import { PageHeader } from "../components/ui/PageHeader";
import { Section } from "../components/ui/Section";
import { SectionHead } from "../components/ui/SectionHead";
import { Tags } from "../components/ui/Tags";
import { CASES } from "../data/cases";
import { pad } from "../lib/format";

const footerLinks = [
  { label: "Case studies", to: "#cases" },
  { label: "Services", to: "/services" },
  { label: "Testimonies", to: "/testimonies" },
  { label: "Contact", to: "/contact" },
];

export function CaseStudiesPage() {
  return (
    <Page title="Case Studies" footerLinks={footerLinks}>
      <PageHeader
        eyebrow="Case studies"
        title={["The work,", "up close."]}
        text="What the problem was, what we built, and what changed. Four projects, start to finish."
      >
        <IndexList items={CASES.map((item) => ({ id: item.id, name: item.title, role: item.type }))} columns={4} />
      </PageHeader>

      <main>
        <Section id="cases" aria-labelledby="cases-heading" tone="ink">
          <SectionHead
            id="cases-heading"
            eyebrow="Selected projects"
            count={pad(CASES.length)}
            intro="Every project starts with a real problem. Here's how we worked through four of them."
          />

          <div className="mt-[clamp(64px,12vh,140px)]">
            {CASES.map((item, i) => (
              <article
                key={item.id}
                id={item.id}
                aria-labelledby={`${item.id}-title`}
                className="group/case grid scroll-mt-6 grid-cols-3 gap-x-8 border-t border-cream/25 pt-[clamp(40px,6vh,64px)] pb-[clamp(80px,14vh,160px)] max-md:grid-cols-1"
              >
                <p className="sticky top-8 flex flex-col gap-1.5 self-start text-[0.9rem] tracking-[0.08em] text-muted max-md:static max-md:flex-row max-md:flex-wrap max-md:items-baseline max-md:gap-x-4">
                  <span className="mb-2 text-[clamp(2rem,4vw,3.5rem)] leading-none tracking-[-0.02em] text-fade">{pad(i + 1)}</span>
                  <span>{item.type}</span>
                  <span>{item.year}</span>
                </p>

                <div className="col-[2/4] max-md:col-1 max-md:mt-6">
                  <h3 id={`${item.id}-title`} className="text-[clamp(2.25rem,5vw,4.5rem)] leading-none tracking-[-0.02em] text-cream">
                    {item.title}
                  </h3>
                  <p className="mt-5 max-w-[40ch] text-[clamp(1.05rem,1.4vw,1.25rem)] leading-normal text-muted">{item.summary}</p>
                  <figure className="mt-[clamp(40px,6vh,64px)] aspect-video overflow-hidden bg-black">
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      className="block size-full scale-[1.04] object-cover grayscale [transition:scale_1.2s_var(--ease-smooth),filter_0.6s_ease] group-hover/case:scale-100 group-hover/case:grayscale-40 motion-reduce:[transition:none]"
                    />
                  </figure>
                  <DetailList items={item.steps} />
                  <div className="mt-10">
                    <Label>Built with</Label>
                    <Tags items={item.stack} />
                  </div>
                </div>
              </article>
            ))}
          </div>

          <NextPageLink to="/testimonies" label="Next: hear it from them" title="Testimonies" />
        </Section>

        <ContactCta title={["Got a problem to solve?", "Let's build it."]} />
      </main>
    </Page>
  );
}
