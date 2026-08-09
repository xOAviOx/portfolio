import type { CSSProperties } from "react";
import { site, type ExperienceItem } from "@/content/site.config";
import { Section } from "@/components/Section";
import { ArrowUpRight } from "@/components/icons";

/**
 * A calm vertical timeline of roles. A single hairline rail threads the whole
 * history with an amber node per entry — the one warm signal, reused from the
 * rest of Nocturne. Every field except role/company/period is optional, so an
 * entry scales from a one-liner to a full write-up without breaking rhythm.
 */
function ExperienceEntry({
  item,
  isLast,
  index,
}: {
  item: ExperienceItem;
  isLast: boolean;
  index: number;
}) {
  return (
    <li
      data-reveal
      className="relative pb-9 pl-8 last:pb-0"
      style={{ "--reveal-delay": `${Math.min(index, 4) * 60}ms` } as CSSProperties}
    >
      {/* Rail: connects this node to the next entry. */}
      {!isLast && (
        <span
          aria-hidden
          className="absolute bottom-0 left-[4px] top-5 w-px bg-line"
        />
      )}
      {/* Node: ringed in the page background so it cleanly cuts the rail. */}
      <span
        aria-hidden
        className="absolute left-0 top-[6px] size-[9px] rounded-full bg-accent ring-4 ring-background"
      />

      <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-muted">
        {item.period}
      </p>

      <h3 className="mt-1.5 font-serif text-lg leading-tight text-ink">
        {item.role}
      </h3>

      <p className="mt-0.5 text-[0.9rem] text-muted">
        {item.companyUrl ? (
          <a
            href={item.companyUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center gap-1 text-ink transition-colors hover:text-accent"
          >
            {item.company}
            <ArrowUpRight
              width={12}
              height={12}
              className="opacity-0 transition-opacity group-hover:opacity-100"
            />
          </a>
        ) : (
          <span className="text-ink">{item.company}</span>
        )}
        {item.location && <span> · {item.location}</span>}
      </p>

      {item.description && (
        <p className="mt-3 max-w-prose text-[0.92rem] leading-relaxed text-muted">
          {item.description}
        </p>
      )}

      {item.highlights && item.highlights.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {item.highlights.map((highlight, i) => (
            <li
              key={i}
              className="flex gap-2.5 text-[0.9rem] leading-relaxed text-muted"
            >
              <span
                aria-hidden
                className="mt-[0.5rem] size-1 shrink-0 rounded-full bg-accent"
              />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      )}

      {item.tags && item.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line px-2 py-0.5 font-mono text-[0.68rem] uppercase tracking-wide text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export function Experience() {
  const { experience } = site;
  if (experience.items.length === 0) return null;

  return (
    <Section
      id="experience"
      label={experience.label}
      description={experience.description}
    >
      <ol className="mt-1">
        {experience.items.map((item, i) => (
          <ExperienceEntry
            key={`${item.company}-${item.role}`}
            item={item}
            isLast={i === experience.items.length - 1}
            index={i}
          />
        ))}
      </ol>
    </Section>
  );
}
