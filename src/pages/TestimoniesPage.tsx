import { Page } from "../components/layout/Page";
import { Voices } from "../components/sections/testimonies/Voices";
import { ContactCta } from "../components/ui/ContactCta";
import { DetailList } from "../components/ui/DetailList";
import { NextPageLink } from "../components/ui/NextPageLink";
import { PageHeader } from "../components/ui/PageHeader";
import { Section } from "../components/ui/Section";
import { SectionHead } from "../components/ui/SectionHead";
import { FEATURED, VOICES } from "../data/testimonies";
import { pad } from "../lib/format";

const footerLinks = [
  { label: "Work", to: "/#work" },
  { label: "Testimonies", to: "/testimonies" },
  { label: "Pricing", to: "/pricing" },
  { label: "Contact", to: "/contact" },
];

const featuredMeta = "text-[0.9rem] leading-[1.7] tracking-[0.08em] text-muted";

export function TestimoniesPage() {
  return (
    <Page title="Testimonies" footerLinks={footerLinks}>
      <PageHeader
        eyebrow="Testimonies"
        title={["In their words,", "not ours."]}
        text="We'd rather let the people we've built for do the talking. Here's what working with us was like, from the other side of the table."
      />

      <main>
        <Section id="featured" aria-labelledby="featured-heading" tone="ink">
          <SectionHead
            id="featured-heading"
            eyebrow="Featured story"
            intro="One project, start to finish, told by the person who trusted us with it."
          />
          <div className="mt-[clamp(64px,12vh,140px)] grid grid-cols-3 gap-x-8 border-t border-cream/25 pt-[clamp(32px,5vh,48px)] max-md:grid-cols-1">
            <div>
              <p className="mb-5 text-[clamp(2.25rem,5vw,4.5rem)] leading-none tracking-[-0.02em] text-fade">{FEATURED.client}</p>
              <p className={featuredMeta}>{FEATURED.role}</p>
              <p className={featuredMeta}>{FEATURED.meta}</p>
            </div>
            <div className="col-[2/4] max-md:col-1 max-md:mt-8">
              <blockquote>
                <p className="max-w-[26ch] text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.15] tracking-[-0.01em] text-cream">
                  &ldquo;{FEATURED.quote}&rdquo;
                </p>
              </blockquote>
              <DetailList items={FEATURED.steps} />
            </div>
          </div>
        </Section>

        <Section id="voices" aria-labelledby="voices-heading">
          <SectionHead
            id="voices-heading"
            eyebrow="What they say"
            count={pad(VOICES.length)}
            intro="Founders, studios and teams, on what it was like to build something together."
          />
          <Voices />
          <NextPageLink to="/pricing" label="Next: work with us" title="Pricing" />
        </Section>

        <ContactCta title={["Be our next story.", "Let's build it."]} />
      </main>
    </Page>
  );
}
