import boitumelo from "../assets/images/team/boitumelo.jpeg";
import siphelele from "../assets/images/team/siphelele.jpeg";
import sihle from "../assets/images/team/sihle.jpeg";
import chantelle from "../assets/images/team/chantelle.jpeg";
import umenelisi from "../assets/images/team/umenelisi.jpeg";

// The ids are the original page anchors, kept so old links still land on the right person.
export const TEAM = [
  {
    id: "lerato",
    name: "Boitumelo",
    role: "Front-end & UI/UX",
    photo: boitumelo,
    quote: "I start with words, not shapes. If we can't say what a brand stands for in one sentence, no logo is going to save it.",
    stack: [
      { label: "Languages", value: "HTML, CSS, JavaScript, TypeScript" },
      { label: "Frameworks", value: "React, Tailwind CSS, Vue.js" },
      { label: "Design", value: "Figma, wireframing, prototyping" },
    ],
    tools: ["Figma", "VS Code", "GitHub"],
    brief: {
      title: "Watch a morning at reception.",
      text: "Before drawing a single screen, I'd see how patients book today, who struggles and on what phones. Then I'd wireframe the shortest path from “I'm sick” to “I'm booked”.",
      output: "Clickable Figma wireframes we can test with real patients.",
    },
  },
  {
    id: "sipho",
    name: "Siphelele",
    role: "Full-stack",
    photo: siphelele,
    quote: "Everything moves eventually, on a screen, on a shelf or in someone's memory. I design for the moment something changes.",
    stack: [
      { label: "Front-end", value: "React, TypeScript, JavaScript" },
      { label: "Back-end", value: "Node.js, Express,C#, ASP.NET" },
      { label: "Database", value: "PostgreSQL, MySQL, MongoDB, Microsoft SQL Server" },
    ],
    tools: ["VS Code", "GitHub", "Postman"],
    brief: {
      title: "Sketch the whole system on one page.",
      text: "Patients, staff, time slots, reminders. I'd map how data moves from the booking form to the clinic's daily list, then pick the simplest stack that holds it all together.",
      output: "A system diagram and an end-to-end prototype.",
    },
  },
  {
    id: "naledi",
    name: "Sihle",
    role: "Full-stack",
    photo: sihle,
    quote: "A design isn't finished until it works on a cracked phone with one bar of signal. That's where I do my best thinking.",
    stack: [
      { label: "Front-end", value: "Next.js, TypeScript, JavaScript, Vue.js, Java" },
      { label: "Back-end", value: "Node.js, REST APIs, C#, ASP.NET" },
      { label: "Database", value: "MongoDB, PostgreSQL, MySQL, Microsoft SQL Server" },
    ],
    tools: ["VS Code", "GitHub", "Docker"],
    brief: {
      title: "Build the thinnest working version.",
      text: "One clinic, one doctor, one day of slots. I'd get a real booking through, front to back, in the first week, then grow it from there.",
      output: "A live booking flow the clinic staff can try themselves.",
    },
  },
  {
    id: "kabelo",
    name: "Chantelle",
    role: "Front-end",
    photo: chantelle,
    quote: "My job is asking the awkward question early, so nobody has to ask it at launch.",
    stack: [
      { label: "Languages", value: "HTML, CSS, JavaScript, TypeScript, Java" },
      { label: "Frameworks", value: "React, Bootstrap, Vue.js" },
      { label: "Styling", value: "Sass, responsive layouts" },
    ],
    tools: ["VS Code", "Figma", "GitHub", "Chrome DevTools"],
    brief: {
      title: "Make it work on any phone.",
      text: "Many patients will book on older phones with patchy data. I'd build light, accessible screens that load fast and stay readable for everyone, including people who rarely go online.",
      output: "Responsive booking screens tested on low-end devices.",
    },
  },
  {
    id: "thandi",
    name: "Umenelisi",
    role: "Back-end",
    photo: umenelisi,
    quote: "I draw to think. Half my best ideas turn up in the margins of something else.",
    stack: [
      { label: "Languages", value: "Python, Java, C#, JavaScript" },
      { label: "Frameworks", value: "Django, Spring Boot, ASP.NET" },
      { label: "Database", value: "PostgreSQL, MySQL, MongoDB, Microsoft SQL Server" },
    ],
    tools: ["Postman", "Docker", "GitHub"],
    brief: {
      title: "Design the data before the screens.",
      text: "Double bookings and lost records are what break trust. I'd model patients, slots and appointments first, lock down who can see medical details, and build the API around that.",
      output: "A database schema and a documented, secure booking API.",
    },
  },
];

export type TeamMember = (typeof TEAM)[number];
