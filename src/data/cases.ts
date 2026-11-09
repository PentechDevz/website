import work1 from "../assets/images/work-1.jpg";
import work2 from "../assets/images/work-2.jpg";
import work3 from "../assets/images/work-3.jpg";
import work4 from "../assets/images/work-4.jpg";

// Shared by the home page work list and the case studies page.
export const CASES = [
  {
    id: "sports-app",
    title: "Sports Performance App",
    type: "Health & fitness",
    year: "2025",
    image: work1,
    alt: "Grayscale glass towers seen from below at night",
    summary: "An app that helps athletes and coaches track training and see progress across a season.",
    steps: [
      { label: "The problem", text: "Coaches tracked sessions in notebooks and group chats, so progress was hard to see and easy to lose." },
      { label: "What we built", text: "A web app where athletes log sessions and coaches see each player's load, trends and goals on one dashboard." },
      { label: "The outcome", text: "Coaches plan the week from real data, and athletes see their own progress at a glance." },
    ],
    stack: ["React", "Node.js", "PostgreSQL", "Figma"],
  },
  {
    id: "digifikile",
    title: "Digifikile",
    type: "Gamified experience",
    year: "2025",
    image: work2,
    alt: "Dark glass facade with vertical lines",
    summary: "A gamified experience that turns building digital skills into a series of short challenges.",
    steps: [
      { label: "The problem", text: "Learners were dropping out of long, text-heavy courses before they finished them." },
      { label: "What we built", text: "Bite-sized challenges with points, levels and streaks, designed to run smoothly on low-cost phones." },
      { label: "The outcome", text: "Learners come back to finish the next level, not just the next lesson." },
    ],
    stack: ["Vue.js", "TypeScript", "Django", "MongoDB"],
  },
  {
    id: "tut-guide",
    title: "TUT Guide",
    type: "Campus guide",
    year: "2025",
    image: work3,
    alt: "Dark brick wall with repeating vertical columns",
    summary: "A campus guide that helps new students find buildings, services and their way around.",
    steps: [
      { label: "The problem", text: "New students struggled to find lecture venues and student services across a large campus." },
      { label: "What we built", text: "A searchable map and directory of buildings, offices and services, with step-by-step directions." },
      { label: "The outcome", text: "First-years spend less time lost and more time where they need to be." },
    ],
    stack: ["Next.js", "TypeScript", "Spring Boot", "MySQL"],
  },
  {
    id: "docsecure",
    title: "DocSecure",
    type: "Certification platform",
    year: "2025",
    image: work4,
    alt: "Dimly lit archway with a faint glow",
    summary: "A platform for issuing and verifying certificates, so anyone can check a document is genuine.",
    steps: [
      { label: "The problem", text: "Paper certificates were easy to forge and slow to verify, often taking calls and emails back and forth." },
      { label: "What we built", text: "Digital certificates with a unique code, plus a public page where anyone can verify one instantly." },
      { label: "The outcome", text: "Employers can check a certificate in seconds instead of days." },
    ],
    stack: ["C#", "ASP.NET", "SQL Server", "React"],
  },
];

export type CaseStudy = (typeof CASES)[number];
