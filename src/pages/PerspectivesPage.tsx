import { Page } from "../components/layout/Page";
import { BriefTabs } from "../components/sections/perspectives/BriefTabs";
import { PersonProfile } from "../components/sections/perspectives/PersonProfile";
import { ContactCta } from "../components/ui/ContactCta";
import { IndexList } from "../components/ui/IndexList";
import { PageHeader } from "../components/ui/PageHeader";
import { Section } from "../components/ui/Section";
import { SectionHead } from "../components/ui/SectionHead";
import { TEAM } from "../data/team";
import { pad } from "../lib/format";

const footerLinks = [
  { label: "Work", to: "/#work" },
  { label: "Perspectives", to: "#people" },
  { label: "Clients", to: "/#clients" },
  { label: "Contact", to: "/contact" },
];

export function PerspectivesPage() {
  return (
    <Page title="Individual Perspectives" footerLinks={footerLinks}>
      <PageHeader
        eyebrow="Individual perspectives"
        title={["One collective,", "five ways of seeing."]}
        text="We share a studio and a standard, not a single way of thinking. Here's how each of us approaches the work."
      >
        <IndexList items={TEAM} columns={5} />
      </PageHeader>

      <main>
        <Section id="people" aria-labelledby="people-heading" tone="ink">
          <SectionHead
            id="people-heading"
            eyebrow="The people"
            count={pad(TEAM.length)}
            intro="Same studio, same standards. Different instincts about where good work begins."
          />
          <div className="mt-[clamp(64px,12vh,140px)]">
            {TEAM.map((person, i) => (
              <PersonProfile key={person.id} person={person} index={i} />
            ))}
          </div>
        </Section>

        <Section id="brief" aria-labelledby="brief-heading">
          <SectionHead
            id="brief-heading"
            eyebrow="One brief, five starts"
            intro="Hand us a single brief and you'll get five different first moves. Here's where each of us would begin."
          />
          <BriefTabs />
        </Section>

        <ContactCta title={["Pick a perspective.", "Or get all five."]} />
      </main>
    </Page>
  );
}
