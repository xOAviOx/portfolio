import type { SVGProps } from "react";
import type { SocialPlatform } from "@/content/site.config";

/**
 * Hand-rolled inline SVG icons. No icon library — keeps the bundle tiny and
 * every stroke intentional. All inherit `currentColor` and take standard SVG
 * props so callers control size via width/height or className.
 */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function GithubIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6 0C6.2 3.3 5.1 3.6 5.1 3.6a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 3.7 10c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V22" />
    </svg>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-11h4v1.5A6 6 0 0 1 16 8z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4l16 16M20 4L4 20" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function FileIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z" />
    </svg>
  );
}

export function BlueskyIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 10.8C10.7 8.4 7.5 4.9 5 4.2 3.4 3.7 2 4.6 2 6.7c0 1.7 1 5.4 1.6 6C4.4 13.7 6.7 14 9 13.6c-2.3.4-4.3 1-1.2 4.3 3.4 3.4 4.7-.9 5.2-2.4.5 1.5 1.8 5.8 5.2 2.4 3.1-3.3 1.1-3.9-1.2-4.3 2.3.4 4.6.1 5.4-.9.6-.6 1.6-4.3 1.6-6 0-2.1-1.4-3-3-2.5-2.5.7-5.7 4.2-7 6.6z" />
    </svg>
  );
}

export function YoutubeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="m10 9 5 3-5 3z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" />
    </svg>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

export function GitBranchIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="7" r="2.5" />
      <path d="M6 8.5v7M18 9.5a6 6 0 0 1-6 6H8.5" />
    </svg>
  );
}

/** Maps a social platform to its icon component. */
export function SocialIcon({
  platform,
  ...props
}: { platform: SocialPlatform } & IconProps) {
  switch (platform) {
    case "github":
      return <GithubIcon {...props} />;
    case "linkedin":
      return <LinkedinIcon {...props} />;
    case "x":
      return <XIcon {...props} />;
    case "email":
      return <MailIcon {...props} />;
    case "resume":
      return <FileIcon {...props} />;
    case "website":
      return <GlobeIcon {...props} />;
    case "bluesky":
      return <BlueskyIcon {...props} />;
    case "youtube":
      return <YoutubeIcon {...props} />;
    case "instagram":
      return <InstagramIcon {...props} />;
    default:
      return <GlobeIcon {...props} />;
  }
}
