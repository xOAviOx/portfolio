/**
 * Dev QA helper: full-page screenshots at emulated viewports via CDP, so small
 * widths (320/390) render accurately instead of being clamped to Chrome's
 * headless minimum window width.
 *
 * Prereq: chrome running with --remote-debugging-port=9222.
 * Usage: node scripts/shoot.mjs <url> <label:width,label:width,...>
 * Example: node scripts/shoot.mjs http://localhost:3000/ desktop:1280,mobile:390
 */
const url = process.argv[2] || "http://localhost:3000/";
const specs = (process.argv[3] || "desktop:1280,mobile:390")
  .split(",")
  .map((s) => {
    const [label, w] = s.split(":");
    return { label, width: Number(w) };
  });

const base = "http://localhost:9222";
const list = await (await fetch(`${base}/json/list`)).json();
const page = list.find((t) => t.type === "page" && t.webSocketDebuggerUrl);
if (!page) {
  console.error("No page target. Launch chrome with --remote-debugging-port=9222.");
  process.exit(1);
}

const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
const listeners = [];
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const msgId = ++id;
    pending.set(msgId, resolve);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });
ws.addEventListener("message", (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg.result);
    pending.delete(msg.id);
  } else if (msg.method) {
    listeners.forEach((fn) => fn(msg));
  }
});
const waitFor = (method) =>
  new Promise((resolve) => {
    const fn = (msg) => {
      if (msg.method === method) {
        listeners.splice(listeners.indexOf(fn), 1);
        resolve(msg.params);
      }
    };
    listeners.push(fn);
  });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

import { writeFileSync, mkdirSync } from "node:fs";
mkdirSync(".dev-screens", { recursive: true });

await new Promise((r) => ws.addEventListener("open", r));
await send("Page.enable");
await send("Runtime.enable");

const scheme = process.env.SCHEME; // "light" | "dark" | undefined
if (scheme) {
  await send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-color-scheme", value: scheme }],
  });
}

for (const { label, width } of specs) {
  const mobile = width < 700;
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height: 900,
    deviceScaleFactor: mobile ? 2 : 1,
    mobile,
    screenWidth: width,
    screenHeight: 900,
  });
  const loaded = waitFor("Page.loadEventFired");
  await send("Page.navigate", { url });
  await loaded;
  await sleep(2600); // let the one-shot load reveal settle

  const shot = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    fromSurface: true,
  });
  const out = `.dev-screens/${label}.png`;
  writeFileSync(out, Buffer.from(shot.data, "base64"));
  console.log(`wrote ${out} @ ${width}px`);
}
ws.close();
