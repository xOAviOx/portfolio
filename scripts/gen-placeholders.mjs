/**
 * Generates on-brand placeholder images so the site renders complete before
 * real assets exist. Purely graphical (gradients + shapes, no text) to stay
 * renderer/font-independent. Re-run any time with: node scripts/gen-placeholders.mjs
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const PUB = join(process.cwd(), "public");
const PROJECTS = join(PUB, "projects");
mkdirSync(PROJECTS, { recursive: true });

const svg = (s) => Buffer.from(s);
const write = (buf, out) =>
  sharp(buf).jpeg({ quality: 82, mozjpeg: true }).toFile(join(PUB, out));

/* Night-banner: cool gradient, faint stars, a soft mountain silhouette. */
function banner(w = 1200, h = 480) {
  const stars = Array.from({ length: 60 }, () => {
    const x = Math.round(Math.random() * w);
    const y = Math.round(Math.random() * h * 0.6);
    const r = (Math.random() * 1.3 + 0.3).toFixed(1);
    const o = (Math.random() * 0.5 + 0.2).toFixed(2);
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" opacity="${o}"/>`;
  }).join("");
  return svg(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0d1220"/>
        <stop offset="1" stop-color="#0a0c11"/>
      </linearGradient>
      <radialGradient id="glow" cx="0.7" cy="0.15" r="0.5">
        <stop offset="0" stop-color="#e0a15e" stop-opacity="0.18"/>
        <stop offset="1" stop-color="#e0a15e" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#sky)"/>
    <rect width="${w}" height="${h}" fill="url(#glow)"/>
    ${stars}
    <path d="M0 ${h} L0 ${h * 0.72} L${w * 0.2} ${h * 0.5} L${w * 0.38} ${h * 0.68} L${w * 0.55} ${h * 0.42} L${w * 0.74} ${h * 0.66} L${w} ${h * 0.5} L${w} ${h} Z" fill="#0b0e16" opacity="0.9"/>
    <path d="M0 ${h} L0 ${h * 0.85} L${w * 0.3} ${h * 0.66} L${w * 0.5} ${h * 0.8} L${w * 0.72} ${h * 0.62} L${w} ${h * 0.78} L${w} ${h} Z" fill="#080a10"/>
  </svg>`);
}

/* Avatar: radial gradient orb with an amber ring. */
function avatar(s = 400) {
  return svg(`<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}">
    <defs>
      <radialGradient id="a" cx="0.4" cy="0.35" r="0.8">
        <stop offset="0" stop-color="#232b3a"/>
        <stop offset="1" stop-color="#0d1018"/>
      </radialGradient>
    </defs>
    <rect width="${s}" height="${s}" fill="url(#a)"/>
    <circle cx="${s / 2}" cy="${s * 0.42}" r="${s * 0.16}" fill="#e0a15e" opacity="0.28"/>
    <path d="M${s * 0.2} ${s} a${s * 0.3} ${s * 0.3} 0 0 1 ${s * 0.6} 0 Z" fill="#e0a15e" opacity="0.14"/>
  </svg>`);
}

/* Project cover: dark card, diagonal hatch, corner accent. Hue varies per i. */
function project(i, w = 1200, h = 750) {
  const accents = ["#e0a15e", "#7c9fe0", "#c98adf", "#5fb9a6"];
  const a = accents[i % accents.length];
  return svg(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <linearGradient id="g${i}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#141822"/>
        <stop offset="1" stop-color="#0b0e15"/>
      </linearGradient>
      <pattern id="h${i}" width="14" height="14" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
        <rect width="14" height="14" fill="none"/>
        <line x1="0" y1="0" x2="0" y2="14" stroke="#ffffff" stroke-opacity="0.03" stroke-width="2"/>
      </pattern>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#g${i})"/>
    <rect width="${w}" height="${h}" fill="url(#h${i})"/>
    <circle cx="${w * 0.78}" cy="${h * 0.28}" r="${h * 0.4}" fill="${a}" opacity="0.1"/>
    <rect x="${w * 0.08}" y="${h * 0.72}" width="${w * 0.34}" height="10" rx="5" fill="${a}" opacity="0.5"/>
    <rect x="${w * 0.08}" y="${h * 0.8}" width="${w * 0.5}" height="8" rx="4" fill="#ffffff" opacity="0.12"/>
  </svg>`);
}

const tasks = [
  write(banner(), "hero-banner.jpg"),
  write(avatar(), "avatar.jpg"),
  ...[0, 1, 2, 3].map((i) => write(project(i), `projects/project-${i + 1}.jpg`)),
];

await Promise.all(tasks);
console.log("Generated placeholders in /public");

// Also emit tiny blur data URLs (used by next/image placeholder="blur").
import { writeFileSync } from "node:fs";
const blurFor = async (file) => {
  const buf = await sharp(join(PUB, file))
    .resize(12, 12, { fit: "inside" })
    .jpeg({ quality: 40 })
    .toBuffer();
  return "data:image/jpeg;base64," + buf.toString("base64");
};
const blur = {
  banner: await blurFor("hero-banner.jpg"),
  avatar: await blurFor("avatar.jpg"),
  p1: await blurFor("projects/project-1.jpg"),
  p2: await blurFor("projects/project-2.jpg"),
  p3: await blurFor("projects/project-3.jpg"),
  p4: await blurFor("projects/project-4.jpg"),
};
writeFileSync(
  join(process.cwd(), "src/lib/blur-data.json"),
  JSON.stringify(blur, null, 2)
);
console.log("Wrote src/lib/blur-data.json");
