import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The March 2026 archive (archive/march-2026, the old V0.2 site) is built
// into dist/March2026 by `npm run build`. On the real server it is a plain
// folder with its own .htaccess. This does the same for `npm run dev` and
// `npm run preview`: every /March2026... address is answered from that
// folder, falling back to its index.html. Run `npm run build` once first.
const ARCHIVE_DIR = fileURLToPath(new URL("./dist/March2026", import.meta.url));
const TYPES = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".svg": "image/svg+xml",
  ".webp": "image/webp", ".avif": "image/avif", ".ics": "text/calendar", ".json": "application/json"
};

function serveMarchArchive() {
  const middleware = (req, res, next) => {
    const path = decodeURIComponent(req.url.split("?")[0]);
    if (path !== "/March2026" && !path.startsWith("/March2026/")) return next();
    if (!existsSync(ARCHIVE_DIR)) {
      res.statusCode = 503;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end("The March 2026 archive is not built yet. Run `npm run build` first.");
      return;
    }
    let file = normalize(join(ARCHIVE_DIR, path.slice("/March2026".length)));
    if (!file.startsWith(ARCHIVE_DIR) || !existsSync(file) || statSync(file).isDirectory()) {
      file = join(ARCHIVE_DIR, "index.html");
    }
    res.setHeader("Content-Type", TYPES[extname(file).toLowerCase()] ?? "application/octet-stream");
    res.end(readFileSync(file));
  };
  return {
    name: "serve-march-archive",
    configureServer: (server) => void server.middlewares.use(middleware),
    configurePreviewServer: (server) => void server.middlewares.use(middleware)
  };
}

export default defineConfig({
  plugins: [serveMarchArchive(), react()],
});
