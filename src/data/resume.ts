/**
 * Single source of truth for every word on the site.
 * Components only render what's in here — edit this file to update content.
 *
 * Search for "TODO" to find content that still needs filling in.
 */

// ─── Types ──────────────────────────────────────────────────────────────────

export interface Link {
  label: string;
  href: string;
}

export interface Avatar {
  /** Fallback image (under /public). */
  src: string;
  /** Responsive candidates, e.g. "/avatar-224.webp 224w, …". */
  srcSet: string;
  /** Intrinsic size of `src`, used to reserve space (no layout shift). */
  width: number;
  height: number;
  alt: string;
}

export interface PoemLine {
  text: string;
  /** Optional link rendered right after `text`. */
  link?: Link;
}

export interface Profile {
  name: string;
  /** Online handle used across GitHub, email and LinkedIn. */
  handle: string;
  /** Short monogram shown in the header. */
  initials: string;
  avatar: Avatar;
  /** The hero poem, printed as the output of `$ whoami`. */
  whoami: PoemLine[];
  title: string;
  /** One-line pitch shown under the title in the hero. */
  pitch: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  /** Résumé link: an external page (opens in a new tab) or a path under /public (downloaded). */
  resumeUrl: string;
  /** Source repo for this site, linked from the footer. */
  sourceUrl: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface ClientProject {
  name: string;
  url: string;
  description: string;
}

export interface Job {
  role: string;
  company: string;
  location: string;
  /** Human-readable, e.g. "Jun 2025". */
  start: string;
  /** Human-readable, or "Present". */
  end: string;
  highlights: string[];
  clientProjects?: ClientProject[];
}

export interface Project {
  name: string;
  tagline: string;
  /** Live product URL. Omit if there isn't a public one yet. */
  url?: string;
  version?: string;
  featured?: boolean;
  points: string[];
  stack: string[];
  /** Related write-ups (e.g. blog posts). */
  writeUps?: Link[];
  /** Public source / demo repository. */
  repo?: Link;
  /** Small label like "Freelance client work". */
  note?: string;
}

export interface Post {
  title: string;
  url: string;
}

export interface Education {
  degree: string;
  institution: string;
  start: string;
  end: string;
  grade: string;
}

export interface Resume {
  profile: Profile;
  summary: string;
  skills: SkillGroup[];
  experience: Job[];
  projects: Project[];
  writing: Post[];
  education: Education[];
  /** Short line shown in the Contact section. */
  contactBlurb: string;
}

// ─── Content ────────────────────────────────────────────────────────────────

export const resume: Resume = {
  profile: {
    name: "Shrinath Poojary",
    handle: "Shrin210",
    initials: "SP",
    avatar: {
      src: "/avatar-352.webp",
      srcSet: "/avatar-224.webp 224w, /avatar-352.webp 352w, /avatar-528.webp 528w",
      width: 352,
      height: 528,
      alt: "Illustrated portrait of Shrinath in a checked shirt, with palm trees and an ornate golden gateway behind",
    },
    whoami: [
      { text: "Hey 👋 I'm Shrinath here," },
      { text: "Ideas to apps, I engineer." },
      { text: "Code I craft, explore with cheer," },
      { text: "My GitHub trails are waiting ", link: { label: "Here", href: "https://github.com/Shrin210-98" } },
    ],
    title: "Full-Stack Developer — React · Go · Flutter",
    // Condensed from the summary below — reword freely. (Currently not shown on the page.)
    pitch:
      "I build business internal tools that streamline complex workflows — React frontends, Go + PostgreSQL backends and Flutter mobile apps.",
    location: "Mumbai, India",
    email: "shrin210@zohomail.in",
    github: "https://github.com/Shrin210-98",
    linkedin: "https://www.linkedin.com/in/shrin210",
    resumeUrl: "https://shrin210-98.github.io/resume/",
    // Assumes the repo is created under the GitHub account above — update if not.
    sourceUrl: "https://github.com/Shrin210-98/shrinath-portfolio",
  },

  summary:
    "5+ years architecting and delivering end-to-end React.js frontends across Health/Insurance, Automobile, Logistics (Shipping/Trucking) and Education, specialising in business internal tools that streamline complex workflows. Now building Go + PostgreSQL backends and Flutter mobile apps.",

  skills: [
    {
      label: "Languages",
      items: ["JavaScript", "TypeScript", "Go", "Dart", "Python", "SQL", "HTML5", "CSS3"],
    },
    {
      label: "Frontend & Mobile",
      items: [
        "React",
        "Next.js",
        "Flutter",
        "TanStack (Router, Query, Table)",
        "Redux",
        "React Hook Form",
        "Zod",
        "Tailwind CSS",
        "shadcn/ui",
        "Radix UI",
      ],
    },
    {
      label: "Backend & APIs",
      items: ["Go (net/http, pgx, sqlc)", "Node.js", "REST", "GraphQL", "WebSocket", "SSE", "JWT"],
    },
    {
      label: "Databases & Cloud",
      items: [
        "PostgreSQL",
        "Firebase",
        "MongoDB",
        "Google Cloud Run",
        "Cloudflare Workers",
        "AWS (EC2, RDS, S3)",
        "Vercel",
        "Docker",
        "Nginx",
        "GitHub Actions",
      ],
    },
    {
      label: "Integrations",
      items: ["Shopify Storefront API", "Razorpay", "Firebase Cloud Messaging", "Google Maps"],
    },
    {
      label: "Tools",
      items: ["Git", "CI/CD", "Jest", "Vitest", "Postman", "Claude Code", "Agile/Scrum", "Linux"],
    },
  ],

  experience: [
    {
      role: "Freelance Mobile & Full-Stack Developer",
      company: "Self-employed",
      location: "Mumbai (Remote)",
      start: "Jun 2025",
      end: "Present",
      highlights: [
        "Built a cross-platform e-commerce app in Flutter (Dart) on Shopify's Storefront GraphQL API: catalogue, collections, cart and checkout.",
        "Integrated the Razorpay payment gateway for in-app payments.",
        "Upskilled in Go, PostgreSQL and cloud deployment on AWS and GCP, using GenAI tools (Claude Code, Google Gemini) to build CCMS Suite.",
      ],
    },
    {
      role: "Senior Frontend Developer",
      company: "Twelve Springs Limited",
      location: "London, UK",
      start: "Sep 2021",
      end: "May 2025",
      highlights: [
        "Built responsive, cross-browser React.js web apps for cloud environments.",
        "Integrated Java REST APIs, WebSockets and Firebase Cloud Messaging for real-time messaging, push notifications and synced data.",
        "Built reusable components and CI/CD pipelines with automation scripts, cutting development time by 30%.",
        "Applied memoization and code splitting; managed complex state with React Context.",
        "Mentored junior developers in React and modern JavaScript.",
      ],
      clientProjects: [
        {
          name: "Organizational Growth Platform",
          url: "https://www.myopen360.com",
          description: "SaaS with role-based access, real-time video calls and a management hierarchy.",
        },
        {
          name: "Auto Parts Communication Platform",
          url: "https://www.liveyards.com",
          description:
            "Real-time chat with image sharing, WebSocket P2P connectivity, bilingual UI (EN/ES), FCM push notifications.",
        },
        {
          name: "Educators Data Management Platform",
          url: "https://www.empoweringk12.com",
          description: "Led 2 developers; turned 20 Figma pages into a demo-ready React portal in 11 days.",
        },
      ],
    },
    {
      role: "Frontend Developer",
      company: "Technoark Solutions Pvt Ltd",
      location: "Mumbai",
      start: "Jun 2020",
      end: "Sep 2021",
      highlights: [
        "Built React.js apps with Material UI and Bootstrap.",
        "Integrated Java REST APIs; Google Maps with custom filters for live tracking.",
        "Built multi-step dynamic forms on MongoDB with drag-and-drop components.",
      ],
      clientProjects: [
        {
          name: "Insurance Verification System",
          url: "https://verifixed.io",
          description: "Dynamic dental insurance forms, filtered reports, PDF export, activity logging.",
        },
        {
          name: "Trucking Management Platform",
          url: "https://www.wmtrucking.net",
          description: "Real-time truck tracking on Google Maps and an admin portal with analytics.",
        },
      ],
    },
  ],

  projects: [
    {
      name: "CCMS Suite",
      tagline: "Multi-tenant SaaS for canteen and catering operators.",
      url: "https://app.ccms-suite.com",
      version: "v0.3.0",
      featured: true,
      points: [
        "Multi-tenancy: many customers in one shared PostgreSQL database, each kept isolated.",
        "Roles & permissions: nested permission tree with per-user overrides; JWT carries the tenant.",
        "Staff management & live chat over WebSockets.",
        "No ORM: plain SQL with sqlc-generated Go on pgx; invalid columns fail at code generation.",
        "End-to-end type safety from Postgres CHECK constraints through Go and JSON to TypeScript.",
      ],
      stack: [
        "Go",
        "PostgreSQL 18",
        "pgx",
        "sqlc",
        "Atlas",
        "React 19",
        "TypeScript",
        "Vite",
        "Tailwind v4",
        "TanStack",
        "Docker",
        "GitHub Actions",
        "Google Cloud Run",
        "Cloudflare Workers",
      ],
      writeUps: [
        {
          label: "Learning Go before letting AI write it",
          href: "https://www.ccms-suite.com/blog/learning-go-before-letting-ai-write-it",
        },
        {
          label: "No ORM & a CI that stops drift",
          href: "https://www.ccms-suite.com/blog/ci-migrations-sqlc-no-orm",
        },
        {
          label: "Stable full-stack code with Claude Code",
          href: "https://www.ccms-suite.com/blog/claude-code-stable-full-stack",
        },
      ],
      repo: {
        label: "Public demo (hand-written Go backend)",
        href: "https://github.com/Shrin210-98/CanteenCrowd-go-api",
      },
    },
  ],

  writing: [
    {
      title: "Learning Go, Postgres and System Design, before letting AI write it",
      url: "https://www.ccms-suite.com/blog/learning-go-before-letting-ai-write-it",
    },
    {
      title: "No ORM, and a CI that won't let the database drift",
      url: "https://www.ccms-suite.com/blog/ci-migrations-sqlc-no-orm",
    },
    {
      title: "Stable full-stack code with Claude Code: let the stack catch the mistakes",
      url: "https://www.ccms-suite.com/blog/claude-code-stable-full-stack",
    },
  ],

  education: [
    {
      degree: "BSc IT",
      institution: "Jai Hind College (Mumbai University)",
      start: "2016",
      end: "2019",
      grade: "CGPA 9.17",
    },
  ],

  contactBlurb: "Get in touch by email, or find me on LinkedIn and GitHub.",
};
