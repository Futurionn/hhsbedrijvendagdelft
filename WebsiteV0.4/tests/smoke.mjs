// ═════════════════════════════════════════════════════════════════════════════
//  SMOKE TEST  —  opens the built site in a real browser and checks that every
//  page loads and the interactive bits still work.
//
//  Run it after any change you are not sure about, and always before you
//  upload a new version.
//
//  ─── HOW TO RUN ─────────────────────────────────────────────────────────────
//      npm install --no-save playwright      (first time only)
//      npx playwright install chromium       (first time only, downloads a browser)
//      npm run build
//      npm run preview                       (leave this running)
//      npm test                              (in a SECOND terminal)
//
//  It prints one PASS/FAIL line per check and exits non-zero if anything failed.
//
//  ─── ADDING A CHECK ─────────────────────────────────────────────────────────
//  Add a route to ROUTES, or add a `check(...)` line in the relevant section.
//  `check(name, condition, extraInfo)` is all there is to it.
// ═════════════════════════════════════════════════════════════════════════════

const BASE_URL = process.env.SMOKE_URL ?? "http://localhost:4173";

let playwright;
try {
  playwright = await import("playwright");
} catch {
  console.error(
    "\nPlaywright is not installed. Run:\n" +
      "    npm install --no-save playwright\n" +
      "    npx playwright install chromium\n"
  );
  process.exit(1);
}
const { chromium, devices } = playwright;

let failures = 0;
function check(name, condition, extra = "") {
  if (!condition) failures++;
  console.log(`${condition ? "PASS" : "FAIL"}  ${name}${extra ? `  (${extra})` : ""}`);
}

/** Every address the site answers on, and where it should end up. */
const ROUTES = [
  ["/", "/"],
  ["/November2026", "/November2026"],
  ["/March2026", "/March2026"],
  ["/March2026/bedrijven", "/March2026/bedrijven"],
  ["/March2026/plattegrond", "/March2026/plattegrond"],
  ["/November2026/bedrijven", "/November2026/bedrijven"],
  ["/November2026/plattegrond", "/November2026/plattegrond"],
  ["/voor-bedrijven", "/voor-bedrijven"],
  ["/faq", "/faq"],
  ["/privacy", "/privacy"],
  ["/terms", "/terms"],
  // Old addresses that must keep working.
  ["/companies", "/March2026/bedrijven"],
  ["/plattegrond", "/March2026/plattegrond"],
  // Anything unknown goes home.
  ["/nope", "/"]
];

const browser = await chromium.launch();

// ── 1. Every page loads, with no JavaScript errors ──────────────────────────
console.log("\n— pages —");
{
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  for (const [route, expectedPath] of ROUTES) {
    const errors = [];
    page.removeAllListeners("pageerror");
    page.on("pageerror", (e) => errors.push(e.message));

    await page.goto(BASE_URL + route, { waitUntil: "networkidle" });

    const landedOn = new URL(page.url()).pathname;
    const contentLength = (await page.locator("body").innerText()).length;
    const hasTitle = (await page.title()).length > 10;

    check(
      `${route} loads`,
      landedOn === expectedPath && contentLength > 200 && hasTitle && errors.length === 0,
      errors[0] ?? `-> ${landedOn}, ${contentLength} chars`
    );
  }
  await page.close();
}

// ── 2. Language, theme, and that both are remembered ────────────────────────
console.log("\n— language & theme —");
{
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.goto(BASE_URL, { waitUntil: "networkidle" });

  // The wave is the only aria-hidden svg that is a direct child of a section.
  const waveFill = () =>
    // The page-coloured layer of the hero wave (the other layer is a faint
    // white swell that never changes).
    page.getAttribute("section > svg[aria-hidden='true'] path[data-page-fill]", "fill");

  check("wave is white in light mode", (await waveFill()) === "#ffffff");

  await page.locator('header button[aria-label="Wissel van taal"]').click();
  await page.waitForTimeout(400);
  check(
    "switches to English",
    (await page.locator("h1").first().innerText()).includes("Career Day") &&
      (await page.getAttribute("html", "lang")) === "en"
  );

  await page.locator('header button[aria-label="Toggle dark mode"]').click();
  await page.waitForTimeout(400);
  check("dark mode applies", ((await page.getAttribute("html", "class")) ?? "").includes("dark"));
  check("wave repaints dark", (await waveFill()) === "#020617");

  await page.reload({ waitUntil: "networkidle" });
  check(
    "both settings survive a reload",
    (await page.getAttribute("html", "lang")) === "en" &&
      ((await page.getAttribute("html", "class")) ?? "").includes("dark")
  );
  await page.close();
}

// ── 3. Companies list, filter, and the link to the floor plan ───────────────
console.log("\n— companies & floor plan —");
{
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  await page.goto(`${BASE_URL}/March2026/bedrijven`, { waitUntil: "networkidle" });
  const total = await page.locator('[id^="company-"]').count();
  check("company list is populated", total > 0, `${total} companies`);

  await page.selectOption("select", "consultancy");
  await page.waitForTimeout(300);
  const filtered = await page.locator('[id^="company-"]').count();
  check("category filter narrows the list", filtered > 0 && filtered < total, `${filtered} shown`);

  await page.selectOption("select", "all");
  await page.waitForTimeout(200);
  await page.locator('a:has-text("Toon op kaart")').first().click();
  await page.waitForTimeout(800);
  check("'show on map' reaches the floor plan", page.url().includes("/March2026/plattegrond?stand="));

  // The map: hovering a stand names it, clicking opens that company.
  await page.goto(`${BASE_URL}/March2026/plattegrond`, { waitUntil: "networkidle" });
  const stands = page.locator('section button[aria-label^="Stand"]');
  check("map draws its stands", (await stands.count()) > 0, `${await stands.count()} hotspots`);

  await stands.first().hover();
  await page.waitForTimeout(300);
  check("hovering a stand names the company", await page.locator("text=Berkel Industrial").first().isVisible());

  await stands.first().click();
  await page.waitForTimeout(800);
  // /March2026 is the archived V0.2 site (archive/march-2026), whose list
  // lives at /companies.
  check("clicking a stand opens its company", page.url().includes("/March2026/companies?focus="));
  check(
    "the opened company is highlighted",
    ((await page.locator('[id^="company-"].ring-2').count()) > 0)
  );
  await page.close();
}

// ── 3b. The drawn November floor plan (StandMap.jsx) ────────────────────────
console.log("\n— November floor plan —");
{
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  const MAP = `${BASE_URL}/November2026/plattegrond`;
  const path = () => page.url().split("4173")[1] ?? page.url();
  const viewBox = () => page.getAttribute("[data-stand-map] svg", "viewBox");
  const cardTitle = async () =>
    (await page.locator("[data-stand-card] h2").count()) > 0
      ? page.locator("[data-stand-card] h2").last().innerText()
      : "";
  /** The middle of a stand on screen. */
  const centreOf = (stand) =>
    page.evaluate((n) => {
      const box = document.querySelector(`[data-stand-map] [data-stand="${n}"]`).getBoundingClientRect();
      return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
    }, stand);

  await page.goto(MAP, { waitUntil: "networkidle" });
  await page.locator("[data-stand-map]").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  const stands = await page.locator("[data-stand-map] [data-stand]").count();
  check("map draws its stands", stands >= 40, `${stands} stands`);
  check(
    "the list beside the map is filled",
    (await page.locator("[data-stand-list] [data-entry]").count()) >= stands
  );
  // The view that shows the whole plan, to compare against later.
  const fitted = await viewBox();

  // Clicking a stand opens its card and puts the stand in the address.
  let spot = await centreOf(9);
  await page.mouse.click(spot.x, spot.y);
  await page.waitForTimeout(700);
  check("clicking a stand opens its card", (await cardTitle()).includes("ABB"), await cardTitle());
  check("the stand is kept in the address", path().endsWith("?stand=9"), path());

  await page.keyboard.press("Escape");
  await page.waitForTimeout(500);
  check("Esc closes the card", (await page.locator("[data-stand-card]").count()) === 0 && !path().includes("stand="));

  // A plain scroll is the page's; Ctrl + scroll zooms.
  const beforeScroll = await viewBox();
  spot = await centreOf(9);
  await page.mouse.move(spot.x, spot.y);
  await page.mouse.wheel(0, -200);
  await page.waitForTimeout(300);
  check("a plain scroll does not zoom the map", (await viewBox()) === beforeScroll);
  await page.waitForTimeout(1500);
  spot = await centreOf(9);
  await page.mouse.move(spot.x, spot.y);
  await page.keyboard.down("Control");
  await page.mouse.wheel(0, -300);
  await page.keyboard.up("Control");
  await page.waitForTimeout(300);
  const zoomed = await centreOf(9);
  check(
    "Ctrl + scroll zooms at the pointer",
    (await viewBox()) !== beforeScroll && Math.abs(zoomed.x - spot.x) < 4 && Math.abs(zoomed.y - spot.y) < 4
  );

  // Dragging moves the map and is not mistaken for a click.
  await page.mouse.down();
  await page.mouse.move(zoomed.x + 100, zoomed.y + 50, { steps: 5 });
  await page.mouse.up();
  await page.waitForTimeout(300);
  const dragged = await centreOf(9);
  check(
    "dragging moves the map",
    Math.abs(dragged.x - zoomed.x - 100) < 4 && Math.abs(dragged.y - zoomed.y - 50) < 4 &&
      (await page.locator("[data-stand-card]").count()) === 0
  );

  await page.locator('[data-stand-map] button[aria-label="Hele plattegrond"]').click();
  await page.waitForTimeout(800);
  check("'whole plan' shows everything again", (await viewBox()) === fitted);

  // A filter chip dims the stands that do not match.
  await page.locator('[data-stand-map] button:has-text("HBO-ICT")').first().click();
  await page.waitForTimeout(900);
  const dimmed = await page.locator("[data-stand-map] [data-dimmed]").count();
  const listedIct = await page.locator("[data-stand-list] [data-entry]").count();
  check("a study filter dims the other stands", dimmed > 0 && listedIct > 0 && listedIct < stands, `${dimmed} dimmed, ${listedIct} listed`);
  await page.locator('[data-stand-map] button:has-text("Alle")').first().click();
  await page.waitForTimeout(800);

  // The search box and the list: picking a name glides the map to it.
  await page.fill("#stand-map-search", "quoo");
  await page.waitForTimeout(300);
  check("search narrows the list", (await page.locator("[data-stand-list] [data-entry]").count()) >= 1);
  const beforePick = await viewBox();
  await page.locator("[data-stand-list] [data-entry]").first().click();
  await page.waitForTimeout(1000);
  check(
    "picking from the list opens and zooms to the stand",
    (await cardTitle()).includes("Quooker") && (await viewBox()) !== beforePick && path().includes("stand=28")
  );

  // The card leads to the company; the company leads back to its stand.
  await page.locator('[data-stand-card] a:has-text("Meer info")').click();
  await page.waitForTimeout(1200);
  check("'Meer info' opens the company", path().startsWith("/November2026/bedrijven/quooker"), path());

  await page.goto(`${BASE_URL}/November2026/bedrijven`, { waitUntil: "networkidle" });
  await page.locator('a:has-text("Toon op kaart")').first().click();
  await page.waitForTimeout(1500);
  check(
    "'show on map' lands on that stand",
    path().includes("/November2026/plattegrond?stand=") && (await cardTitle()).length > 0,
    path()
  );
  await page.close();
}

// ── 4. The scrolling logo rows ──────────────────────────────────────────────
console.log("\n— logo marquee —");
{
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.goto(`${BASE_URL}/March2026`, { waitUntil: "networkidle" });

  const row = page.locator(".marquee-scroll").first();
  const track = page.locator(".marquee-track").first();
  await row.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  const box = await row.boundingBox();
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;

  check("row is drifting", (await track.evaluate((e) => getComputedStyle(e).animationPlayState)) === "running");

  await page.mouse.move(x, y);
  await page.waitForTimeout(400);
  check("hovering pauses the row", (await track.evaluate((e) => getComputedStyle(e).animationPlayState)) === "paused");

  await page.mouse.move(x + 2, y + 2);
  await page.waitForTimeout(700);
  const card = await page.evaluate(
    ([px, py]) => {
      const el = document.elementFromPoint(px, py)?.closest('[role="button"][aria-expanded]');
      return el && { open: el.getAttribute("aria-expanded"), text: el.innerText };
    },
    [x + 2, y + 2]
  );
  check("the card under the cursor expands", card?.open === "true");
  check("it reveals the company details", /Sector:/.test(card?.text ?? "") && /#\d+/.test(card?.text ?? ""));

  await page.mouse.move(x, box.y - 60);
  await page.waitForTimeout(700);
  check("card closes and the row resumes",
    (await page.locator('#companies [aria-expanded="true"]').count()) === 0 &&
    (await track.evaluate((e) => getComputedStyle(e).animationPlayState)) === "running");
  await page.close();
}

// ── 5. Phone behaviour: layout, tap-to-open, tapping a stand on the map ─────
console.log("\n— on a phone —");
{
  const ctx = await browser.newContext({ ...devices["iPhone 13"] });
  const page = await ctx.newPage();

  for (const route of ["/", "/March2026", "/March2026/bedrijven", "/March2026/plattegrond", "/November2026/plattegrond", "/faq"]) {
    await page.goto(BASE_URL + route, { waitUntil: "networkidle" });
    const { doc, win } = await page.evaluate(() => ({
      doc: document.documentElement.scrollWidth,
      win: window.innerWidth
    }));
    check(`${route} has no sideways scroll`, doc <= win + 1, `${doc} vs ${win}`);
  }

  // Cards expand on tap. The row is stopped first, as a swipe would.
  //
  // Note: every company is rendered TWICE (that is what makes the loop
  // seamless), and the row is scrolled sideways. So "the first card in the
  // HTML" is not necessarily the card sitting at a given spot on screen —
  // it may well be that company's duplicate. The check is therefore "a card
  // opened", not "this particular element opened".
  await page.goto(`${BASE_URL}/March2026`, { waitUntil: "networkidle" });
  await page.locator("#companies").scrollIntoViewIfNeeded();
  await page.addStyleTag({ content: ".marquee-track{animation:none !important}" });
  await page.waitForTimeout(300);

  const openCards = () => page.locator('#companies [aria-expanded="true"]').count();

  check("no card is open to begin with", (await openCards()) === 0);

  await page.locator('#companies [role="button"]').first().tap();
  await page.waitForTimeout(700);
  check("tap expands a card", (await openCards()) === 1, `${await openCards()} open`);

  // Tapping the card that is actually open closes it again.
  await page.locator('#companies [aria-expanded="true"]').first().tap();
  await page.waitForTimeout(700);
  check("tap again collapses it", (await openCards()) === 0, `${await openCards()} open`);

  // The November map (StandMap.jsx): one tap on a stand opens its card.
  // (/March2026/plattegrond is the archived V0.2 map; the picture-with-
  // hotspots map, FloorPlanMap.jsx, is not shown by any live page.)
  await page.goto(`${BASE_URL}/November2026/plattegrond`, { waitUntil: "networkidle" });
  await page.locator("[data-stand-map]").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  const stand = await page.evaluate(() => {
    const box = document.querySelector('[data-stand-map] [data-stand="27"]').getBoundingClientRect();
    return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
  });
  await page.touchscreen.tap(stand.x, stand.y);
  await page.waitForTimeout(700);
  check("tapping a stand opens its card", (await page.locator("[data-stand-card]").count()) === 1);

  await ctx.close();
}

// ── 6. The pinned header, and the logo always going home ────────────────────
console.log("\n— header —");
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });

  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);

  const headerBg = () =>
    page.evaluate(() => getComputedStyle(document.querySelector("header")).backgroundColor);

  // Transparent over the hero, tinted once the page moves.
  const atTop = await headerBg();
  check("header is invisible at the top", atTop === "rgba(0, 0, 0, 0)", atTop);

  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(500);
  const scrolled = await headerBg();
  check("header materialises on scroll", scrolled !== "rgba(0, 0, 0, 0)", scrolled);

  // Nav links reach their sections.
  await page.locator('header button:has-text("Over het event")').first().click();
  await page.waitForTimeout(900);
  check("nav reaches the about section", page.url().includes("#about"), page.url().split("4173")[1]);

  await page.locator('header button:has-text("Programma")').first().click();
  await page.waitForTimeout(900);
  check(
    "nav reaches the programme section",
    page.url().includes("#november-update"),
    page.url().split("4173")[1]
  );

  // The floor plan has its own place in the menu.
  await page.locator('header a:has-text("Plattegrond")').first().click();
  await page.waitForSelector("[data-stand-map]");
  check(
    "nav reaches the floor plan",
    new URL(page.url()).pathname === "/November2026/plattegrond",
    new URL(page.url()).pathname
  );

  // Registration is closed: the page for companies asks for an email and
  // shows the editions so far. (With COMPANY_REGISTRATION.open set to true
  // it shows the form instead; change these three checks then.)
  await page.goto(`${BASE_URL}/voor-bedrijven`, { waitUntil: "networkidle" });
  const mailHref = await page
    .locator('[data-registration="closed"] a[href^="mailto:"]')
    .first()
    .getAttribute("href");
  check("'for companies' asks for an email", (mailHref ?? "").includes("subject="), mailHref ?? "no mail link");
  check("'for companies' shows no form while closed", (await page.locator("iframe").count()) === 0);
  const records = await page.locator("[data-edition-record]").count();
  check("'for companies' lists the earlier editions", records === 2, `${records} editions`);

  // The logo must escape the March archive (the old V0.2 site, which has no
  // <header>), not loop back into it.
  await page.goto(`${BASE_URL}/March2026`, { waitUntil: "networkidle" });
  const archiveLogo = page.locator("a[aria-label]:has(img)").first();
  const logoHref = await archiveLogo.getAttribute("href");
  check("logo points at the site root from March", logoHref === "/", `href=${logoHref}`);

  await archiveLogo.click();
  await page.waitForTimeout(800);
  check("logo click leaves the archive", new URL(page.url()).pathname === "/", page.url().split("4173")[1]);

  await page.close();
}

// ── 7. A hovered card waits before closing ──────────────────────────────────
console.log("\n— card close delay —");
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
  await page.goto(`${BASE_URL}/March2026`, { waitUntil: "networkidle" });

  const row = page.locator(".marquee-scroll").first();
  await row.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);

  const box = await row.boundingBox();
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;

  await page.mouse.move(x, y);
  await page.waitForTimeout(400);
  await page.mouse.move(x + 2, y + 2);
  await page.waitForTimeout(700);

  const openCount = () => page.locator('#companies [aria-expanded="true"]').count();
  check("a card opens on hover", (await openCount()) === 1);

  // Move off the card but stay inside the row, as a wobble at the edge does.
  await page.mouse.move(x, box.y + 4);
  await page.waitForTimeout(250);
  check("card still open 250ms after leaving", (await openCount()) === 1, "no flicker");

  // Come back before the delay expires — the pending close must be cancelled.
  await page.mouse.move(x + 2, y + 2);
  await page.waitForTimeout(400);
  check("returning cancels the close", (await openCount()) === 1);

  // Leave and wait the delay out.
  await page.mouse.move(x, box.y - 80);
  await page.waitForTimeout(1400);
  check("card closes after the delay", (await openCount()) === 0, `${await openCount()} open`);

  await page.close();
}

await browser.close();

console.log(
  failures === 0
    ? "\n✅  Everything passed.\n"
    : `\n❌  ${failures} check(s) failed.\n`
);
process.exit(failures === 0 ? 0 : 1);
