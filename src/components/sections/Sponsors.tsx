import Image from "next/image";
import { site } from "@/content/site.config";
import { Section } from "@/components/Section";

/**
 * A quiet clients/sponsors strip. Self-hides when the config array is empty.
 * A sponsor with no `logo` renders as a clean muted wordmark, so no image
 * asset is required to look complete.
 */
export function Sponsors() {
  const { sponsors } = site;
  if (sponsors.items.length === 0) return null;

  return (
    <Section id="clients" label={sponsors.label} description={sponsors.description}>
      <ul className="flex flex-wrap items-center gap-x-8 gap-y-5">
        {sponsors.items.map((sponsor) => {
          const inner = sponsor.logo ? (
            <Image
              src={sponsor.logo.src}
              alt={sponsor.logo.alt}
              width={sponsor.logo.width ?? 120}
              height={sponsor.logo.height ?? 32}
              className="h-6 w-auto opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
            />
          ) : (
            <span className="font-serif text-lg text-muted transition-colors hover:text-ink">
              {sponsor.name}
            </span>
          );

          return (
            <li key={sponsor.name}>
              {sponsor.url ? (
                <a
                  href={sponsor.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={sponsor.name}
                >
                  {inner}
                </a>
              ) : (
                inner
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
