import { useState } from "react";
import { Page } from "../components/layout/Page";
import { DealCard } from "../components/sections/packages/DealCard";
import { PackageBuilder } from "../components/sections/packages/PackageBuilder";
import { ContactCta } from "../components/ui/ContactCta";
import { PageHeader } from "../components/ui/PageHeader";
import { Section } from "../components/ui/Section";
import { SectionHead } from "../components/ui/SectionHead";
import { DEALS } from "../data/packages";
import { pad } from "../lib/format";

const footerLinks = [
  { label: "Work", to: "/#work" },
  { label: "About", to: "/collective" },
  { label: "Pricing", to: "/pricing" },
  { label: "Contact", to: "/contact" },
];

export function CustomPackagesPage() {
  // Shared so the deal cards can pre-select their deal in the builder
  const [deal, setDeal] = useState("none");

  return (
    <Page title="Custom Packages" footerLinks={footerLinks}>
      <PageHeader
        eyebrow="Custom packages"
        title={["Build your own,", "pay for what you need."]}
        text="Portfolios, CV sites and landing pages, put together piece by piece. Students and recent graduates get a better deal."
      />

      <main>
        <Section id="deals" aria-labelledby="deals-heading" tone="ink">
          <SectionHead
            id="deals-heading"
            eyebrow="Deals"
            count={pad(DEALS.length)}
            intro="We started out as students. A good portfolio shouldn't cost more than your first month's salary."
          />
          <div className="mt-[clamp(64px,12vh,140px)] grid grid-cols-2 gap-8 max-lg:grid-cols-1">
            {DEALS.map((item) => (
              <DealCard key={item.value} deal={item} onPick={setDeal} />
            ))}
          </div>
        </Section>

        <Section id="builder" aria-labelledby="builder-heading">
          <SectionHead
            id="builder-heading"
            eyebrow="Package builder"
            intro="Pick a starting point, add what you need and see your estimate change as you go."
          />
          <PackageBuilder deal={deal} onDealChange={setDeal} />
        </Section>

        <ContactCta title={["Need something else?", "Just ask."]} />
      </main>
    </Page>
  );
}
