"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Drives the scroll-reveal effect. Renders nothing; on mount (and on every
 * client-side route change) it finds all [data-reveal] elements and reveals
 * them as they scroll into view via one shared IntersectionObserver.
 *
 * Safety model: the hidden state lives in CSS gated on `html.reveal-ready`,
 * which the pre-paint script in the layout only sets when JS is enabled and
 * motion isn't reduced. So if this component never runs — no JS, hydration
 * failure, or reduced-motion — content is simply never hidden. Here we only
 * ever *add* the reveal, never hide, which keeps the failure mode safe.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    // Cancel the layout's safety-net timeout: the controller is alive, so we
    // own the reveal from here and content won't be force-shown.
    const w = window as unknown as { __revealFallback?: ReturnType<typeof setTimeout> };
    if (w.__revealFallback) {
      clearTimeout(w.__revealFallback);
      w.__revealFallback = undefined;
    }

    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    if (els.length === 0) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // No observer support or reduced motion → reveal everything at once.
    if (prefersReduced || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target); // reveal once, then stop watching
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    els.forEach((el) => {
      // If it's already been revealed (e.g. re-mount), leave it shown.
      if (el.classList.contains("is-visible")) return;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
