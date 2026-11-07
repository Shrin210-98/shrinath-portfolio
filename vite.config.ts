import { readFileSync } from "node:fs";
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

import { resume } from "./src/data/resume.ts";

/**
 * Reads the global ("/*") block of public/_headers so `npm run preview`
 * serves the same security headers (incl. CSP) as Cloudflare Pages.
 */
function cloudflareGlobalHeaders(): Record<string, string> {
  const headers: Record<string, string> = {};
  let inGlobalBlock = false;
  const file = readFileSync(new URL("./public/_headers", import.meta.url), "utf8");
  for (const line of file.split("\n")) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    if (!/^\s/.test(line)) {
      inGlobalBlock = line.trim() === "/*";
      continue;
    }
    if (!inGlobalBlock) continue;
    const idx = line.indexOf(":");
    if (idx > 0) headers[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  return headers;
}

/** Emits /llms.txt (https://llmstxt.org) from the same resume.ts content the page renders. */
function llmsTxt(): Plugin {
  return {
    name: "llms-txt",
    apply: "build",
    generateBundle() {
      if (this.environment.name !== "client") return;
      const { profile, summary, experience, projects, writing } = resume;
      const lines = [
        `# ${profile.name}`,
        "",
        `> ${profile.title}. ${profile.location}. ${summary}`,
        "",
        "## Contact",
        "",
        `- [Email](mailto:${profile.email})`,
        `- [GitHub](${profile.github})`,
        `- [LinkedIn](${profile.linkedin})`,
        `- [Résumé](${new URL(profile.resumeUrl, "https://shrinath.pages.dev").href})`,
        "",
        "## Projects",
        "",
        ...projects.flatMap((p) => [
          p.url ? `- [${p.name}](${p.url}): ${p.tagline}` : `- ${p.name}: ${p.tagline}`,
          ...(p.repo ? [`  - [${p.repo.label}](${p.repo.href})`] : []),
        ]),
        "",
        "## Experience",
        "",
        ...experience.flatMap((j) => [
          `- ${j.role}, ${j.company} (${j.location}), ${j.start} – ${j.end}`,
          ...(j.clientProjects ?? []).map((c) => `  - [${c.name}](${c.url}): ${c.description}`),
        ]),
        "",
        "## Writing",
        "",
        ...writing.map((w) => `- [${w.title}](${w.url})`),
        "",
      ];
      this.emitFile({ type: "asset", fileName: "llms.txt", source: lines.join("\n") });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), llmsTxt()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  build: {
    // Never inline fonts as data: URIs — the CSP only allows font-src 'self'.
    assetsInlineLimit: (filePath) => (/\.(woff2?|ttf|otf)$/.test(filePath) ? false : undefined),
  },
  preview: {
    headers: cloudflareGlobalHeaders(),
  },
});
