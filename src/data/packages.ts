export const DEALS = [
  {
    value: "student",
    amount: "30%",
    name: "Student deal",
    text: "For anyone currently studying at a university, college or TVET.",
    items: ["Valid student card or proof of registration", "Applies to any custom package", "Same team, same quality, same care"],
    cta: "Build with the student deal",
  },
  {
    value: "graduate",
    amount: "20%",
    name: "Graduate deal",
    text: "For anyone who finished their studies in the last 12 months and is job hunting.",
    items: ["Certificate or academic record from the last 12 months", "Applies to any custom package", "A free review of your CV content before launch"],
    cta: "Build with the graduate deal",
  },
];

export const BASES = [
  { value: "portfolio", label: "Portfolio site", price: 2500, desc: "Your projects, skills and story on one polished page." },
  { value: "cv", label: "CV website", price: 1500, desc: "Your CV as a clean link you can send to any recruiter." },
  { value: "landing", label: "Landing page", price: 2000, desc: "One page for a side project, event or small business." },
];

export const PAGE_PRICE = 400;
export const MAX_PAGES = 5;

export const ADDONS = [
  { label: "Contact form", price: 300, desc: "Messages go straight to your inbox." },
  { label: "Downloadable CV", price: 200, desc: "A matching PDF version of your CV." },
  { label: "Blog section", price: 800, desc: "Write about what you're learning and building." },
  { label: "Animations and interactions", price: 600, desc: "Scroll effects and details that make it memorable." },
  { label: "Light and dark mode", price: 300, desc: "Visitors choose the theme they prefer." },
  { label: "SEO and Google setup", price: 400, desc: "Help recruiters find you when they search your name." },
  { label: "Custom domain setup", price: 300, desc: "yourname.co.za connected and working. Domain cost not included." },
  { label: "Hosting for 12 months", price: 900, desc: "We keep it online, backed up and secure for a year." },
];

export const DEAL_OPTIONS = [
  { value: "none", name: "No deal", label: "No deal", desc: "Standard pricing.", tag: "0%", discount: 0 },
  { value: "student", name: "Student", label: "Student deal (30%)", desc: "Currently studying, with proof.", tag: "30% off", discount: 0.3 },
  { value: "graduate", name: "Graduate", label: "Graduate deal (20%)", desc: "Graduated in the last 12 months.", tag: "20% off", discount: 0.2 },
];
