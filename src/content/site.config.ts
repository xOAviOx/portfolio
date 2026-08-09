/**
 * ============================================================================
 *  SITE CONTENT — SINGLE SOURCE OF TRUTH
 * ============================================================================
 *  Every section on the site reads from this file. No component hardcodes copy,
 *  links, or data. To make the site yours, edit the values below — you should
 *  never need to touch JSX.
 *
 *  Placeholder content is wrapped in [square brackets] so it is obvious what
 *  still needs replacing. Sections whose arrays are empty hide themselves.
 * ============================================================================
 */

/* ------------------------------------------------------------------ */
/* Shared primitives                                                   */
/* ------------------------------------------------------------------ */

/** A run of text that may contain inline links (used for rich paragraphs). */
export type RichText = Array<string | { text: string; href: string }>;

export interface ImageRef {
  /** Path under /public or a remote URL allowed in next.config.mjs. */
  src: string;
  /** Real, descriptive alt text. Empty string only for decorative images. */
  alt: string;
  width?: number;
  height?: number;
}

export interface Link {
  label: string;
  href: string;
  /** Marks the link as pointing off-site (renders an external-link affordance). */
  external?: boolean;
}

export type SocialPlatform =
  | "github"
  | "linkedin"
  | "x"
  | "email"
  | "resume"
  | "website"
  | "bluesky"
  | "youtube"
  | "instagram";

export interface Social {
  platform: SocialPlatform;
  label: string;
  href: string;
  /** Optional display handle, e.g. "@yourname". */
  handle?: string;
}

/* ------------------------------------------------------------------ */
/* Section shapes                                                      */
/* ------------------------------------------------------------------ */

export interface SiteMeta {
  /** Used in <title>, OG tags, and the sitemap. No trailing slash on url. */
  name: string;
  title: string;
  description: string;
  /** Absolute site URL, e.g. "https://yourname.com". */
  url: string;
  /** Two-letter locale, e.g. "en_US". */
  locale: string;
  /** Fallback OG/Twitter image alt. */
  ogAlt: string;
  /** Optional Twitter/X handle for the twitter:creator card. */
  twitter?: string;
}

export interface Availability {
  /** When true, renders a pulsing dot + label. When false, hidden. */
  available: boolean;
  label: string;
}

export interface Hero {
  name: string;
  /** Small line under the name, e.g. "Age • Role". */
  meta: string;
  /** One-line role / positioning statement. */
  headline?: string;
  /** Intro paragraph, with optional inline links. */
  intro?: RichText;
  avatar: ImageRef;
  /** Optional full-bleed banner image behind the top of the hero. */
  banner?: ImageRef;
  /** Optional quote overlaid on the banner image. */
  bannerQuote?: string;
  availability: Availability;
  primaryCta?: Link;
  secondaryCta?: Link;
}

export interface Story {
  /** Micro-label above the section. */
  label: string;
  paragraphs: RichText[];
  resume?: Link;
}

export interface ExperienceItem {
  role: string;
  company: string;
  /** Optional link to the company / employer. */
  companyUrl?: string;
  /** Human-readable range, e.g. "2024 — Present". */
  period: string;
  location?: string;
  description?: string;
  /** Optional achievement bullets. */
  highlights?: string[];
  /** Optional tech / skill tags. */
  tags?: string[];
}

export interface ExperienceSection {
  label: string;
  description?: string;
  /** Empty array → the whole section is hidden. */
  items: ExperienceItem[];
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  image?: ImageRef;
  /** A featured project occupies a wider cell in the grid. */
  featured?: boolean;
}

export interface ProjectsSection {
  label: string;
  description?: string;
  items: Project[];
}

export interface Sponsor {
  name: string;
  logo?: ImageRef;
  url?: string;
}

export interface SponsorsSection {
  label: string;
  description?: string;
  /** Empty array → the whole section is hidden. */
  items: Sponsor[];
}

export interface TechItem {
  name: string;
  /** Optional path to an SVG/logo under /public. */
  icon?: string;
}

export interface TechGroup {
  category: string;
  items: TechItem[];
}

export interface StackSection {
  label: string;
  description?: string;
  /** Grouped by category, never a flat blob. */
  groups: TechGroup[];
}

export interface GitHubSection {
  label: string;
  /** GitHub username for the contributions graph. */
  username: string;
  /** Revalidate window for the cached GraphQL fetch, in seconds. */
  revalidateSeconds: number;
}

export interface BlogSection {
  label: string;
  description?: string;
  /**
   * Number of posts to show inline on the home page. The full list lives at
   * /blog. Posts themselves come from content/posts/*.mdx — not this file.
   */
  maxInline: number;
}

export interface ContactSection {
  label: string;
  headline: string;
  description: RichText;
  email: string;
  cta: Link;
}

export interface FooterSection {
  /** e.g. "© {year} Your Name". The {year} token is replaced at render. */
  note: string;
  builtWith?: string;
  links: Link[];
}

/* ------------------------------------------------------------------ */
/* Root config type                                                    */
/* ------------------------------------------------------------------ */

export interface SiteConfig {
  meta: SiteMeta;
  /** Shown in the header icon row and reused in Contact. */
  socials: Social[];
  hero: Hero;
  story: Story;
  experience: ExperienceSection;
  projects: ProjectsSection;
  sponsors: SponsorsSection;
  stack: StackSection;
  github: GitHubSection;
  blog: BlogSection;
  contact: ContactSection;
  footer: FooterSection;
}

/* ============================================================================
 *  CONTENT — edit everything below.
 * ==========================================================================*/

export const site: SiteConfig = {
  meta: {
    name: "Avi Shukla",
    title: "Avi Shukla — Software Engineer | AI-Native Builder",
    description:
      "[One or two sentences describing who you are and what you build. This is your search + social preview text.]",
    url: "https://example.com",
    locale: "en_US",
    ogAlt: "Avi Shukla — Software Engineer | AI-Native Builder",
    twitter: "@yourhandle",
  },

  socials: [
    { platform: "github", label: "GitHub", href: "https://github.com/xOAviOx", handle: "@xOAviOx" },
    { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/avi-shukla-ba24a6213/" },
    { platform: "x", label: "X", href: "https://x.com/CircuitSage_", handle: "@CircuitSage_" },
    { platform: "email", label: "Email", href: "mailto:avishuklacode@gmail.com" },
    { platform: "resume", label: "Résumé", href: "/resume.pdf", external: true },
  ],

  hero: {
    name: "Avi Shukla",
    meta: "Software Engineer | AI-Native Builder",
    avatar: {
      src: "/profile_photo.png",
      alt: "Portrait of Avi Shukla",
      width: 96,
      height: 96,
    },
    banner: {
      src: "/hero-banner.jpg",
      alt: "", // decorative background image
      width: 1200,
      height: 480,
    },
    bannerQuote: "The best way to predict the future is to invent it. — Alan Kay",
    availability: {
      available: true,
      label: "Available for select work",
    },
  },

  story: {
    label: "About",
    paragraphs: [
      [
        "I build things people actually use, and I tend to build the whole thing, the part you see, the backend behind it, and the infrastructure keeping it up. I've learned the hard way that the problems worth solving usually hide where those pieces meet.",
      ],
      [
        "That's what keeps pulling me toward the harder stuff: ",
        { text: "orchestration tooling", href: "https://github.com/xOAviOx/maestro" },
        ", a ",
        { text: "self-hosted PaaS", href: "https://github.com/xOAviOx/gantry" },
        ", ",
        { text: "voice systems", href: "https://sunniva.info" },
        " handling real calls in production. Some of it ships commercially through Sunniva AI, where I run the engineering.",
      ],
      [
        "I'm looking for a team working on something genuinely hard, where you own what you build and it actually reaches people.",
      ],
    ],
    resume: { label: "Download résumé", href: "/resume.pdf", external: true },
  },

  experience: {
    label: "Experience",
    items: [
      {
        role: "Co-Founder",
        company: "Sunniva AI",
        companyUrl: "https://sunniva.info",
        period: "Mar 2026 — Present",
        location: "Remote",
        description:
          "Part of the founding team at Sunniva AI, working across technical implementation, business operations, client acquisition, recruitment, and project delivery.",
        highlights: [
          "Built and deployed AI voice agents and automation workflows handling real calls in production.",
          "Coordinated across sales, recruitment, client delivery, and technical implementation as an early-stage team.",
          "Helping businesses improve lead handling, customer support, and operational efficiency through AI-powered automation.",
        ],
      },
      {
        role: "Back End Developer",
        company: "Stealth Startup",
        period: "Mar 2025 — May 2025",
        location: "Remote",
        description:
          "Built and maintained backend systems for an early-stage stealth startup, working closely with a small founding team to ship quickly.",
        highlights: [
          "Developed backend services and APIs using Node.js and Python, powering the product's core functionality.",
          "Designed and managed data layers with PostgreSQL for relational storage and Redis for caching, sessions, and fast lookups.",
          "Built scalable, reliable server-side infrastructure to support the product as it grows.",
        ],
      },
      {
        role: "Co-Founder",
        company: "Type7Web",
        period: "Aug 2023 — Dec 2024",
        location: "Remote",
        description:
          "Founded and ran Type7Web, a web design and development agency helping businesses establish and grow their online presence — end-to-end from design and build to launch.",
        highlights: [
          "Designed and developed custom websites for clients across industries, handling everything from layout and copy to deployment.",
          "Created and sold a library of website templates, turning one-off design work into a repeatable, scalable product.",
          "Handled the full client lifecycle solo: sales, design, development, and delivery.",
        ],
      },
      {
        role: "Frontend Developer Intern",
        company: "KR GROUP LTD",
        period: "Mar 2023 — Jul 2023",
        location: "Remote",
        description:
          "Built frontend interfaces and contributed to web development projects across a part-time internship.",
      },
      {
        role: "Full Stack Developer",
        company: "Dendrite AI",
        period: "Mar 2023 — May 2023",
        location: "Remote",
        description:
          "Designed and implemented end-to-end features across the frontend and backend for scalable web applications.",
        highlights: [
          "Built modular, reusable UI components and ensured responsiveness across devices.",
        ],
      },
      {
        role: "Web Development Intern",
        company: "Techniera Incorporation",
        period: "Sep 2022 — Nov 2022",
        location: "Remote",
        description:
          "Translated design requirements into clean, responsive, and functional web pages.",
        highlights: [
          "Improved website usability and performance through debugging and optimisation.",
        ],
      },
      {
        role: "Full-Stack Developer",
        company: "Massold Technologies",
        period: "Mar 2022 — May 2022",
        location: "Remote",
        description:
          "Built and optimised both frontend and backend features using modern JavaScript technologies, integrated APIs and handled database operations.",
      },
    ],
  },

  projects: {
    label: "Proof of Work",
    description: "[A short line framing the projects below.]",
    items: [
      {
        title: "[Flagship Project]",
        description:
          "[One line on what it is and the impact — the kind of detail that earns a click.]",
        tags: ["Next.js", "TypeScript", "Postgres"],
        liveUrl: "https://example.com",
        repoUrl: "https://github.com/[username]/[repo]",
        image: { src: "/projects/project-1.jpg", alt: "[Screenshot of Flagship Project]", width: 1200, height: 750 },
        featured: true,
      },
      {
        title: "[Project Two]",
        description: "[One-line description of what it does and for whom.]",
        tags: ["React", "Tailwind"],
        liveUrl: "https://example.com",
        repoUrl: "https://github.com/[username]/[repo]",
        image: { src: "/projects/project-2.jpg", alt: "[Screenshot of Project Two]", width: 1200, height: 750 },
      },
      {
        title: "[Project Three]",
        description: "[One-line description of what it does and for whom.]",
        tags: ["Node", "Prisma"],
        liveUrl: "https://example.com",
        repoUrl: "https://github.com/[username]/[repo]",
        image: { src: "/projects/project-3.jpg", alt: "[Screenshot of Project Three]", width: 1200, height: 750 },
      },
      {
        title: "[Project Four]",
        description: "[One-line description of what it does and for whom.]",
        tags: ["Python", "FastAPI"],
        repoUrl: "https://github.com/[username]/[repo]",
        image: { src: "/projects/project-4.jpg", alt: "[Screenshot of Project Four]", width: 1200, height: 750 },
      },
    ],
  },

  // Empty the `items` array to hide this whole section. With no `logo`, a name
  // renders as a clean text wordmark — no image asset required.
  sponsors: {
    label: "Trusted by",
    description: "[Teams and clients I've built with.]",
    items: [
      { name: "[Client One]", url: "https://example.com" },
      { name: "[Client Two]", url: "https://example.com" },
      { name: "[Client Three]" },
      { name: "[Client Four]" },
      { name: "[Client Five]" },
    ],
  },

  stack: {
    label: "Stack I use",
    description: "[Technologies I reach for to build products that solve real problems.]",
    groups: [
      {
        category: "Languages",
        items: [
          { name: "TypeScript" },
          { name: "JavaScript" },
          { name: "Python" },
          { name: "SQL" },
        ],
      },
      {
        category: "Frameworks",
        items: [{ name: "React" }, { name: "Next.js" }, { name: "Node.js" }],
      },
      {
        category: "Data & Infra",
        items: [{ name: "Postgres" }, { name: "Prisma" }, { name: "Vercel" }, { name: "Docker" }],
      },
      {
        category: "Craft",
        items: [{ name: "Tailwind CSS" }, { name: "Figma" }, { name: "Framer Motion" }],
      },
    ],
  },

  github: {
    label: "GitHub Contributions",
    username: "[username]",
    revalidateSeconds: 60 * 60 * 6, // 6 hours
  },

  blog: {
    label: "Writing",
    description: "[Occasional notes on building, design, and the work.]",
    maxInline: 4,
  },

  contact: {
    label: "Let's connect",
    headline: "[If you've read this far, you might like what I do.]",
    description: [
      "[One line inviting the right kind of message — a project, a role, or just to trade notes.] Reach me at ",
      { text: "[you@example.com]", href: "mailto:[you@example.com]" },
      ".",
    ],
    email: "[you@example.com]",
    cta: { label: "Book a free call", href: "mailto:[you@example.com]" },
  },

  footer: {
    note: "© {year} Avi Shukla. All rights reserved.",
    builtWith: "Built with Next.js & Tailwind. Deployed on Vercel.",
    links: [
      { label: "GitHub", href: "https://github.com/xOAviOx", external: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/avi-shukla-ba24a6213/", external: true },
      { label: "Email", href: "mailto:avishuklacode@gmail.com" },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Convenience selectors (so components import intent, not deep paths)  */
/* ------------------------------------------------------------------ */

export const hasSponsors = site.sponsors.items.length > 0;
export const hasProjects = site.projects.items.length > 0;
export const getSocial = (platform: SocialPlatform) =>
  site.socials.find((s) => s.platform === platform);
