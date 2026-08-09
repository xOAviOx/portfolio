import Image from "next/image";
import type { CSSProperties } from "react";
import { site } from "@/content/site.config";
import { Section } from "@/components/Section";

/**
 * Tech stack grouped by category (never one flat blob). Each item renders as a
 * chip; an optional `icon` path shows a logo, otherwise the name stands alone.
 */
export function Stack() {
  const { stack } = site;
  if (stack.groups.length === 0) return null;

  return (
    <Section id="stack" label={stack.label} description={stack.description}>
      <div className="space-y-6">
        {stack.groups.map((group, gi) => (
          <div
            key={group.category}
            data-reveal
            style={{ "--reveal-delay": `${gi * 70}ms` } as CSSProperties}
            className="grid gap-2 sm:grid-cols-[130px_1fr] sm:gap-6"
          >
            <h3 className="section-label pt-2">{group.category}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--accent)_45%,var(--border))] hover:bg-surface-2"
                >
                  {item.icon && (
                    <Image
                      src={item.icon}
                      alt=""
                      width={16}
                      height={16}
                      className="h-4 w-4"
                    />
                  )}
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
