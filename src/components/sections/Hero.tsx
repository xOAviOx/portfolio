import Image from "next/image";
import type { CSSProperties } from "react";
import { site } from "@/content/site.config";
import { RichText } from "@/components/RichText";
import { SocialLinks } from "@/components/SocialLinks";
import { ArrowUpRight } from "@/components/icons";
import blur from "@/lib/blur-data.json";

/** Stagger helper: sets the reveal order for the load animation. */
const step = (i: number) => ({ "--i": i } as CSSProperties);

export function Hero() {
  const { hero } = site;

  return (
    <section aria-label="Introduction" className="relative pb-12 sm:pb-16">
      {hero.banner && (
        <div className="relative h-40 w-full overflow-hidden sm:h-52">
          <Image
            src={hero.banner.src}
            alt={hero.banner.alt}
            fill
            priority
            placeholder="blur"
            blurDataURL={blur.banner}
            sizes="(max-width: 736px) 100vw, 736px"
            className="object-cover"
          />
          {/* Fade the image into the page background so the avatar sits cleanly. */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
          {hero.bannerQuote && (
            <p className="font-serif-italic absolute inset-x-0 top-1/2 -translate-y-1/2 px-8 text-center text-[0.98rem] leading-snug text-white/85 drop-shadow sm:text-[1.1rem]">
              {hero.bannerQuote}
            </p>
          )}
        </div>
      )}

      <div className={`px-6 sm:px-10 ${hero.banner ? "" : "pt-12"}`}>
        <div className={hero.banner ? "-mt-12" : ""}>
          <Image
            src={hero.avatar.src}
            alt={hero.avatar.alt}
            width={96}
            height={96}
            priority
            placeholder="blur"
            blurDataURL={blur.avatar}
            className="reveal size-24 rounded-full border-4 border-background object-cover"
            style={step(0)}
          />
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h1
              className="reveal font-serif text-[2rem] leading-none tracking-tight sm:text-[2.6rem]"
              style={step(1)}
            >
              {hero.name}
            </h1>
            <p
              className="reveal mt-2 font-mono text-[0.8rem] tracking-wide text-muted"
              style={step(2)}
            >
              {hero.meta}
            </p>
          </div>

          <div className="reveal hidden sm:block" style={step(2)}>
            <SocialLinks exclude={["email"]} />
          </div>
        </div>

        {hero.availability.available && (
          <div
            className="reveal mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5"
            style={step(3)}
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-muted">
              {hero.availability.label}
            </span>
          </div>
        )}

        {/* Social row on mobile (hidden above, shown here) */}
        <div className="reveal mt-5 sm:hidden" style={step(3)}>
          <SocialLinks exclude={["email"]} />
        </div>

        {(hero.headline || hero.intro) && (
          <p className="reveal prose-body mt-6 max-w-prose" style={step(4)}>
            {hero.headline && (
              <span className="font-medium text-ink">{hero.headline} </span>
            )}
            {hero.intro && <RichText value={hero.intro} />}
          </p>
        )}

        {(hero.primaryCta || hero.secondaryCta) && (
          <div className="reveal mt-7 flex flex-wrap items-center gap-3" style={step(5)}>
            {hero.primaryCta && (
              <a
                href={hero.primaryCta.href}
                className="btn btn-primary"
                {...(/^https?:\/\//.test(hero.primaryCta.href)
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
              >
                {hero.primaryCta.label}
              </a>
            )}
            {hero.secondaryCta && (
              <a
                href={hero.secondaryCta.href}
                className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
                {...(hero.secondaryCta.external
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
              >
                {hero.secondaryCta.label}
                <ArrowUpRight
                  width={14}
                  height={14}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
