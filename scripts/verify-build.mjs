// Post-build checks (no dependencies):
//  1. Every inline <script> in dist/index.html has its sha256 hash in the CSP in dist/_headers.
//     Fails the build otherwise, printing the hash to paste into public/_headers.
//  2. The prerendered HTML has no inline style="" attributes (CSP style-src 'self' would block them).
//  3. If resumeUrl in src/data/resume.ts is a local path, warns when that file isn't in dist/.
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";

const dist = new URL("../dist/", import.meta.url);
const html = readFileSync(new URL("index.html", dist), "utf8");
const headers = readFileSync(new URL("_headers", dist), "utf8");

let failed = false;
for (const [, body] of html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)) {
  if (!body.trim()) continue;
  const hash = `'sha256-${createHash("sha256").update(body, "utf8").digest("base64")}'`;
  if (!headers.includes(hash)) {
    failed = true;
    console.error(`\n✖ CSP: inline script hash ${hash} is missing from public/_headers (script-src).`);
  }
}

const inlineStyles = html.match(/<[^>]+\sstyle="[^"]*"/g) ?? [];
if (inlineStyles.length) {
  failed = true;
  console.error(`\n✖ CSP: ${inlineStyles.length} inline style attribute(s) in dist/index.html, e.g. ${inlineStyles[0].slice(0, 120)}`);
}

const resumeUrl = readFileSync(new URL("../src/data/resume.ts", import.meta.url), "utf8").match(
  /resumeUrl:\s*"([^"]+)"/,
)?.[1];
if (resumeUrl?.startsWith("/") && !existsSync(new URL(resumeUrl.slice(1), dist))) {
  console.warn(`\n⚠ public${resumeUrl} is missing — the "Download résumé" button will not work until you add it.`);
}

if (failed) process.exit(1);
console.log("\n✔ CSP: inline-script hashes match public/_headers, no inline styles");
