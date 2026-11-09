export const TIERS = [
  {
    id: "tier-website",
    name: "Website",
    for: "For small businesses and individuals who need a fast, professional presence online.",
    price: "R5 000",
    time: "Usually 2–3 weeks",
    items: ["Up to 5 pages", "Responsive on every screen size", "Contact form and basic SEO", "Two rounds of revisions"],
    cta: "Start a website",
    need: "Website",
  },
  {
    id: "tier-app",
    name: "Web app",
    badge: "Most popular",
    featured: true,
    for: "For businesses that need logins, data and a product people come back to.",
    price: "R15 000",
    time: "Usually 6–10 weeks",
    items: [
      "UI/UX design and prototype in Figma",
      "Front-end and back-end development",
      "User accounts and a database",
      "Admin dashboard",
      "Three rounds of revisions",
    ],
    cta: "Start a web app",
    need: "Web app",
  },
  {
    id: "tier-platform",
    name: "Custom platform",
    for: "For organisations with complex systems, integrations or sensitive data.",
    price: "R50 000",
    time: "Timeline scoped together",
    items: [
      "Discovery workshop",
      "System architecture and API design",
      "Third-party integrations",
      "Security review before launch",
      "Deployment and handover documents",
    ],
    cta: "Plan a platform",
    need: "Web app",
  },
];

export type Tier = (typeof TIERS)[number] & { badge?: string; featured?: boolean };

export const PAYMENT_STEPS = [
  { title: "Free consultation", text: "Tell us what you need. We ask questions, suggest options and give an honest view of what's realistic." },
  { title: "Fixed quote", text: "You get a written scope, timeline and price. The price you agree to is the price you pay." },
  { title: "50% to start", text: "A deposit books your slot and we begin design, with regular check-ins along the way." },
  { title: "50% at launch", text: "The balance is due when you've approved the finished work and it's live." },
];

export const FAQS = [
  {
    question: "Are these prices fixed?",
    answer: "They're starting points. After a free consultation we send a fixed quote for your project, and that's what you pay unless you ask for changes to the scope.",
  },
  {
    question: "What if my budget is smaller?",
    answer: "Tell us your budget up front. We'll suggest what can realistically be built for it, or how to launch a smaller first version and grow it later.",
  },
  {
    question: "Who owns the code and designs?",
    answer: "You do. Once the final payment is made, we hand over the code, the design files and access to every account.",
  },
  {
    question: "What happens after launch?",
    answer: "Every project includes 30 days of free bug fixes. After that, you can join a monthly care plan or get in touch whenever you need us.",
  },
  {
    question: "Do you work with students and startups?",
    answer: "Yes. Some of our favourite projects started as one person's idea. We're happy to help you work out what to build first.",
  },
];
