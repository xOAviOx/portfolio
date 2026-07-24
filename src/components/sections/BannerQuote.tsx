import { site } from "@/content/site.config";

/**
 * The signature element. A single pulled quote given the full width of the
 * column and treated as a typographic moment — oversized Fraunces italic with
 * a warm amber quotation mark and a faint radial glow behind it. This is the
 * one place the design spends its boldness; everything else stays quiet.
 */
export function BannerQuote() {
  const { bannerQuote } = site;
  if (!bannerQuote?.text) return null;

  return (
    <section
      aria-label="Quote"
      className="relative overflow-hidden border-t border-line px-6 py-20 sm:px-10 sm:py-24"
    >
      {/* Warm glow, dark-mode only via the accent mix; subtle by design. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in srgb, var(--accent) 22%, transparent), transparent)",
        }}
      />
      <figure className="relative">
        <span
          aria-hidden
          className="block font-serif text-[3.5rem] italic leading-[0.5] text-accent"
        >
          &ldquo;
        </span>
        <blockquote className="display-quote mt-3 text-ink">
          {bannerQuote.text}
        </blockquote>
        {bannerQuote.cite && (
          <figcaption className="mt-6 section-label">
            &mdash; {bannerQuote.cite}
          </figcaption>
        )}
      </figure>
    </section>
  );
}
