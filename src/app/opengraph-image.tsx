import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site.config";

export const runtime = "nodejs";
export const alt = site.meta.ogAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [regular, semibold] = await Promise.all([
    readFile(join(process.cwd(), "src/app/_og/Geist-Regular.ttf")),
    readFile(join(process.cwd(), "src/app/_og/Geist-SemiBold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#0a0c11",
          backgroundImage:
            "radial-gradient(60% 80% at 85% 10%, rgba(224,161,94,0.22), rgba(10,12,17,0) 70%)",
          color: "#e8e6e1",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 99,
              background: "#e0a15e",
            }}
          />
          <div
            style={{
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#8b93a3",
            }}
          >
            {site.hero.meta}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 92, fontWeight: 600, lineHeight: 1.02, letterSpacing: -2 }}>
            {site.meta.name}
          </div>
          <div style={{ fontSize: 34, color: "#b9bdc7", maxWidth: 900, lineHeight: 1.3 }}>
            {site.hero.headline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#8b93a3",
          }}
        >
          <span>{site.meta.url.replace(/^https?:\/\//, "")}</span>
          <span style={{ color: "#e0a15e" }}>&ldquo; </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
      ],
    }
  );
}
