// Injects the server-rendered app into dist/index.html so the content (and LCP) is in the
// initial HTML; the client then hydrates it. Run after `vite build` + `vite build --ssr`.
import { readFileSync, rmSync, writeFileSync } from "node:fs";

const distUrl = new URL("../dist/", import.meta.url);
const ssrUrl = new URL("../dist-ssr/", import.meta.url);

const { render } = await import(new URL("entry-server.js", ssrUrl).href);
const indexUrl = new URL("index.html", distUrl);
const template = readFileSync(indexUrl, "utf8");

const marker = '<div id="root"></div>';
if (!template.includes(marker)) throw new Error(`prerender: ${marker} not found in dist/index.html`);

writeFileSync(indexUrl, template.replace(marker, `<div id="root">${render()}</div>`));
rmSync(ssrUrl, { recursive: true, force: true });
console.log("✔ prerendered dist/index.html");
