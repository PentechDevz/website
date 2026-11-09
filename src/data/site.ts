export const EMAIL = "info@pentechdevs.com";

export type NavItem = { label: string; to: string };

export const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/pentechdevs/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/pentech-devs-350a38447" },
  { label: "TikTok", href: "https://www.tiktok.com/@pentech.devs" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61595977352845" },
];

export const MENU_GROUPS = [
  {
    label: "About Us",
    links: [
      { to: "/collective", title: "Collective Solutions", desc: "What Pentech Devs is about and how it started" },
      { to: "/perspectives", title: "Individual Perspectives", desc: "Take a look at how we individually approach our work" },
    ],
  },
  {
    label: "Our Work",
    links: [
      { to: "/services", title: "Services", desc: "What we build and how we can help" },
      { to: "/case-studies", title: "Case Studies", desc: "A closer look at projects we've delivered" },
    ],
  },
  {
    label: "Our Process",
    links: [
      { to: "/testimonies", title: "Testimonies", desc: "What our clients say about working with us" },
      { to: "/pricing", title: "Pricing", desc: "Packages, prices and how payment works" },
    ],
  },
];
