import "@fontsource-variable/jetbrains-mono";
import "./index.css";

import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import App from "./App";

const root = document.getElementById("root");
if (!root) throw new Error("#root element missing from index.html");

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Production HTML is prerendered (scripts/prerender.mjs) → hydrate. In dev, #root is empty → render.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
