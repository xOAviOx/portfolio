import { site } from "@/content/site.config";
import { ArrowUpRight } from "./icons";

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

/** Minimal footer. Shared across routes via the layout. */
export function Footer() {
  const note = site.footer.note.replace("{year}", String(new Date().getFullYear()));

  return (
    <footer className="border-t border-line px-6 py-10 sm:px-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted">{note}</p>
          {site.footer.builtWith && (
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-faint">
              {site.footer.builtWith}
            </p>
          )}
        </div>
        {site.footer.links.length > 0 && (
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            {site.footer.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-ink"
                {...(isExternal(link.href)
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
              >
                {link.label}
                <ArrowUpRight
                  width={13}
                  height={13}
                  className="opacity-0 transition-opacity group-hover:opacity-60"
                />
              </a>
            ))}
          </nav>
        )}
      </div>
    </footer>
  );
}
