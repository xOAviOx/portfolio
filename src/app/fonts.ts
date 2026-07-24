import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";

/**
 * Fonts are self-hosted via next/font (no CDN request, no layout shift).
 * Geist Sans/Mono come from the official `geist` package; Fraunces is the
 * vendored opsz variable file under ./fonts. None of them is Inter.
 *
 * Fraunces upright is preloaded (hero name, headings). The italic — used only
 * for the signature quotes — is kept OFF the critical path (preload: false) so
 * it doesn't compete with above-the-fold content for bandwidth.
 */
export const fraunces = localFont({
  variable: "--font-fraunces",
  display: "swap",
  src: [{ path: "./fonts/fraunces-normal.woff2", style: "normal" }],
});

export const frauncesItalic = localFont({
  variable: "--font-fraunces-italic",
  display: "swap",
  preload: false,
  // Registered as `normal` so applying the family yields the italic glyphs.
  src: [{ path: "./fonts/fraunces-italic.woff2", style: "normal" }],
});

export const geistSans = GeistSans; // --font-geist-sans

// The mono role (small metadata labels) uses a system monospace stack — no
// extra font download, one fewer critical request.
export const fontVariables = `${fraunces.variable} ${frauncesItalic.variable} ${geistSans.variable}`;
