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
  headline: string;
  /** Intro paragraph, with optional inline links. */
  intro: RichText;
  avatar: ImageRef;
  /** Optional full-bleed banner image behind the top of the hero. */
  banner?: ImageRef;
  /** Optional quote overlaid on the banner image. */
  bannerQuote?: string;
  availability: Availability;
  primaryCta: Link;
  secondaryCta?: Link;
}

export interface BannerQuote {
  text: string;
  /** Optional attribution / source. */
  cite?: string;
}

export interface Story {
  /** Micro-label above the section. */
  label: string;
  paragraphs: RichText[];
  resume?: Link;
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
  bannerQuote: BannerQuote;
  story: Story;
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
    name: "[Your Name]",
    title: "[Your Name] — [Role]",
    description:
      "[One or two sentences describing who you are and what you build. This is your search + social preview text.]",
    url: "https://example.com",
    locale: "en_US",
    ogAlt: "[Your Name] — [Role]",
    twitter: "@yourhandle",
  },

  socials: [
    { platform: "github", label: "GitHub", href: "https://github.com/[username]", handle: "@[username]" },
    { platform: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/[username]" },
    { platform: "x", label: "X", href: "https://x.com/[username]", handle: "@[username]" },
    { platform: "email", label: "Email", href: "mailto:[you@example.com]" },
    { platform: "resume", label: "Résumé", href: "/resume.pdf" },
  ],

  hero: {
    name: "[Your Name]",
    meta: "[Age] • [Short role, e.g. Founder of Acme]",
    headline: "[A one-line positioning statement people remember you by.]",
    intro: [
      "[Open with a sharp sentence about what you do.] Currently building ",
      { text: "[Project A]", href: "https://example.com" },
      " and ",
      { text: "[Project B]", href: "https://example.com" },
      ". [Add a couple of lines about the kind of work you take on, who it helps, and the outcome you aim for — enough to give a reader the shape of you without a wall of text.]",
    ],
    avatar: {
      src: "/avatar.jpg",
      alt: "[Portrait of Your Name]",
      width: 96,
      height: 96,
    },
    banner: {
      src: "/hero-banner.jpg",
      alt: "", // decorative background image
      width: 1200,
      height: 480,
    },
    bannerQuote: "[A short line that sets the tone for the whole site.]",
    availability: {
      available: true,
      label: "Available for select work",
    },
    primaryCta: { label: "Book a call", href: "mailto:[you@example.com]" },
    secondaryCta: { label: "View résumé", href: "/resume.pdf", external: true },
  },

  bannerQuote: {
    text: "[One pulled quote, treated as a typographic moment — a line that captures how you think about your craft.]",
    cite: undefined,
  },

  story: {
    label: "About",
    paragraphs: [
      [
        "[First paragraph — the throughline of your work. What problem you keep coming back to, and why it matters to you.]",
      ],
      [
        "[Second paragraph — how you work, or a turning point that shaped your approach. Reference ",
        { text: "a project", href: "https://example.com" },
        " or moment that made it concrete.]",
      ],
      [
        "[Optional third paragraph — where you are now and where you're headed.]",
      ],
    ],
    resume: { label: "Download résumé", href: "/resume.pdf", external: true },
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
    note: "© {year} [Your Name]. All rights reserved.",
    builtWith: "Built with Next.js & Tailwind. Deployed on Vercel.",
    links: [
      { label: "GitHub", href: "https://github.com/[username]", external: true },
      { label: "LinkedIn", href: "https://linkedin.com/in/[username]", external: true },
      { label: "Email", href: "mailto:[you@example.com]" },
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
