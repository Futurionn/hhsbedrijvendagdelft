// ─────────────────────────────────────────────────────────────────────────────
//  *** FROZEN ARCHIVE — DO NOT EDIT THE SITE IN THIS FOLDER ***
//
//  The March 2026 career day exactly as it was then: a copy of WebsiteV0.2.
//  `npm run build` builds it after the main site, into dist/March2026/, so
//  hhsbedrijvendagdelft.nl/March2026 shows this old site and not March's data
//  in the new design. The main site hands every /March2026... address over
//  to it (ArchiveRedirect in src/App.jsx).
//
//  The files in src/ are the V0.2 files unchanged. The two things that had
//  to change for it to live under /March2026/ instead of at / are done here
//  and in src/App.jsx only:
//    - `base` below, so the built JS and CSS load from /March2026/assets/
//    - archiveAssetPaths(), which points the V0.2 code's "/logos/...",
//      "/HHS/..." etc. at /March2026/logos/... — its own copies in public/.
//      (Several logo files differ from the main site's files of the same
//      name, so they cannot share them.)
// ─────────────────────────────────────────────────────────────────────────────
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

const here = fileURLToPath(new URL(".", import.meta.url));
export const ARCHIVE_BASE = "/March2026/";

// The folders and files the V0.2 code refers to with an absolute path.
const ASSET_PATH = /(["'`])\/(logos\/|HHS\/|MapHHS\.jpeg|tis-career-day-2026\.ics)/g;

function archiveAssetPaths() {
  return {
    name: "archive-asset-paths",
    enforce: "pre",
    transform(code, id) {
      if (!id.startsWith(here.replace(/\\/g, "/")) || !/\.(jsx?|css)$/.test(id)) return null;
      return { code: code.replace(ASSET_PATH, `$1${ARCHIVE_BASE}$2`), map: null };
    }
  };
}

export default defineConfig({
  root: here,
  base: ARCHIVE_BASE,
  plugins: [archiveAssetPaths(), react()],
  css: {
    postcss: {
      plugins: [tailwindcss({ config: `${here}tailwind.config.js` }), autoprefixer()]
    }
  },
  build: {
    outDir: `${here}../../dist/March2026`,
    emptyOutDir: true
  }
});
