import { Page } from "../components/layout/Page";
import { StoryTimeline } from "../components/sections/collective/StoryTimeline";
import { Card } from "../components/ui/Card";
import { ContactCta } from "../components/ui/ContactCta";
import { NextPageLink } from "../components/ui/NextPageLink";
import { PageHeader } from "../components/ui/PageHeader";
import { RowList } from "../components/ui/RowList";
import { Section } from "../components/ui/Section";
import { SectionHead } from "../components/ui/SectionHead";
import { FACTS, PILLARS, VALUES } from "../data/collective";
import { pad } from "../lib/format";

const footerLinks = [
  { label: "Work", to: "/#work" },
  { label: "Our story", to: "#story" },
  { label: "Perspectives", to: "/perspectives" },
  { label: "Contact", to: "/contact" },
];

export function CollectivePage() {
  return (
    <Page title="Collective Solutions" footerLinks={footerLinks}>
      <PageHeader
        eyebrow="Collective solutions"
        title={["Five people,", "one way of building."]}
        text="Pentech Devs is a small software collective. We design, build and launch digital products, and we do it together."
      >
        <dl className="mt-[clamp(64px,12vh,140px)] grid grid-cols-3 gap-8 max-md:gap-4">
          {FACTS.map((fact) => (
            // Label comes first for screen readers, but sits under the number on screen
            <div key={fact.label} className="flex flex-col-reverse gap-3 border-t border-cream/25 pt-5">
              <dt className="text-[0.8rem] tracking-[0.2em] text-muted uppercase max-md:text-[0.7rem] max-md:tracking-[0.12em]">{fact.label}</dt>
              <dd className="text-[clamp(3rem,7vw,6rem)] leading-none tracking-[-0.03em] text-fade max-md:text-[2.25rem]">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      <main>
        <Section id="about" aria-labelledby="about-heading" tone="ink">
          <SectionHead
            id="about-heading"
            eyebrow="What we are"
            intro="A collective of developers and designers who plan, design, build and launch in the same room, so nothing gets lost between handovers."
          />
          <div className="mt-[clamp(64px,12vh,140px)] grid grid-cols-3 gap-8 max-lg:grid-cols-1 max-lg:gap-y-12">
            {PILLARS.map((pillar, i) => (
              <Card key={pillar.title} num={pad(i + 1)} title={pillar.title}>
                <p className="max-w-[36ch] text-[1.05rem] leading-[1.55] text-muted">{pillar.text}</p>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="story" aria-labelledby="story-heading">
          <SectionHead
            id="story-heading"
            eyebrow="How it started"
            intro="No big launch, no master plan. Just a team that kept choosing to build the next thing together."
          />
          <StoryTimeline />
        </Section>

        <Section id="values" aria-labelledby="values-heading" tone="ink">
          <SectionHead
            id="values-heading"
            eyebrow="What we believe"
            count={pad(VALUES.length)}
            intro="A few things we agreed on early, and still hold each other to."
          />
          <RowList items={VALUES} />
          <NextPageLink to="/perspectives" label="Next: meet the people" title="Individual perspectives" />
        </Section>

        <ContactCta title={["Have an idea?", "Let's build it."]} />
      </main>
    </Page>
  );
}
