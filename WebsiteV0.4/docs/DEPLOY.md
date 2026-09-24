# Running and publishing the site

Everything from "I just cloned this" to "it is live", in order.

- [First-time setup](#first-time-setup)
- [Working locally](#working-locally)
- [Testing before you publish](#testing-before-you-publish)
- [Building the site](#building-the-site)
- [Uploading](#uploading)
- [After uploading](#after-uploading)
- [Why `.htaccess` matters](#why-htaccess-matters)
- [Other kinds of hosting](#other-kinds-of-hosting)
- [Troubleshooting](#troubleshooting)

---

## First-time setup

**1. Install Node.js** — version 18 or newer, from <https://nodejs.org>
(take the LTS build). Check it worked:

```bash
node --version
npm --version
```

**2. Get the code and install the libraries:**

```bash
git clone https://github.com/<your-account>/hhsbedrijvendagdelft.git
cd hhsbedrijvendagdelft/WebsiteV0.3
npm install
```

`npm install` reads `package.json` and downloads everything into
`node_modules/`. That folder is large, machine-specific and **deliberately not
in Git** — anyone who clones the repo runs `npm install` to recreate it. The
same goes for `dist/`. Never commit either.

---

## Working locally

```bash
npm run dev
```

Prints an address, normally <http://localhost:5173>. Open it in a browser and
leave the command running: it watches your files and updates the browser the
moment you save, usually without losing your scroll position.

`Ctrl + C` stops it.

| Command | Address | Purpose |
| --- | --- | --- |
| `npm run dev` | :5173 | Editing. Fast, reloads as you type. |
| `npm run preview` | :4173 | Serves the real built files. Use before uploading. |

**Test on your phone too.** Start the dev server with `--host`:

```bash
npm run dev -- --host
```

It prints a second "Network" address like `http://192.168.1.20:5173`. Open that
on a phone on the same Wi-Fi. Useful, because the company cards and the map
behave differently without a mouse.

---

## Testing before you publish

### Automated

```bash
npm install --no-save playwright     # first time only
npx playwright install chromium      # first time only — downloads a browser

npm run build
npm run preview                      # leave this running

npm test                             # in a SECOND terminal
```

It opens the built site in a real browser and checks every address loads, the
NL/EN and dark-mode buttons work and are remembered, the company filter works,
the map hotspots respond, and no page scrolls sideways on a phone. One
`PASS`/`FAIL` line per check.

### By hand

Whatever you changed, plus:

- [ ] Switch **NL ↔ EN** — no blank gaps where text should be
- [ ] Switch **light ↔ dark** — nothing invisible, no white boxes in dark mode
- [ ] **Reload** — both settings stick
- [ ] **Phone width** (`F12`, then the phone icon) — no sideways scrolling
- [ ] Type a deep address directly, e.g. `/March2026/bedrijven`
- [ ] Hover a company logo; click a stand on the March map

---

## Building the site

```bash
npm run build
```

This creates **`dist/`**, and that folder *is* the website:

```
dist/
├── index.html
├── assets/
│   ├── index-Dd5iYbd0.js      ← all the code, minified
│   └── index-C1vrudjB.css     ← all the styling
├── logos/                     ← copied from public/
├── HHS/
├── MapHHS.jpeg
├── .htaccess                  ← hidden, and essential
├── robots.txt
└── sitemap.xml
```

The filenames in `assets/` contain a hash that changes whenever the content
changes. That is what lets browsers cache them forever without ever serving a
stale copy.

Check it before uploading:

```bash
npm run preview
```

<http://localhost:4173> now serves exactly what you are about to upload.

---

## Uploading

The site is hosted on Apache (that is what `.htaccess` is for). Use FTP/SFTP —
FileZilla, WinSCP, Cyberduck — or your host's file manager.

**Upload the CONTENTS of `dist/`, not the folder itself.**

```
Correct                          Wrong
──────────────────────────       ──────────────────────────
public_html/                     public_html/
├── index.html                   └── dist/
├── assets/                          ├── index.html
├── logos/                           └── ...
├── .htaccess
└── ...
```

The wrong version puts the site at `hhsbedrijvendagdelft.nl/dist/`.

The web root is usually `public_html/`, sometimes `www/` or `httpdocs/`.

### The one thing that goes wrong

**`.htaccess` starts with a dot, so most FTP programs hide it by default.**

- FileZilla: *Server → Force showing hidden files*
- WinSCP: *Options → Preferences → Panels → Show hidden files*
- Cyberduck: *View → Show Hidden Files*

Without it, the home page works and every other address returns 404 the moment
someone refreshes or opens a link directly. See
[Why `.htaccess` matters](#why-htaccess-matters).

### A safe order to upload in

1. Upload `assets/` first (new filenames, so nothing breaks yet).
2. Upload the images and other files.
3. Upload `.htaccess`.
4. Upload `index.html` **last** — this is the moment the new version goes live.

Old `assets/` files from the previous build can be deleted afterwards, once you
have confirmed the new site works.

---

## After uploading

Hard-refresh first: **`Ctrl + Shift + R`** (`Cmd + Shift + R` on a Mac).

Then check each of these by **typing the address directly**, not by clicking —
that is what exercises the `.htaccess` rules:

- [ ] `hhsbedrijvendagdelft.nl/`
- [ ] `hhsbedrijvendagdelft.nl/November2026`
- [ ] `hhsbedrijvendagdelft.nl/March2026`
- [ ] `hhsbedrijvendagdelft.nl/March2026/bedrijven`
- [ ] `hhsbedrijvendagdelft.nl/March2026/plattegrond`
- [ ] `hhsbedrijvendagdelft.nl/faq`
- [ ] `hhsbedrijvendagdelft.nl/companies` → should land on `/March2026/bedrijven`
- [ ] **Refresh while on a deep page** — the real `.htaccess` test
- [ ] Check it on a phone

If you added addresses, submit the updated `sitemap.xml` in
[Google Search Console](https://search.google.com/search-console).

---

## Why `.htaccess` matters

This is a **single-page app**. Only `index.html` really exists on the server.
Addresses like `/November2026/bedrijven` are invented by JavaScript *after* the
page has loaded.

So when someone opens that address directly, Apache goes looking for a folder
called `November2026/bedrijven`, finds nothing, and returns 404 — before any
JavaScript has run.

`.htaccess` says: *if the requested thing is not a real file or folder, serve
`index.html` anyway.* The app then reads the address and shows the right page.

It also sets cache rules: the hashed files in `assets/` are cached for a year
(their names change on every build, so a stale copy is impossible), while
`index.html` and your logos are cached briefly or not at all — otherwise
visitors would keep seeing the previous version after an upload.

---

## Other kinds of hosting

`.htaccess` is Apache-only. On anything else you need the equivalent
"serve index.html for unknown addresses" rule:

| Host | What to do |
| --- | --- |
| **Netlify** | Add `public/_redirects` containing `/*  /index.html  200` |
| **Vercel** | Detected automatically for Vite projects |
| **Nginx** | `location / { try_files $uri $uri/ /index.html; }` |
| **GitHub Pages** | Copy `dist/index.html` to `dist/404.html` |
| **Cloudflare Pages** | Same `_redirects` file as Netlify |

The build output is identical in every case — only the rewrite rule differs.

---

## Troubleshooting

**`npm install` fails.** Delete `node_modules/` and `package-lock.json`, then
run it again. If it still fails, check `node --version` is 18 or newer.

**`npm run dev` says the port is in use.** Another copy is already running.
Close it, or use `npm run dev -- --port 3000`.

**The build fails.** Read the first error — it names the file and line. It is
almost always a missing comma or an unclosed bracket in a data file.

**Blank white page after uploading.** Open the browser console (`F12`).
"Failed to load resource" for something in `assets/` means the upload was
incomplete or landed in the wrong folder.

**Every page except the home page 404s.** `.htaccess` is missing. See above.

**The site still shows the old version.** Hard-refresh (`Ctrl + Shift + R`).
If it persists, `index.html` did not upload, or your host has its own cache to
clear.

**Images are missing.** They must be inside `public/` before you build, and
referenced from the root: `/logos/name.png`, not `./logos/name.png` or
`public/logos/name.png`.

**It works with `npm run dev` but not after building.** Almost always a path
problem — a file referenced but not in `public/`, or a capitalisation mismatch.
Windows ignores case in filenames; the Linux server does not. `Logo.PNG` and
`logo.png` are different files there.
