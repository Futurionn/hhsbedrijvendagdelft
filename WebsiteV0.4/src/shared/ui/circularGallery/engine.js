// ─────────────────────────────────────────────────────────────────────────────
//  CIRCULAR GALLERY ENGINE  —  the WebGL half of <CompanyGallery>.
//
//  Adapted from the "circular gallery" on 21st.dev (ravikatiyar162), built on
//  the tiny `ogl` library. What is the same: flat cards riding round a curve,
//  lerped scrolling, drag to fling. What changed:
//
//    • TWO rows. The bottom row is the original ∩ arc; the top row is its
//      mirror (∪) and runs the other way, so the two rows turn against each
//      other like gears.
//    • No wavy "flag" distortion on the cards — they stay flat and sharp.
//    • It drifts on its own and stops while the pointer is over it.
//    • It never hijacks the page's vertical scrolling. Only a sideways
//      trackpad swipe (or shift + wheel) moves it; an up/down wheel goes
//      straight through to the page. On phones `touch-action: pan-y` lets a
//      vertical swipe scroll the page and a sideways one drag the cards.
//
//  One scroll value `s` drives both rows: the bottom row moves by +s, the top
//  row by −s. Each card's x is wrapped into [−loop/2, loop/2), so the rows
//  loop forever without any "which way are we going" bookkeeping.
//
//  Everything React needs to know (a card was clicked, it has glided to the
//  centre) comes back through callbacks. Sizes are in CSS pixels in `layoutFor`
//  and converted to world units here.
// ─────────────────────────────────────────────────────────────────────────────
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";

/** Card size, row gap and curve depth for a given container width, in px. */
export function layoutFor(width) {
  const phone = width < 700;
  // A phone showing the zoomed-out PC layout (html.pc-on-phone) shrinks the
  // page ~0.5×, so the cards are drawn bigger to stay readable.
  const boost = document.documentElement.classList.contains("pc-on-phone") ? 1.3 : 1;
  const cardH = Math.round((phone ? 176 : Math.min(250, Math.max(200, width * 0.17))) * boost);
  const cardW = Math.round(cardH * 0.8);
  const gap = phone ? 20 : 32; // between the two rows
  const bend = phone ? 24 : Math.round(Math.min(90, width * 0.06)); // edge lift
  const spacing = Math.round(cardW * (phone ? 0.14 : 0.16)); // between cards
  const height = 2 * (cardH + gap / 2 + bend) + 24;
  return { cardW, cardH, gap, bend, spacing, height };
}

const DRIFT_PX_PER_SEC = 26;
const DRAG_THRESHOLD_PX = 6;

const lerp = (a, b, t) => a + (b - a) * t;
const wrap = (value, size) => ((((value + size / 2) % size) + size) % size) - size / 2;

const VERTEX = /* glsl */ `
  attribute vec3 position;
  attribute vec2 uv;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// The card artwork (rounded corners, shadow) is drawn into the texture, so
// the shader only samples it and applies the fade used for dimming.
const FRAGMENT = /* glsl */ `
  precision highp float;
  uniform sampler2D tMap;
  uniform float uAlpha;
  varying vec2 vUv;
  void main() {
    vec4 color = texture2D(tMap, vUv);
    gl_FragColor = vec4(color.rgb, color.a * uAlpha);
  }
`;

class Card {
  constructor({ gl, geometry, parent, texture, key, baseIndex }) {
    this.key = key; // the company id
    this.baseIndex = baseIndex; // slot along the row, before scrolling
    this.alpha = 0;
    this.program = new Program(gl, {
      vertex: VERTEX,
      fragment: FRAGMENT,
      uniforms: { tMap: { value: texture }, uAlpha: { value: 0 } },
      transparent: true,
      depthTest: false,
      depthWrite: false
    });
    this.mesh = new Mesh(gl, { geometry, program: this.program });
    this.mesh.setParent(parent);
  }
}

class Row {
  /** `direction` +1 moves with s (bottom, ∩), −1 against it (top, ∪). */
  constructor({ gl, geometry, scene, items, textures, direction }) {
    this.direction = direction;
    this.group = new Transform();
    this.group.setParent(scene);
    this.items = items;
    this.textures = textures;
    this.gl = gl;
    this.geometry = geometry;
    this.cards = [];
  }

  /** (Re)build the card meshes so one loop is always wider than the screen. */
  build(slotWorld, viewportWidth) {
    this.cards.forEach((card) => this.group.removeChild(card.mesh));
    const needed = Math.ceil((viewportWidth + 2 * slotWorld) / slotWorld);
    const copies = Math.max(1, Math.ceil(needed / this.items.length));
    this.cards = [];
    for (let copy = 0; copy < copies; copy += 1) {
      this.items.forEach((item, index) => {
        this.cards.push(
          new Card({
            gl: this.gl,
            geometry: this.geometry,
            parent: this.group,
            texture: this.textures.get(item.id),
            key: item.id,
            baseIndex: copy * this.items.length + index
          })
        );
      });
    }
    this.loop = this.cards.length * slotWorld;
  }
}

export class GalleryEngine {
  /**
   * `drawCard(item)` returns a Promise of a canvas with that card's artwork;
   * each card fades in once its artwork is ready.
   */
  constructor(container, { top, bottom, drawCard, onCardClick, onSettled, reducedMotion }) {
    this.container = container;
    this.onCardClick = onCardClick;
    this.onSettled = onSettled;
    this.reducedMotion = reducedMotion;

    this.scroll = { current: 0, target: 0 };
    this.hovered = false;
    this.frozen = false; // a card is open
    this.selected = null; // { key, row }
    this.pendingSettle = false;
    this.visible = true;
    this.lastTime = performance.now();

    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2)
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.canvas.style.display = "block";
    container.appendChild(this.gl.canvas);

    this.camera = new Camera(this.gl, { fov: 45 });
    this.camera.position.z = 20;
    this.scene = new Transform();
    this.geometry = new Plane(this.gl, { widthSegments: 1, heightSegments: 1 });

    // One texture per company, shared by every copy of its card.
    this.ready = new Set();
    const textures = new Map();
    [...top, ...bottom].forEach((item) => {
      if (textures.has(item.id)) return;
      const texture = new Texture(this.gl, { generateMipmaps: false });
      textures.set(item.id, texture);
      drawCard(item).then((canvas) => {
        if (this.destroyed) return;
        texture.image = canvas;
        this.ready.add(item.id);
      });
    });

    this.rows = [
      new Row({ gl: this.gl, geometry: this.geometry, scene: this.scene, items: top, textures, direction: -1 }),
      new Row({ gl: this.gl, geometry: this.geometry, scene: this.scene, items: bottom, textures, direction: 1 })
    ].filter((row) => row.items.length > 0);

    this.bind();
    this.resize();
    this.tick = this.tick.bind(this);
    this.raf = requestAnimationFrame(this.tick);
  }

  // ── sizing ────────────────────────────────────────────────────────────────
  resize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (!width || !height) return;
    this.screen = { width, height };
    this.renderer.setSize(width, height);
    this.camera.perspective({ aspect: width / height });

    const fov = (this.camera.fov * Math.PI) / 180;
    const vh = 2 * Math.tan(fov / 2) * this.camera.position.z;
    this.viewport = { width: vh * (width / height), height: vh };
    this.pxToWorld = this.viewport.width / width;

    this.layout = layoutFor(width);
    const L = this.layout;
    this.cardWorld = { w: L.cardW * this.pxToWorld, h: L.cardH * this.pxToWorld };
    this.slotWorld = (L.cardW + L.spacing) * this.pxToWorld;
    this.bendWorld = L.bend * this.pxToWorld;
    this.rowOffset = ((L.cardH + L.gap) / 2) * this.pxToWorld;

    this.rows.forEach((row) => row.build(this.slotWorld, this.viewport.width));
  }

  /** Card centre on screen, in container px, from its world position. */
  toScreen(x, y) {
    return {
      x: (x / this.viewport.width + 0.5) * this.screen.width,
      y: (0.5 - y / this.viewport.height) * this.screen.height
    };
  }

  /** Where the open card sits once centred: used to place the HTML panel. */
  centreRect(rowIndex) {
    const y = this.rowY(this.rows[rowIndex]);
    const centre = this.toScreen(0, y);
    return { x: centre.x, y: centre.y, width: this.layout.cardW, height: this.layout.cardH };
  }

  rowY(row) {
    // Top row (direction −1) sits above the middle, bottom row below it.
    return row.direction === -1 ? this.rowOffset : -this.rowOffset;
  }

  // ── the frame ─────────────────────────────────────────────────────────────
  tick(now) {
    this.raf = requestAnimationFrame(this.tick);
    const dt = Math.min(0.05, (now - this.lastTime) / 1000);
    this.lastTime = now;
    if (!this.visible || !this.screen) return;

    const drifting = !this.hovered && !this.frozen && !this.dragging && !this.reducedMotion;
    if (drifting) this.scroll.target += DRIFT_PX_PER_SEC * this.pxToWorld * dt;

    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.dragging ? 0.25 : 0.075);

    if (this.pendingSettle && Math.abs(this.scroll.target - this.scroll.current) < 0.004) {
      this.pendingSettle = false;
      this.scroll.current = this.scroll.target;
      this.onSettled?.(this.selected, this.centreRect(this.selected.row));
    }

    const halfW = this.viewport.width / 2;
    const B = this.bendWorld;
    const R = (halfW * halfW + B * B) / (2 * B); // circle through centre and both edges

    this.rows.forEach((row, rowIndex) => {
      const baseY = this.rowY(row);
      // ∩ for the bottom row, ∪ for the mirrored top row.
      const curve = row.direction === 1 ? -1 : 1;

      row.cards.forEach((card) => {
        const raw = card.baseIndex * this.slotWorld - this.scroll.current * row.direction;
        const x = wrap(raw, row.loop);
        const ex = Math.min(Math.abs(x), halfW);
        const arc = R - Math.sqrt(Math.max(0, R * R - ex * ex));

        card.mesh.scale.set(this.cardWorld.w, this.cardWorld.h, 1);
        card.mesh.position.x = x;
        card.mesh.position.y = baseY + curve * arc;
        card.mesh.rotation.z = curve * -Math.sign(x) * Math.asin(Math.min(1, ex / R));
        card.x = x;
        card.y = card.mesh.position.y;

        // Open card: its HTML panel takes over, the rest step back.
        const isSelected =
          this.selected && this.selected.key === card.key && this.selected.row === rowIndex && Math.abs(x) < this.slotWorld / 2;
        let goal = this.ready.has(card.key) ? 1 : 0;
        if (goal && this.frozen) goal = isSelected ? (this.panelOpen ? 0 : 1) : 0.28;
        card.alpha = lerp(card.alpha, goal, 0.12);
        card.program.uniforms.uAlpha.value = card.alpha;
      });
    });

    this.renderer.render({ scene: this.scene, camera: this.camera });
  }

  // ── selecting ─────────────────────────────────────────────────────────────
  /** Glide the clicked card to the middle; onSettled fires when it arrives. */
  focusCard(card, rowIndex) {
    const row = this.rows[rowIndex];
    this.selected = { key: card.key, row: rowIndex };
    this.frozen = true;
    this.panelOpen = false;
    // Moving s by d shifts this row's cards by −d·direction.
    this.scroll.target = this.scroll.current + card.x * row.direction;
    this.pendingSettle = true;
  }

  setPanelOpen(open) {
    this.panelOpen = open;
  }

  release() {
    this.frozen = false;
    this.selected = null;
    this.panelOpen = false;
    this.pendingSettle = false;
  }

  /**
   * Screen px per layout px. 1 normally; 0.8 on a PC, where the page is
   * shown with CSS `zoom: 0.8` (src/index.css), so pointer positions must
   * be scaled back into the gallery's own coordinates.
   */
  zoomFactor() {
    const rect = this.container.getBoundingClientRect();
    return this.container.clientWidth ? rect.width / this.container.clientWidth : 1;
  }

  hitTest(clientX, clientY) {
    const rect = this.container.getBoundingClientRect();
    const z = this.zoomFactor() || 1;
    const px = (clientX - rect.left) / z;
    const py = (clientY - rect.top) / z;
    for (let rowIndex = 0; rowIndex < this.rows.length; rowIndex += 1) {
      for (const card of this.rows[rowIndex].cards) {
        const centre = this.toScreen(card.x, card.y);
        if (
          Math.abs(px - centre.x) <= this.layout.cardW / 2 &&
          Math.abs(py - centre.y) <= this.layout.cardH / 2
        ) {
          return { card, rowIndex };
        }
      }
    }
    return null;
  }

  // ── input ─────────────────────────────────────────────────────────────────
  bind() {
    const el = this.container;

    this.onEnter = (event) => {
      if (event.pointerType === "mouse") this.hovered = true;
    };
    this.onLeave = (event) => {
      if (event.pointerType === "mouse") this.hovered = false;
    };

    this.onDown = (event) => {
      if (event.button !== 0) return;
      this.pointer = { id: event.pointerId, startX: event.clientX, startY: event.clientY, startS: this.scroll.target, moved: false, row: null };
      const hit = this.hitTest(event.clientX, event.clientY);
      // Dragging follows the finger on the row you grabbed.
      this.pointer.row = hit ? this.rows[hit.rowIndex] : this.rows[this.rows.length - 1];
    };

    this.onMove = (event) => {
      const p = this.pointer;
      if (!p || p.id !== event.pointerId) return;
      const dx = (event.clientX - p.startX) / (this.zoomFactor() || 1);
      if (!p.moved && Math.abs(dx) > DRAG_THRESHOLD_PX && Math.abs(dx) > Math.abs(event.clientY - p.startY)) {
        p.moved = true;
        this.dragging = true;
        if (this.frozen) this.onCardClick?.(null); // dragging closes an open card
        el.setPointerCapture?.(event.pointerId);
      }
      if (p.moved) this.scroll.target = p.startS - dx * this.pxToWorld * p.row.direction;
    };

    this.onUp = (event) => {
      const p = this.pointer;
      if (!p || p.id !== event.pointerId) return;
      this.pointer = null;
      if (p.moved) {
        this.dragging = false;
        return;
      }
      const hit = this.hitTest(event.clientX, event.clientY);
      this.onCardClick?.(hit ? { key: hit.card.key, card: hit.card, rowIndex: hit.rowIndex } : null);
    };

    this.onCancel = () => {
      this.pointer = null;
      this.dragging = false;
    };

    // Sideways swipes move the gallery; up/down wheel is left to the page.
    this.onWheel = (event) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      if (this.frozen) this.onCardClick?.(null);
      this.scroll.target += event.deltaX * this.pxToWorld;
    };

    el.addEventListener("pointerenter", this.onEnter);
    el.addEventListener("pointerleave", this.onLeave);
    el.addEventListener("pointerdown", this.onDown);
    window.addEventListener("pointermove", this.onMove);
    window.addEventListener("pointerup", this.onUp);
    window.addEventListener("pointercancel", this.onCancel);
    el.addEventListener("wheel", this.onWheel, { passive: false });

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(el);

    // No point drawing frames nobody can see.
    this.intersection = new IntersectionObserver(([entry]) => {
      this.visible = entry.isIntersecting;
      this.lastTime = performance.now();
    });
    this.intersection.observe(el);
  }

  destroy() {
    this.destroyed = true;
    cancelAnimationFrame(this.raf);
    const el = this.container;
    el.removeEventListener("pointerenter", this.onEnter);
    el.removeEventListener("pointerleave", this.onLeave);
    el.removeEventListener("pointerdown", this.onDown);
    window.removeEventListener("pointermove", this.onMove);
    window.removeEventListener("pointerup", this.onUp);
    window.removeEventListener("pointercancel", this.onCancel);
    el.removeEventListener("wheel", this.onWheel);
    this.resizeObserver.disconnect();
    this.intersection.disconnect();
    this.gl.getExtension("WEBGL_lose_context")?.loseContext();
    this.gl.canvas.remove();
  }
}
