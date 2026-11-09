// Contact messages are delivered by EmailJS (emailjs.com), so the site needs no back end.
// Each enquiry sends two emails: a notification to the team, then a thank-you to the customer.
// Their designs and recipients (team copy to pentechdevs@gmail.com) are set in the EmailJS dashboard.
// IDs: Email Services (service ID), Email Templates (team + auto-reply template IDs), Account > General (public key).
const EMAILJS = {
  serviceId: "service_ldqxfzj",
  templateId: "template_zgag1id",
  replyTemplateId: "template_kx3jbj2",
  publicKey: "mHOvZHBNsm7fRUDoQ",
};

export type EnquiryParams = Record<string, string>;

async function sendEmail(template: string, params: EnquiryParams) {
  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: EMAILJS.serviceId,
      template_id: template,
      user_id: EMAILJS.publicKey,
      template_params: params,
    }),
  });
  if (!response.ok) throw new Error(await response.text());
}

/** The team's copy is what matters, so only its failure counts as "couldn't be sent". */
export async function sendEnquiry(params: EnquiryParams) {
  await sendEmail(EMAILJS.templateId, params);
  await sendEmail(EMAILJS.replyTemplateId, params).catch(() => {});
}

export const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);
