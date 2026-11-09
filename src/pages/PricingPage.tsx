import { Page } from "../components/layout/Page";
import { TierCard } from "../components/sections/pricing/TierCard";
import { ContactCta } from "../components/ui/ContactCta";
import { Label } from "../components/ui/Label";
import { NextPageLink } from "../components/ui/NextPageLink";
import { PageHeader } from "../components/ui/PageHeader";
import { RowList } from "../components/ui/RowList";
import { Section } from "../components/ui/Section";
import { SectionHead } from "../components/ui/SectionHead";
import { FAQS, PAYMENT_STEPS, TIERS } from "../data/pricing";
import { pad } from "../lib/format";

const footerLinks = [
  { label: "Work", to: "/#work" },
  { label: "About", to: "/collective" },
  { label: "Pricing", to: "#plans" },
  { label: "Contact", to: "/contact" },
];

export function PricingPage() {
  return (
    <Page title="Pricing" footerLinks={footerLinks}>
      <PageHeader
        eyebrow="Pricing"
        title={["Clear prices,", "no surprises."]}
        text="Every project starts with a free conversation and ends with a fixed quote. Here's where most of them begin."
      />

      <main>
        <Section id="plans" aria-labelledby="plans-heading" tone="ink">
          <SectionHead
            id="plans-heading"
            eyebrow="Packages"
            count={pad(TIERS.length)}
            intro="Pick the closest fit. We'll shape the details together before any work starts."
          />

          <div className="mt-[clamp(64px,12vh,140px)] grid grid-cols-3 gap-8 max-lg:max-w-[560px] max-lg:grid-cols-1">
            {TIERS.map((tier, i) => (
              <TierCard key={tier.id} tier={tier} index={i} />
            ))}
          </div>

          <div className="mt-8 grid grid-cols-3 items-end gap-8 rounded border border-cream/25 p-8 max-lg:grid-cols-1 max-lg:items-start max-md:p-6">
            <div>
              <Label>Monthly care plan</Label>
              <h3 className="mt-3 text-[clamp(1.4rem,2.2vw,2rem)] leading-[1.2] text-cream">Keep it fast, safe and up to date.</h3>
            </div>
            <p className="max-w-[36ch] text-[1.05rem] leading-normal text-muted">
              Hosting, security updates, backups and small fixes, handled by the people who built it.
            </p>
            <p className="justify-self-end text-right max-lg:justify-self-start max-lg:text-left">
              <span className="block text-xs tracking-[0.2em] text-muted uppercase">From</span>
              <span className="mt-2 block text-[clamp(2rem,3.4vw,3rem)] leading-none tracking-[-0.03em] text-cream">
                R500<span className="text-base tracking-normal text-muted">/month</span>
              </span>
            </p>
          </div>

          <NextPageLink to="/custom-packages" label="Portfolios, CV sites & student deals" title="Build your own package" />
        </Section>

        <Section id="payment" aria-labelledby="payment-heading">
          <SectionHead
            id="payment-heading"
            eyebrow="How payment works"
            intro="Simple steps, agreed up front, so you always know what's next and what it costs."
          />
          <RowList items={PAYMENT_STEPS} as="ol" />
        </Section>

        <Section id="faq" aria-labelledby="faq-heading" tone="ink" className="border-b border-cream/25">
          <SectionHead id="faq-heading" eyebrow="Questions">
            <div className="col-[2/4] border-b border-cream/25 max-md:col-1 max-md:mt-6">
              {FAQS.map((faq) => (
                <details key={faq.question} className="group/faq border-t border-cream/25">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-[clamp(20px,3vh,32px)] text-[clamp(1.25rem,2.4vw,2rem)] leading-[1.2] tracking-[-0.01em] text-cream after:flex-none after:text-[1.75rem] after:leading-none after:text-muted after:transition-[rotate,color] after:duration-[400ms,300ms] after:ease-[var(--ease-smooth),ease] after:content-['+'] hover:after:text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream group-open/faq:after:rotate-45 group-open/faq:after:text-cream [&::-webkit-details-marker]:hidden">
                    {faq.question}
                  </summary>
                  <p className="max-w-[60ch] pb-[clamp(24px,4vh,40px)] text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.6] text-muted">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </SectionHead>
        </Section>

        <ContactCta title={["Ready for a quote?", "It's free to ask."]} />
      </main>
    </Page>
  );
}
