import { useState, type FormEvent } from "react";
import { BUDGETS, NEEDS } from "../../../data/contact";
import { EMAIL } from "../../../data/site";
import { escapeHtml, sendEnquiry } from "../../../lib/enquiry";
import { clearPackage, loadPackage, type ChosenPackage } from "../../../lib/package";
import { Field, Select, TextArea, TextInput } from "../../forms/Field";
import { Fieldset } from "../../forms/Fieldset";
import { OptionCard } from "../../forms/OptionCard";
import { pillClass } from "../../ui/pill";

const note = "max-w-[44ch] text-[0.85rem] leading-[1.45]";

export function EnquiryForm() {
  // A package picked on the pricing or custom packages page shows above the form
  const [chosenPackage, setChosenPackage] = useState<ChosenPackage | null>(loadPackage);
  const [need, setNeed] = useState(() => chosenPackage?.need ?? "");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  function removePackage() {
    setChosenPackage(null);
    clearPackage();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const field = (key: string) => String(data.get(key) ?? "").trim();
    const name = field("name");
    const company = field("company");

    setSending(true);
    setStatus("");

    try {
      // Bots tend to tick the hidden spam trap; act as if it sent, but don't use up the monthly quota.
      if (data.get("botcheck") !== "on") {
        // A chosen package replaces "what do you need" in both emails, and its breakdown leads the message
        const packageHtml = chosenPackage
          ? [`<strong>${escapeHtml(chosenPackage.name)} (${escapeHtml(chosenPackage.price)})</strong>`, ...chosenPackage.lines.map(escapeHtml)].join("<br>") +
            "<br><br>"
          : "";

        await sendEnquiry({
          name,
          email: field("email"),
          company: company || "Not given",
          sender: company ? `${name} (${company})` : name,
          need: chosenPackage ? `${chosenPackage.name} (${chosenPackage.price})` : need,
          budget: field("budget"),
          message_html: packageHtml + escapeHtml(field("message")).replace(/\r?\n/g, "<br>"),
          received: new Date().toLocaleString("en-ZA", { timeZone: "Africa/Johannesburg", dateStyle: "full", timeStyle: "short" }),
        });
      }

      form.reset();
      setNeed("");
      removePackage();
      setStatus(`Thanks, ${name}. Your message is on its way and we'll be in touch within one working day.`);
    } catch {
      setStatus(`Sorry, your message couldn't be sent. Please try again, or email us directly at ${EMAIL}.`);
    } finally {
      setSending(false);
    }
  }

  return (
    <form aria-label="Contact form" onSubmit={onSubmit} className="col-[1/3] flex flex-col gap-[clamp(48px,8vh,80px)] max-lg:col-1">
      {/* Spam trap: hidden from people, bots tend to tick it */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px]" />

      {chosenPackage && (
        <div className="flex items-start justify-between gap-6 rounded bg-cream p-7 text-ink">
          <div>
            <p className="text-xs tracking-[0.2em] text-stone uppercase">Your package</p>
            <p className="mt-2.5 text-[clamp(1.4rem,2.2vw,2rem)] leading-[1.1]">{chosenPackage.name}</p>
            <p className="mt-1.5 text-base text-stone">{chosenPackage.price}</p>
            {chosenPackage.lines.length > 0 && (
              <ul className="mt-4 text-[0.9rem] leading-[1.6]">
                {chosenPackage.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            )}
          </div>
          <button
            type="button"
            onClick={removePackage}
            className="flex-none rounded-full border border-current px-[18px] py-2 text-[0.85rem] transition-colors duration-300 hover:bg-ink hover:text-cream focus-visible:bg-ink focus-visible:text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
          >
            Remove
          </button>
        </div>
      )}

      <Fieldset num="01" legend="What do you need?">
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          {NEEDS.map((option, i) => (
            <OptionCard
              key={option.value}
              name="need"
              value={option.value}
              checked={need === option.value}
              onSelect={setNeed}
              title={option.value}
              desc={option.desc}
              required={i === 0}
            />
          ))}
        </div>
      </Fieldset>

      <Fieldset num="02" legend="About you">
        <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
          <Field id="enquiry-name" label="Name">
            <TextInput id="enquiry-name" type="text" name="name" autoComplete="name" required />
          </Field>
          <Field id="enquiry-email" label="Email">
            <TextInput id="enquiry-email" type="email" name="email" autoComplete="email" required />
          </Field>
          <Field id="enquiry-company" label="Company" optional>
            <TextInput id="enquiry-company" type="text" name="company" autoComplete="organization" />
          </Field>
          <Field id="enquiry-budget" label="Budget">
            <Select id="enquiry-budget" name="budget" options={BUDGETS} />
          </Field>
        </div>
      </Fieldset>

      <Fieldset num="03" legend="Your project">
        <Field id="enquiry-message" label="What are you hoping to build?">
          <TextArea id="enquiry-message" name="message" rows={6} placeholder="Who it's for, what it should do, any deadlines…" required />
        </Field>
      </Fieldset>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <button type="submit" disabled={sending} className={`${pillClass()} text-cream disabled:cursor-progress disabled:opacity-60`}>
          {sending ? (
            "Sending…"
          ) : (
            <>
              Send message <span aria-hidden="true">&rarr;</span>
            </>
          )}
        </button>
        <p className={`${note} text-muted`}>We reply from {EMAIL}, usually within one working day.</p>
        <p role="status" aria-live="polite" className={`${note} basis-full text-cream empty:hidden`}>
          {status}
        </p>
      </div>
    </form>
  );
}
