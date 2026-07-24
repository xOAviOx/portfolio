import Link from "next/link";
import { site } from "@/content/site.config";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Slim top bar shared across all routes: wordmark home link on the left, theme
 * toggle on the right. Deliberately quiet — the hero carries the social row.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/80 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-3 sm:px-10">
        <Link
          href="/"
          className="font-serif text-[0.98rem] tracking-tight transition-colors hover:text-accent"
        >
          {site.meta.name}
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
