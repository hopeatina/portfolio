import { useEffect, useRef } from "react";
import Router from "next/router";
import { FORM_COLOR, getAnchors, invalidateAnchors, onAnchorsInvalidated, readingLine, ThreadAnchor } from "./anchors";
import { depart, enterRoom, tieKnots } from "./memory";

/**
 * ThreadStitch — one strand of the material sculpture, sewn through the page.
 *
 * Same material as MaterialObject: a graphite-edged silver band with a
 * chartreuse inlay. It is drawn twice. Under the content it runs beneath the
 * copy like thread under fabric; over the content it surfaces at each anchor,
 * casts a shadow, and ties a knot. The inlay lights up to the reading line and
 * takes each section's material color. The sheen slides with scroll, so light
 * moves across the metal the way it does on the object.
 *
 * It also owns the route handoff: the strand leaves from the link you pressed
 * and arrives where the next page's thread begins.
 */

const SVG_NS = "http://www.w3.org/2000/svg";
const SAMPLE_STEP = 6;
const START_Y = 104;
const SHEEN_PERIOD = 380;
const STITCH_OVER = 150;
const STITCH_UNDER = 70;

type Pt = [number, number];
type Layer = "under" | "over";

function catmull(pts: Pt[]): string {
  if (pts.length < 2) return "";
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

function gutterFor(anchors: ThreadAnchor[]) {
  const body = anchors.filter((a) => !a.end);
  const minX = body.length ? Math.min(...body.map((a) => a.x)) : 40;
  return Math.max(7, Math.min(30, minX * 0.42));
}

interface Route {
  d: string;
  knots: Pt[];
  /** y-ranges where the strand surfaces above the content */
  windows: Array<[number, number]>;
}

function route(anchors: ThreadAnchor[], docH: number, g: number): Route {
  const pts: Pt[] = [[g, START_Y]];
  const knots: Pt[] = [];
  const windows: Array<[number, number]> = [[0, START_Y + 40]];
  const amp = Math.min(5, g * 0.45);
  // reach into anchors on the content edge; never swing across copy to find one
  const knotX = (a: ThreadAnchor) => (a.x - g < 150 ? Math.max(g + 5, a.x - 13) : g + 6);
  let lastY = START_Y;
  anchors.forEach((a, i) => {
    if (a.end) {
      // run down the gutter, turn, and feed straight into the visitor's own line
      const turn = Math.min(48, Math.max(12, (a.x - g) * 0.3));
      pts.push([g, a.y - turn], [g + turn, a.y], [a.x, a.y]);
      knots.push([a.x, a.y]);
      windows.push([a.y - turn - 60, docH]);
      lastY = a.y;
      return;
    }
    if (a.y < lastY + 16) {
      knots.push([knotX(a), a.y]);
      return;
    }
    const reach = Math.min(110, Math.max(26, (a.y - lastY) * 0.34));
    for (let y = lastY + 120; y < a.y - reach - 50; y += 120) {
      pts.push([g + Math.sin(y / 197 + i * 1.7) * amp, y]);
    }
    const kx = knotX(a);
    pts.push([g, a.y - reach], [kx, a.y], [g, a.y + reach]);
    knots.push([kx, a.y]);
    windows.push([a.y - reach * 0.8, a.y + reach * 0.8]);
    lastY = a.y + reach;
  });
  const last = anchors[anchors.length - 1];
  if (!last || !last.end) pts.push([g, docH - 24]);
  // a running stitch: surface, dive through the page, surface again
  for (let y = START_Y + 60; y < docH; y += STITCH_OVER + STITCH_UNDER) windows.push([y, y + STITCH_OVER]);
  return { d: catmull(pts), knots, windows: merge(windows) };
}

function merge(ranges: Array<[number, number]>) {
  const sorted = ranges.slice().sort((a, b) => a[0] - b[0]);
  const out: Array<[number, number]> = [];
  for (const [a, b] of sorted) {
    const last = out[out.length - 1];
    if (last && a <= last[1] + 6) last[1] = Math.max(last[1], b);
    else out.push([a, b]);
  }
  return out;
}

function el<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string>) {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
}

/** Builds one layer's defs + strand; returns the nodes that change on scroll. */
function buildLayer(svg: SVGSVGElement, layer: Layer) {
  svg.replaceChildren();
  const id = `thread-${layer}`;
  const defs = el("defs", {});
  const sheen = el("linearGradient", {
    id: `${id}-sheen`,
    gradientUnits: "userSpaceOnUse",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: String(SHEEN_PERIOD),
    spreadMethod: "repeat",
  });
  [
    ["0", "#5b6257"],
    ["0.2", "#a9b0a4"],
    ["0.29", "#f3f5ec"],
    ["0.37", "#b3baae"],
    ["0.66", "#7a8276"],
    ["1", "#5b6257"],
  ].forEach(([offset, color]) => sheen.appendChild(el("stop", { offset, "stop-color": color })));
  const inlay = el("linearGradient", { id: `${id}-inlay`, gradientUnits: "userSpaceOnUse", x1: "0", y1: "0", x2: "0", y2: "1" });
  defs.append(sheen, inlay);
  const clip = el("clipPath", { id: `${id}-clip` });
  if (layer === "over") defs.appendChild(clip);
  svg.appendChild(defs);

  const strand = el("g", layer === "over" ? { "clip-path": `url(#${id}-clip)` } : {});
  const shadow = layer === "over" ? el("path", { class: "ts-shadow" }) : null;
  const edge = el("path", { class: "ts-edge" });
  const face = el("path", { class: "ts-face", stroke: `url(#${id}-sheen)` });
  const groove = el("path", { class: "ts-groove" });
  const lit = el("path", { class: "ts-inlay", stroke: `url(#${id}-inlay)` });
  if (shadow) strand.appendChild(shadow);
  strand.append(edge, face, groove, lit);
  svg.appendChild(strand);
  const holes: SVGGElement = el("g", { class: "ts-holes" });
  const knots = el("g", { class: "ts-knots" });
  const bead = el("g", { class: "ts-bead" });
  if (layer === "over") {
    bead.append(el("circle", { r: "12", class: "ts-bead-halo" }), el("circle", { r: "3", class: "ts-bead-core" }));
    svg.append(holes, knots, bead);
  }
  return { paths: [shadow, edge, face, groove, lit].filter(Boolean) as SVGPathElement[], lit, sheen, inlay, clip, holes, knots, bead };
}

export default function ThreadStitch() {
  const underRootRef = useRef<HTMLDivElement>(null);
  const overRootRef = useRef<HTMLDivElement>(null);
  const underRef = useRef<SVGSVGElement>(null);
  const overRef = useRef<SVGSVGElement>(null);
  const handoffRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const roots = [underRootRef.current, overRootRef.current];
    const underSvg = underRef.current;
    const overSvg = overRef.current;
    const handoff = handoffRef.current;
    if (!roots[0] || !roots[1] || !underSvg || !overSvg || !handoff) return;
    const [underRoot, overRoot] = roots as HTMLDivElement[];

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const under = buildLayer(underSvg, "under");
    const over = buildLayer(overSvg, "over");
    let anchors: ThreadAnchor[] = [];
    let knotEls: SVGGElement[] = [];
    let sections: Array<{ el: HTMLElement; from: number; to: number; last: number }> = [];
    let ys = new Float32Array(0);
    let total = 0;
    let litNow = 0;
    let raf = 0;
    let buildTimer = 0;
    let tied = new Set<number>();
    let path = window.location.pathname;
    let gutter = 20;

    const build = () => {
      anchors = getAnchors();
      underRoot.style.height = "0px";
      overRoot.style.height = "0px";
      const docH = document.documentElement.scrollHeight;
      const docW = document.documentElement.clientWidth;
      for (const [root, svg] of [[underRoot, underSvg], [overRoot, overSvg]] as const) {
        root.style.height = `${docH}px`;
        svg.setAttribute("viewBox", `0 0 ${docW} ${docH}`);
        svg.setAttribute("width", String(docW));
        svg.setAttribute("height", String(docH));
      }
      const empty = !anchors.length;
      underRoot.toggleAttribute("data-empty", empty);
      overRoot.toggleAttribute("data-empty", empty);
      if (empty) return;

      gutter = gutterFor(anchors);
      const { d, knots, windows } = route(anchors, docH, gutter);
      for (const layer of [under, over]) {
        layer.paths.forEach((p) => p.setAttribute("d", d));
        // the inlay takes each section's material color as it passes through
        layer.inlay.setAttribute("y2", String(docH));
        layer.inlay.replaceChildren(
          ...anchors
            .filter((a) => !a.end)
            .map((a) => el("stop", { offset: (a.y / docH).toFixed(4), "stop-color": FORM_COLOR[a.form] })),
        );
      }
      over.clip.replaceChildren(
        ...windows.map(([top, bottom]) => el("rect", { x: "0", y: String(top), width: String(docW), height: String(Math.max(0, bottom - top)) })),
      );
      total = under.lit.getTotalLength();
      [under.lit, over.lit].forEach((p) => (p.style.strokeDasharray = `${total} ${total}`));

      const n = Math.ceil(total / SAMPLE_STEP) + 1;
      ys = new Float32Array(n);
      let maxY = 0;
      for (let i = 0; i < n; i++) {
        maxY = Math.max(maxY, under.lit.getPointAtLength(Math.min(total, i * SAMPLE_STEP)).y);
        ys[i] = maxY; // monotone envelope: the lit tip never runs backwards through a loop
      }

      // puncture marks where the strand passes through the page
      const holes = el("g", { class: "ts-holes" });
      for (const [top, bottom] of windows) {
        for (const y of [top, bottom]) {
          if (y <= START_Y + 10 || y >= docH - 10) continue;
          const p = under.lit.getPointAtLength(lengthAt(y));
          holes.appendChild(el("ellipse", { cx: p.x.toFixed(1), cy: y.toFixed(1), rx: "3.6", ry: "1.5" }));
        }
      }
      over.holes.replaceWith(holes);
      over.holes = holes;

      // each section's reading span, from its first knot to the next section's
      const spans = new Map<HTMLElement, { from: number; to: number }>();
      const body = anchors.filter((a) => !a.end && a.section);
      body.forEach((a) => {
        if (!spans.has(a.section!)) spans.set(a.section!, { from: a.y, to: a.y + 900 });
      });
      const ordered = Array.from(spans.entries());
      ordered.forEach(([, span], i) => {
        const next = ordered[i + 1];
        if (next) span.to = next[1].from;
        else span.to = Math.max(span.from + 400, docH - window.innerHeight * 0.4);
      });
      sections = ordered.map(([section, span]) => ({ el: section, ...span, last: -1 }));

      over.knots.replaceChildren();
      knotEls = knots.map(([x, y], i) => {
        const a = anchors[i];
        const g = el("g", {
          class: `ts-knot${a?.end ? " is-end" : ""}${tied.has(i) ? " is-tied" : ""}`,
          transform: `translate(${x.toFixed(1)} ${y.toFixed(1)})`,
          style: `--knot:${FORM_COLOR[a?.form ?? "knot"]}`,
        });
        g.append(
          el("circle", { r: "9", class: "ts-knot-pulse" }),
          el("circle", { r: "5.2", class: "ts-knot-ring", stroke: "url(#thread-over-sheen)" }),
          el("circle", { r: "2.3", class: "ts-knot-core" }),
        );
        over.knots.appendChild(g);
        return g;
      });
      update(true);
      schedule();
    };

    const scheduleBuild = () => {
      window.clearTimeout(buildTimer);
      buildTimer = window.setTimeout(invalidateAnchors, 120);
    };

    const lengthAt = (y: number) => {
      let lo = 0;
      let hi = ys.length - 1;
      if (hi < 0) return 0;
      if (y >= ys[hi]) return total;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (ys[mid] < y) lo = mid + 1;
        else hi = mid;
      }
      return Math.min(total, lo * SAMPLE_STEP);
    };

    const update = (instant = false) => {
      raf = 0;
      if (!total) return;
      const ry = readingLine();
      const target = lengthAt(ry);
      litNow = instant || reduceMotion ? target : litNow + (target - litNow) * 0.2;
      const off = String(total - litNow);
      under.lit.style.strokeDashoffset = off;
      over.lit.style.strokeDashoffset = off;
      // light travels along the metal as you read
      const sheenShift = `translate(0 ${(window.scrollY * 0.42).toFixed(1)})`;
      under.sheen.setAttribute("gradientTransform", sheenShift);
      over.sheen.setAttribute("gradientTransform", sheenShift);
      const tip = under.lit.getPointAtLength(litNow);
      over.bead.setAttribute("transform", `translate(${tip.x.toFixed(1)} ${tip.y.toFixed(1)})`);

      // each section knows how far through it the reader is
      const top = window.scrollY - window.innerHeight;
      const bottom = window.scrollY + window.innerHeight * 2;
      for (const s of sections) {
        if (s.to < top || s.from > bottom) continue;
        const local = Math.min(1, Math.max(0, (ry - s.from) / Math.max(1, s.to - s.from)));
        if (Math.abs(local - s.last) > 0.004) {
          s.last = local;
          s.el.style.setProperty("--thread-local", local.toFixed(3));
        }
      }

      let changed = false;
      let lastLabel: string | undefined;
      anchors.forEach((a, i) => {
        if (ry < a.y - 2) return;
        if (!a.end) lastLabel = a.label;
        if (tied.has(i)) return;
        tied.add(i);
        changed = true;
        knotEls[i]?.classList.add("is-tied");
        a.el.dataset.threaded = "true";
        a.section?.setAttribute("data-thread-live", "true");
      });
      if (changed) {
        const body = anchors.filter((a) => !a.end).length;
        const count = Array.from(tied).filter((i) => anchors[i] && !anchors[i].end).length;
        tieKnots(path, count, body, lastLabel);
      }
      if (Math.abs(target - litNow) > 0.5) raf = requestAnimationFrame(() => update());
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(() => update());
    };

    // ---------- route handoff ----------
    const handoffPaths = Array.from(handoff.querySelectorAll("path"));
    const handoffBead = handoff.querySelector("circle") as SVGCircleElement;
    let pending: { x: number; y: number } | null = null;

    /** The section being read at the moment of departure, not the furthest reached. */
    const readingLabel = () => {
      const ry = readingLine();
      let label: string | undefined;
      anchors.forEach((a) => {
        if (!a.end && a.y <= ry) label = a.label;
      });
      return label;
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (!href.startsWith("/") || href.startsWith("//") || a.target === "_blank") return;
      const to = href.split(/[?#]/)[0] || "/";
      if (to === window.location.pathname) return;
      pending = { x: e.clientX, y: e.clientY };
      depart({ from: window.location.pathname, fromTitle: document.title, section: readingLabel(), to, x: e.clientX, y: e.clientY });
    };

    const onRouteStart = () => {
      if (!pending || reduceMotion) return;
      const { x, y } = pending;
      pending = null;
      const vw = window.innerWidth;
      handoff.setAttribute("viewBox", `0 0 ${vw} ${window.innerHeight}`);
      const d = `M${x} ${y}C${x} ${y - Math.min(180, y * 0.5)} ${gutter + Math.min(260, vw * 0.3)} ${START_Y} ${gutter} ${START_Y}`;
      handoffPaths.forEach((p) => p.setAttribute("d", d));
      const len = handoffPaths[0].getTotalLength();
      handoffPaths.forEach((p) => {
        p.style.strokeDasharray = `${len} ${len}`;
        p.style.strokeDashoffset = String(len);
      });
      handoff.classList.remove("is-leaving");
      handoff.classList.add("is-active");
      const t0 = performance.now();
      const dur = 640;
      const step = (now: number) => {
        const k = Math.min(1, (now - t0) / dur);
        const e = 1 - Math.pow(1 - k, 3);
        handoffPaths.forEach((p) => (p.style.strokeDashoffset = String(len * (1 - e))));
        const q = handoffPaths[0].getPointAtLength(len * e);
        handoffBead.setAttribute("cx", q.x.toFixed(1));
        handoffBead.setAttribute("cy", q.y.toFixed(1));
        if (k < 1) requestAnimationFrame(step);
        else
          window.setTimeout(() => {
            handoff.classList.add("is-leaving");
            handoff.classList.remove("is-active");
          }, 260);
      };
      requestAnimationFrame(step);
    };

    const arrive = () => {
      path = window.location.pathname;
      tied = new Set();
      litNow = 0;
      document.querySelectorAll<HTMLElement>("[data-threaded]").forEach((n) => delete n.dataset.threaded);
      document.querySelectorAll<HTMLElement>("[data-thread-live]").forEach((n) => n.removeAttribute("data-thread-live"));
      // title is committed by next/head just after the route settles
      window.setTimeout(() => enterRoom(path, document.title), 140);
      scheduleBuild();
    };

    const offInvalidate = onAnchorsInvalidated(build);
    const ro = new ResizeObserver(scheduleBuild);
    ro.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", scheduleBuild);
    document.addEventListener("click", onClick, true);
    Router.events.on("routeChangeStart", onRouteStart);
    Router.events.on("routeChangeComplete", arrive);

    arrive();

    return () => {
      offInvalidate();
      ro.disconnect();
      window.clearTimeout(buildTimer);
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", scheduleBuild);
      document.removeEventListener("click", onClick, true);
      Router.events.off("routeChangeStart", onRouteStart);
      Router.events.off("routeChangeComplete", arrive);
    };
  }, []);

  return (
    <>
      <div ref={underRootRef} className="thread-stitch is-under" aria-hidden="true">
        <svg ref={underRef} />
      </div>
      <div ref={overRootRef} className="thread-stitch is-over" aria-hidden="true">
        <svg ref={overRef} />
      </div>
      <svg ref={handoffRef} className="thread-handoff" aria-hidden="true">
        <path className="ts-edge" />
        <path className="ts-face" />
        <path className="ts-inlay-solid" />
        <circle r="3.4" cx="-20" cy="-20" />
      </svg>
    </>
  );
}
