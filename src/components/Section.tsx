import type { ReactNode } from "react";

/**
 * Consistent section rhythm: a hairline divider on top, a mono micro-label,
 * generous vertical padding. Every content section uses this so the whole page
 * shares one spacing cadence (matching the reference's calm density).
 */
export function Section({
  id,
  label,
  description,
  children,
  divider = true,
  labelAside,
}: {
  id?: string;
  label?: string;
  description?: string;
  children: ReactNode;
  divider?: boolean;
  /** Optional element pinned to the right of the label row. */
  labelAside?: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`px-6 py-11 sm:px-10 sm:py-12 ${
        divider ? "border-t border-line" : ""
      }`}
      aria-labelledby={id && label ? `${id}-label` : undefined}
    >
      {label && (
        <div
          data-reveal
          className="mb-6 flex items-baseline justify-between gap-4"
        >
          <h2 id={id ? `${id}-label` : undefined} className="section-label">
            {label}
          </h2>
          {labelAside}
        </div>
      )}
      {description && (
        <p
          data-reveal
          className="mb-8 -mt-2 max-w-prose text-[0.95rem] text-muted"
        >
          {description}
        </p>
      )}
      {children}
    </section>
  );
}
