import { Page } from "../components/layout/Page";
import { ClientsSection } from "../components/sections/home/ClientsSection";
import { Hero } from "../components/sections/home/Hero";
import { ToolsSection } from "../components/sections/home/ToolsSection";
import { WorkSection } from "../components/sections/home/WorkSection";
import { ContactCta } from "../components/ui/ContactCta";

const footerLinks = [
  { label: "Work", to: "#work" },
  { label: "Tools", to: "#tools" },
  { label: "Clients", to: "#clients" },
  { label: "Contact", to: "/contact" },
];

export function HomePage() {
  return (
    <Page footerLinks={footerLinks}>
      <Hero />
      <main>
        <WorkSection />
        <ToolsSection />
        <ClientsSection />
        <ContactCta title={["Have an idea?", "Let's build it."]} />
      </main>
    </Page>
  );
}
