import { Page } from "../components/layout/Page";
import { EnquiryForm } from "../components/sections/contact/EnquiryForm";
import { CopyEmailButton } from "../components/ui/CopyEmailButton";
import { NextPageLink } from "../components/ui/NextPageLink";
import { PageHeader } from "../components/ui/PageHeader";
import { Section } from "../components/ui/Section";
import { SectionHead } from "../components/ui/SectionHead";
import { Steps } from "../components/ui/Steps";
import { NEXT_STEPS } from "../data/contact";
import { EMAIL, SOCIALS } from "../data/site";
import { pad } from "../lib/format";

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Pricing", to: "/pricing" },
  { label: "Contact", to: "#enquiry" },
];

const detail = "flex flex-col items-start gap-2.5 border-t border-cream/25 pt-5";
const detailLabel = "text-xs tracking-[0.2em] text-muted uppercase";
const detailValue = "text-[1.15rem] text-cream [overflow-wrap:anywhere]";
const detailLink = "text-cream underline underline-offset-4";

export function ContactPage() {
  return (
    <Page title="Contact Us" footerLinks={footerLinks}>
      <PageHeader
        eyebrow="Contact us"
        title={["Got an idea?", "Let's build it together."]}
        text="Tell us a little about your project and we'll get back to you within one working day."
      />

      <main>
        <Section id="enquiry" aria-labelledby="enquiry-heading">
          <SectionHead
            id="enquiry-heading"
            eyebrow="Start a project"
            intro="A few details now saves a few emails later. Rough answers are fine."
          />

          <div className="mt-[clamp(64px,12vh,140px)] grid grid-cols-3 items-start gap-8 max-lg:grid-cols-1">
            <EnquiryForm />

            <aside aria-label="Contact details" className="sticky top-8 flex flex-col gap-8 max-lg:static">
              <div className={detail}>
                <p className={detailLabel}>Email</p>
                <p className={detailValue}>
                  <a href={`mailto:${EMAIL}`} className={detailLink}>
                    {EMAIL}
                  </a>
                </p>
                <CopyEmailButton className="mt-1.5" />
              </div>
              <div className={detail}>
                <p className={detailLabel}>Response time</p>
                <p className={detailValue}>Within one working day</p>
              </div>
              <div className={detail}>
                <p className={detailLabel}>Follow</p>
                <ul className="flex flex-col gap-2">
                  {SOCIALS.map((social) => (
                    <li key={social.label}>
                      <a href={social.href} target="_blank" rel="noopener" className={detailLink}>
                        {social.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Section>

        <Section id="next" aria-labelledby="next-heading">
          <SectionHead
            id="next-heading"
            eyebrow="What happens next"
            count={pad(NEXT_STEPS.length)}
            intro="No sales pitch. Just a conversation about what you need."
          />
          <Steps items={NEXT_STEPS} />
          <NextPageLink to="/pricing" label="Want a ballpark first?" title="See pricing" />
        </Section>
      </main>
    </Page>
  );
}
