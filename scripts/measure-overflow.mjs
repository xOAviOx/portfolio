/**
 * Dev QA helper: connects to a headless Chrome (launched with
 * --remote-debugging-port=9222 on the target URL) and reports any elements
 * whose box extends past the viewport width — i.e. horizontal-overflow
 * offenders. Usage: node scripts/measure-overflow.mjs
 */
const base = "http://localhost:9222";

const list = await (await fetch(`${base}/json/list`)).json();
const page = list.find((t) => t.type === "page" && t.webSocketDebuggerUrl);
if (!page) {
  console.error("No page target found. Is chrome running with --remote-debugging-port=9222?");
  process.exit(1);
}

const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
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
  }
});

await new Promise((r) => ws.addEventListener("open", r));
await send("Runtime.enable");

const expression = `(() => {
  const vw = document.documentElement.clientWidth;
  const docSW = document.documentElement.scrollWidth;
  const offenders = [];
  document.querySelectorAll('*').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width === 0) return;
    if (r.right > vw + 1 || r.left < -1) {
      offenders.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.getAttribute('class') || '').slice(0, 70),
        left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width)
      });
    }
  });
  return JSON.stringify({ vw, docSW, overflow: docSW - vw, count: offenders.length, offenders: offenders.slice(0, 18) });
})()`;

const res = await send("Runtime.evaluate", { expression, returnByValue: true });
console.log(JSON.stringify(JSON.parse(res.result.value), null, 2));
ws.close();
