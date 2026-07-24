import type { ComponentPropsWithoutRef } from "react";

/**
 * Styled element map for MDX post bodies, using the site's tokens. Isolating
 * the component set (and the compile call in the [slug] route) keeps the MDX
 * engine swappable.
 */
export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-10 mb-3 font-serif text-2xl tracking-tight" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-8 mb-2 font-serif text-xl tracking-tight" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="my-4 leading-[1.75] text-[color-mix(in_srgb,var(--ink)_84%,var(--bg))]" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => {
    const external = typeof props.href === "string" && /^https?:\/\//.test(props.href);
    return (
      <a
        className="text-[color:var(--accent-strong)] underline decoration-[color-mix(in_srgb,var(--accent)_50%,transparent)] underline-offset-2 transition hover:decoration-accent"
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        {...props}
      />
    );
  },
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="my-4 list-disc space-y-1.5 pl-5 marker:text-faint" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="my-4 list-decimal space-y-1.5 pl-5 marker:text-faint" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="leading-relaxed text-[color-mix(in_srgb,var(--ink)_84%,var(--bg))]" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-6 border-l-2 border-[color-mix(in_srgb,var(--accent)_55%,var(--border))] pl-4 text-muted italic"
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-ink"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="my-6 overflow-x-auto rounded-xl border border-line bg-surface p-4 font-mono text-[0.85rem] leading-relaxed"
      {...props}
    />
  ),
  hr: (props: ComponentPropsWithoutRef<"hr">) => (
    <hr className="my-8 border-line" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-ink" {...props} />
  ),
};
