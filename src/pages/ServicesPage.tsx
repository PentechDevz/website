import { Page } from "../components/layout/Page";
import { ContactCta } from "../components/ui/ContactCta";
import { NextPageLink } from "../components/ui/NextPageLink";
import { PageHeader } from "../components/ui/PageHeader";
import { RowList } from "../components/ui/RowList";
import { Section } from "../components/ui/Section";
import { SectionHead } from "../components/ui/SectionHead";
import { Steps } from "../components/ui/Steps";
import { PROCESS, SERVICES } from "../data/services";
import { pad } from "../lib/format";

const footerLinks = [
  { label: "Services", to: "#services" },
  { label: "Process", to: "#process" },
  { label: "Case studies", to: "/case-studies" },
  { label: "Contact", to: "/contact" },
];

export function ServicesPage() {
  return (
    <Page title="Services" footerLinks={footerLinks}>
      <PageHeader
        eyebrow="Services"
        title={["What we build,", "and how we build it."]}
        text="From the first sketch to the last line of code, and the support after launch. Here's how we can help."
      />

      <main>
        <Section id="services" aria-labelledby="services-heading" tone="ink">
          <SectionHead
            id="services-heading"
            eyebrow="What we do"
            count={pad(SERVICES.length)}
            intro="Four things we do well, and do together. Most projects need a bit of each."
          />
          <RowList items={SERVICES} variant="service" />
        </Section>

        <Section id="process" aria-labelledby="process-heading">
          <SectionHead
            id="process-heading"
            eyebrow="How a project runs"
            count={pad(PROCESS.length)}
            intro="No black box. You'll know what we're doing, why, and what comes next."
          />
          <Steps items={PROCESS} />
          <NextPageLink to="/case-studies" label="Next: see it in practice" title="Case studies" />
        </Section>

        <ContactCta title={["Not sure what you need?", "Let's work it out."]} />
      </main>
    </Page>
  );
}
