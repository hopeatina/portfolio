import type { MaterialForm } from "@/components/material/material-context";

/**
 * Thread anchors — where the page thread surfaces and ties a knot.
 *
 * Any element may declare `data-thread`; every SectionSignal does. The knot
 * takes the material form of its section (`data-material-form`), so the thread
 * in the page and the object in the atmosphere always agree. Pages that declare
 * nothing fall back to their headings, so every surface is threaded.
 */

export interface ThreadAnchor {
  el: HTMLElement;
  /** the section this knot belongs to; it receives --thread-local while read */
  section: HTMLElement | null;
  form: MaterialForm;
  /** document coordinates of the knot */
  x: number;
  y: number;
  label: string;
  end: boolean;
}

const FORMS = new Set<MaterialForm>(["knot", "weave", "orbit", "bridge"]);

/** The reflection colors MaterialObject and material-atmosphere.css already use. */
export const FORM_COLOR: Record<MaterialForm, string> = {
  knot: "#b7f34a",
  weave: "#a1b79b",
  bridge: "#d6a965",
  orbit: "#d6e1c7",
};

let cache: ThreadAnchor[] | null = null;
let listeners: Array<() => void> = [];

export function invalidateAnchors() {
  cache = null;
  listeners.forEach((fn) => fn());
}

export function onAnchorsInvalidated(fn: () => void) {
  listeners.push(fn);
  return () => {
    listeners = listeners.filter((l) => l !== fn);
  };
}

function labelOf(el: HTMLElement) {
  // rendered text, so "04" and "Flagship / OrgX" stay separate words
  const text = (el.dataset.threadLabel || el.innerText || el.textContent || "").replace(/\s+/g, " ").trim();
  return text.length > 64 ? `${text.slice(0, 61)}…` : text;
}

function formOf(el: HTMLElement, fallback: MaterialForm): MaterialForm {
  const value = el.closest<HTMLElement>("[data-material-form]")?.dataset.materialForm as MaterialForm | undefined;
  return value && FORMS.has(value) ? value : fallback;
}

function measure(): ThreadAnchor[] {
  const main = document.getElementById("main-content");
  if (!main) return [];
  let els = Array.from(main.querySelectorAll<HTMLElement>("[data-thread]"));
  if (!els.length) els = Array.from(main.querySelectorAll<HTMLElement>("h1, h2"));
  const end = document.querySelector<HTMLElement>("[data-thread-end]");
  if (end) els.push(end);

  const sy = window.scrollY;
  const sx = window.scrollX;
  const out: ThreadAnchor[] = [];
  for (const el of els) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    const isEnd = el === end;
    const lh = parseFloat(getComputedStyle(el).lineHeight) || 24;
    out.push({
      el,
      section: isEnd ? null : el.closest<HTMLElement>("section, header, footer, aside") ?? el.parentElement,
      form: isEnd ? "knot" : formOf(el, "knot"),
      x: r.left + sx + (isEnd ? r.width / 2 : 0),
      y: r.top + sy + (isEnd ? r.height / 2 : Math.min(r.height, lh) / 2),
      label: labelOf(el),
      end: isEnd,
    });
  }
  return out.sort((a, b) => a.y - b.y);
}

export function getAnchors(): ThreadAnchor[] {
  if (typeof document === "undefined") return [];
  if (!cache) cache = measure();
  return cache;
}

/**
 * The reading line: where the eye is, not where the viewport starts. In the
 * last screen it sinks to the bottom edge so the thread always completes.
 */
export function readingLine() {
  const vh = window.innerHeight;
  const max = document.documentElement.scrollHeight - vh;
  const remaining = Math.max(0, max - window.scrollY);
  const sink = Math.min(1, Math.max(0, 1 - remaining / (vh * 0.8)));
  return window.scrollY + vh * (0.58 + 0.42 * sink * sink);
}
