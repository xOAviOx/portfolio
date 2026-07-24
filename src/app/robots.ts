import type { MetadataRoute } from "next";
import { site } from "@/content/site.config";

export default function robots(): MetadataRoute.Robots {
  const base = site.meta.url.replace(/\/$/, "");
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
