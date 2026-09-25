// ─────────────────────────────────────────────────────────────────────────────
//  CARD ART  —  draws one company card onto a canvas, for the WebGL gallery.
//
//      ┌──────────────────────┐
//      │                      │
//      │        [logo]        │
//      │                      │
//      │ ──────────────────── │
//      │ Berkel Industrial    │   name, Rubik 500
//      │ Machinebouw          │   sector, muted
//      │ Stand 1              │   orange, when stands are known
//      └──────────────────────┘
//
//  White card with navy type, or a navy card for white logos
//  (`logoTone: "light"`, same rule as src/shared/companyStyles.js).
//
//  SVG logos without a width/height draw at 0×0 or blurry, so they are
//  fetched and given an explicit, large size before being drawn.
// ─────────────────────────────────────────────────────────────────────────────

import { BRAND } from "../../theme.js";

const W = 480; // canvas px; the card shows at ~200px, so this is 2× + margin
const H = 600;
const MARGIN = 14; // room for the shadow
const RADIUS = 8;
const FONT = '"Rubik Variable", "Rubik", system-ui, sans-serif';

/** "#122038" + 0.12  ->  "rgba(18, 32, 56, 0.12)" */
function alpha(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

// Colours come from src/shared/theme.js, like everything else drawn in JS.
const TONES = {
  light: { card: BRAND.navyDeep, rule: alpha(BRAND.white, 0.18), name: BRAND.white, muted: alpha(BRAND.white, 0.72) },
  default: { card: BRAND.white, rule: alpha(BRAND.fg, 0.12), name: BRAND.fg, muted: BRAND.fgMuted }
};

const logoCache = new Map();

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function loadSvg(src) {
  const text = await (await fetch(src)).text();
  const viewBox = text.match(/viewBox\s*=\s*["']([^"']+)["']/i);
  let ratio = 2;
  if (viewBox) {
    const [, , vw, vh] = viewBox[1].split(/[\s,]+/).map(Number);
    if (vw > 0 && vh > 0) ratio = vw / vh;
  }
  const width = 800;
  const height = Math.round(width / ratio);
  const sized = text.replace(/<svg\b([^>]*)>/i, (tag, attrs) => {
    const clean = attrs.replace(/\s(width|height)\s*=\s*["'][^"']*["']/gi, "");
    return `<svg${clean} width="${width}" height="${height}">`;
  });
  const url = URL.createObjectURL(new Blob([sized], { type: "image/svg+xml" }));
  try {
    return await loadImage(url);
  } finally {
    // The decoded image survives revoking the URL.
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}

function loadLogo(src) {
  if (!logoCache.has(src)) {
    const promise = (/\.svg($|\?)/i.test(src) ? loadSvg(src) : loadImage(src)).catch(() => null);
    logoCache.set(src, promise);
  }
  return logoCache.get(src);
}

function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Split text into at most `maxLines` lines that fit `maxWidth`, adding "…". */
function wrapLines(ctx, text, maxWidth, maxLines) {
  const words = String(text ?? "").split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width <= maxWidth || !line) {
      line = next;
    } else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    let last = kept[maxLines - 1];
    while (ctx.measureText(`${last}…`).width > maxWidth && last.length > 1) last = last.slice(0, -1);
    kept[maxLines - 1] = `${last.trimEnd()}…`;
    return kept;
  }
  return lines;
}

/**
 * Draw a company's card. `labels.stand` is the translated word "Stand".
 * Resolves to a canvas, ready to be used as a WebGL texture.
 */
export async function drawCompanyCard(company, labels) {
  const tone = company.logoTone === "light" ? TONES.light : TONES.default;

  // Rubik is self-hosted and loads lazily; without this the first cards
  // would be drawn in the fallback font.
  try {
    await Promise.all([document.fonts.load(`500 38px ${FONT}`), document.fonts.load(`400 27px ${FONT}`)]);
  } catch {
    /* fall back to whatever font is available */
  }
  const logo = company.logo ? await loadLogo(company.logo) : null;

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  const x = MARGIN;
  const y = MARGIN;
  const w = W - 2 * MARGIN;
  const h = H - 2 * MARGIN;

  // Card with a soft shadow, so white cards still read on a white page.
  ctx.save();
  ctx.shadowColor = alpha(BRAND.fg, 0.16);
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 4;
  roundedRect(ctx, x, y, w, h, RADIUS);
  ctx.fillStyle = tone.card;
  ctx.fill();
  ctx.restore();
  roundedRect(ctx, x + 0.5, y + 0.5, w - 1, h - 1, RADIUS);
  ctx.strokeStyle = tone.rule;
  ctx.lineWidth = 1;
  ctx.stroke();

  const pad = 34;
  const logoBox = { x: x + pad, y: y + pad, w: w - 2 * pad, h: h * 0.5 - pad };

  if (logo && logo.naturalWidth) {
    const scale = Math.min((logoBox.w * 0.86) / logo.naturalWidth, (logoBox.h * 0.7) / logo.naturalHeight);
    const lw = logo.naturalWidth * scale;
    const lh = logo.naturalHeight * scale;
    ctx.drawImage(logo, logoBox.x + (logoBox.w - lw) / 2, logoBox.y + (logoBox.h - lh) / 2, lw, lh);
  }

  const ruleY = y + h * 0.54;
  ctx.fillStyle = tone.rule;
  ctx.fillRect(x + pad, ruleY, w - 2 * pad, 1.5);

  const textX = x + pad;
  const textW = w - 2 * pad;
  ctx.textBaseline = "top";

  ctx.font = `500 38px ${FONT}`;
  ctx.fillStyle = tone.name;
  const nameLines = wrapLines(ctx, company.name, textW, 2);
  let cursor = ruleY + 26;
  nameLines.forEach((line) => {
    ctx.fillText(line, textX, cursor);
    cursor += 44;
  });

  ctx.font = `400 27px ${FONT}`;
  ctx.fillStyle = tone.muted;
  cursor += 8;
  wrapLines(ctx, company.industry, textW, nameLines.length > 1 ? 1 : 2).forEach((line) => {
    ctx.fillText(line, textX, cursor);
    cursor += 34;
  });

  if (Number.isInteger(company.stand)) {
    ctx.font = `500 25px ${FONT}`;
    ctx.fillStyle = BRAND.orange;
    ctx.textBaseline = "alphabetic";
    ctx.fillText(`${labels.stand} ${company.stand}`, textX, y + h - pad + 4);
  }

  return canvas;
}
