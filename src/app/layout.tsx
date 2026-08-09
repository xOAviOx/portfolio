import type { Metadata, Viewport } from "next";
import { site } from "@/content/site.config";
import { fontVariables } from "./fonts";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.meta.url),
  title: {
    default: site.meta.title,
    template: `%s — ${site.meta.name}`,
  },
  description: site.meta.description,
  applicationName: site.meta.name,
  authors: [{ name: site.meta.name }],
  creator: site.meta.name,
  openGraph: {
    type: "website",
    locale: site.meta.locale,
    url: site.meta.url,
    siteName: site.meta.name,
    title: site.meta.title,
    description: site.meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.meta.title,
    description: site.meta.description,
    creator: site.meta.twitter,
  },
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0c11" },
    { media: "(prefers-color-scheme: light)", color: "#fbfbf9" },
  ],
  colorScheme: "dark light",
};

/**
 * Runs before first paint to set the theme, so there is no flash of the wrong
 * colours. Reads a stored choice, else falls back to the system preference,
 * else dark. Kept tiny and dependency-free.
 */
const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    if (t !== 'light' && t !== 'dark') {
      t = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  // Flag the document ready for scroll-reveal — but only when motion is
  // allowed. Without this class, [data-reveal] elements are never hidden, so
  // no-JS and reduced-motion visitors always see fully visible content.
  try {
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('reveal-ready');
      // Safety net: if the reveal controller never activates (hydration or JS
      // failure), un-hide everything after a moment so content can NEVER stay
      // invisible. ScrollReveal clears this the instant it mounts.
      window.__revealFallback = setTimeout(function () {
        document.documentElement.classList.remove('reveal-ready');
      }, 1600);
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontVariables} suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <a
          href="#main"
          className="sr-only rounded-full border border-line bg-surface px-4 py-2 text-sm focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
        >
          Skip to content
        </a>
        <div className="frame min-h-dvh">
          <SiteHeader />
          {children}
          <Footer />
        </div>
        <ScrollReveal />
      </body>
    </html>
  );
}
