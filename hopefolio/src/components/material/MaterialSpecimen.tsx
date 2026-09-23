import dynamic from "next/dynamic";
import Link from "next/link";
import { useMaterialReducedMotion } from "./use-material-motion";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/router";
import { MaterialContext, MaterialForm, materialContextForPath } from "./material-context";

/** The three strands, in geometry order. The green inlay rides execution. */
const STRANDS = [
  { name: "Memory", line: "What the next run inherits. The goal, the decisions, the proof so far." },
  { name: "Execution", line: "Where the work runs. Claude, Codex, Cursor. The green line rides it through every handoff." },
  { name: "Authority", line: "What an agent can do alone, and where a person has to say yes." },
];

const FORMS: Array<{ form: MaterialForm; line: string }> = [
  { form: "knot", line: "Held together." },
  { form: "weave", line: "Context travels as a whole." },
  { form: "bridge", line: "A guarded crossing." },
  { form: "orbit", line: "The result comes back." },
];

const MaterialObject = dynamic(() => import("./MaterialObject"), { ssr: false });

export default function MaterialSpecimen({ context, className = "", compact = false, progress = 0 }: {
  context?: MaterialContext;
  className?: string;
  compact?: boolean;
  progress?: number;
}) {
  const router = useRouter();
  const study = context ?? materialContextForPath(router.asPath);
  const reducedMotion = useMaterialReducedMotion();
  const instructionId = useId();
  const [exploded, setExploded] = useState(false);
  const [rotation, setRotation] = useState<[number, number]>([0, 0]);
  const [tilt, setTilt] = useState<[number, number]>([0, 0]);
  const [closeView, setCloseView] = useState(false);
  const lastTilt = useRef(0);
  const [status, setStatus] = useState<"loading" | "webgpu" | "webgl" | "still">("loading");
  const [shareStatus, setShareStatus] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [canCapture, setCanCapture] = useState(false);
  const [saving, setSaving] = useState(false);
  const [exportUrl, setExportUrl] = useState("");
  const exportDialog = useRef<HTMLDialogElement>(null);
  const exportOperation = useRef(0);
  const mounted = useRef(false);
  const captureRef = useRef<(() => Promise<string>) | null>(null);
  const drag = useRef<{ x: number; y: number; rotation: [number, number]; moved: number; t: number; vx: number; vy: number } | null>(null);
  const pickRef = useRef<((x: number, y: number) => number | null) | null>(null);
  const lastPick = useRef(0);
  const momentum = useRef(0);
  const lastTouch = useRef(0);
  const [hover, setHover] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const [formOverride, setFormOverride] = useState<MaterialForm | null>(null);
  const [idle, setIdle] = useState(false);
  const form = formOverride ?? study.form;
  const strand = pinned ?? hover;
  const pickerReady = useCallback((pick: (x: number, y: number) => number | null) => { pickRef.current = pick; }, []);
  const touch = () => {
    lastTouch.current = performance.now();
    setIdle(false);
  };
  const pickAt = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pickRef.current) return null;
    const box = event.currentTarget.getBoundingClientRect();
    return pickRef.current(((event.clientX - box.left) / box.width) * 2 - 1, -(((event.clientY - box.top) / box.height) * 2 - 1));
  };
  const ready = useCallback((backend: "webgpu" | "webgl") => setStatus(backend), []);
  const failed = useCallback(() => setStatus("still"), []);
  const captureReady = useCallback((capture: () => Promise<string>) => {
    captureRef.current = capture;
    setCanCapture(true);
  }, []);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);
  // left alone, the study drifts; any touch hands control back
  useEffect(() => {
    const timer = window.setInterval(() => {
      if (performance.now() - lastTouch.current > 3500) setIdle(true);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => () => cancelAnimationFrame(momentum.current), []);
  useEffect(() => {
    setFormOverride(null);
    setPinned(null);
    setHover(null);
  }, [study.id]);
  useEffect(() => {
    setShareStatus("");
    setShareUrl("");
    exportOperation.current++;
    setSaving(false);
    exportDialog.current?.close();
  }, [study.id]);
  useEffect(() => {
    if (exportUrl) exportDialog.current?.showModal();
    return () => { if (exportUrl) URL.revokeObjectURL(exportUrl); };
  }, [exportUrl]);

  const save = async () => {
    if (!captureRef.current || saving) return;
    const operation = ++exportOperation.current;
    setSaving(true);
    try {
      const render = await captureRef.current();
      const sculpture = new Image();
      sculpture.src = render;
      await sculpture.decode();
      await document.fonts.ready;
      const card = document.createElement("canvas");
      card.width = 1200;
      card.height = 1200;
      const ctx = card.getContext("2d");
      if (!ctx) throw new Error("Canvas unavailable");
      ctx.fillStyle = "#080806";
      ctx.fillRect(0, 0, 1200, 1200);
      ctx.drawImage(sculpture, 165, 205, 870, 870);
      const fontRoot = document.querySelector(".material-root")!;
      const fonts = getComputedStyle(fontRoot);
      const mono = fonts.getPropertyValue("--font-recursive");
      const editorial = fonts.getPropertyValue("--font-newsreader");
      ctx.fillStyle = "#b7f34a";
      ctx.fillRect(60, 61, 7, 7);
      ctx.font = `18px ${mono}`;
      ctx.fillStyle = "#c9c5b9";
      ctx.fillText("HOPE ATINA / A CONTINUOUS PRACTICE", 84, 72);
      ctx.font = `72px ${editorial}`;
      ctx.fillStyle = "#f2efe4";
      ctx.fillText(study.name, 60, 172, 1080);
      ctx.font = `21px ${mono}`;
      ctx.fillStyle = "#a6aa9c";
      ctx.fillText(study.principle, 60, 220, 1080);
      ctx.fillStyle = "#373a31";
      ctx.fillRect(60, 1083, 1080, 1);
      ctx.fillStyle = "#b7f34a";
      ctx.font = `17px ${mono}`;
      ctx.fillText(`STUDY ${study.index} / ${exploded ? "STRUCTURE EXPOSED" : "HELD TOGETHER"}`, 60, 1127);
      ctx.textAlign = "right";
      ctx.fillStyle = "#c9c5b9";
      ctx.fillText("hopeatina.com", 1140, 1127);
      const blob = await new Promise<Blob>((resolve, reject) => card.toBlob((result) => result ? resolve(result) : reject(new Error("Image export failed")), "image/png"));
      if (!mounted.current || exportOperation.current !== operation) return;
      setExportUrl(URL.createObjectURL(blob));
      setShareStatus("Study image ready. Preview it before downloading.");
    } catch {
      if (mounted.current && exportOperation.current === operation) setShareStatus("Image export unavailable. You can still copy a link to this study.");
    } finally { if (mounted.current && exportOperation.current === operation) setSaving(false); }
  };

  useEffect(() => {
    setRotation([0, 0]);
    setTilt([0, 0]);
    setCloseView(false);
    setExploded(new URLSearchParams(window.location.search).get("material") === "layers");
    setShareStatus("");
    setShareUrl("");
  }, [router.pathname]);

  const share = async () => {
    const url = new URL(window.location.href);
    url.hash = ["memory", "authority", "execution", "proof"].includes(study.id) ? `chapter-${study.id}` : `material-${study.id}`;
    if (exploded) url.searchParams.set("material", "layers");
    else url.searchParams.delete("material");
    try {
      await navigator.clipboard.writeText(url.toString());
      setShareStatus("Link copied to this study.");
      setShareUrl("");
    } catch {
      setShareUrl(url.toString());
      setShareStatus("Select and copy this study link.");
    }
  };

  return (
    <figure id={`material-${study.id}`} className={`material-specimen ${compact ? "is-compact" : ""} ${className}`}
      data-form={form} data-strand={strand ?? undefined} data-renderer={status} data-layers={exploded ? "open" : "held"} data-zoom={closeView ? "close" : "wide"}>
      <div className="material-specimen-register" aria-hidden="true">
        <span>Study {study.index} / {study.name}</span><span>HA—{study.index}</span>
      </div>
      <div className="material-stage" role="group" aria-label={`Rotate ${study.name}`}
        aria-describedby={instructionId} tabIndex={status === "still" ? -1 : 0}
        data-rotation={rotation.map((value) => value.toFixed(2)).join(",")}
        onKeyDown={(event) => {
          touch();
          if (event.key === "+" || event.key === "=") { event.preventDefault(); setCloseView(true); return; }
          if (event.key === "-") { event.preventDefault(); setCloseView(false); return; }
          const move: Record<string, [number, number]> = {
            ArrowLeft: [0, -0.2], ArrowRight: [0, 0.2], ArrowUp: [-0.2, 0], ArrowDown: [0.2, 0],
          };
          if (event.key === "Home") { event.preventDefault(); setRotation([0, 0]); return; }
          const delta = move[event.key];
          if (!delta) return;
          event.preventDefault();
          setRotation(([x, y]) => [Math.max(-1.2, Math.min(1.2, x + delta[0])), y + delta[1]]);
        }}
        onPointerDown={(event) => {
          if (event.pointerType === "mouse" && event.button !== 0) return;
          touch();
          cancelAnimationFrame(momentum.current);
          drag.current = { x: event.clientX, y: event.clientY, rotation, moved: 0, t: performance.now(), vx: 0, vy: 0 };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!drag.current) {
            touch();
            // hovering a strand names it
            if (event.pointerType !== "touch" && performance.now() - lastPick.current > 70) {
              lastPick.current = performance.now();
              setHover(pickAt(event));
            }
            if (reducedMotion || event.pointerType === "touch" || performance.now() - lastTilt.current < 45) return;
            lastTilt.current = performance.now();
            const box = event.currentTarget.getBoundingClientRect();
            setTilt([(event.clientY - box.top - box.height / 2) / box.height * 0.12, (event.clientX - box.left - box.width / 2) / box.width * 0.2]);
            return;
          }
          const start = drag.current;
          const now = performance.now();
          const dt = Math.max(8, now - start.t);
          start.vx = (event.movementX || 0) / dt;
          start.vy = (event.movementY || 0) / dt;
          start.t = now;
          start.moved = Math.max(start.moved, Math.hypot(event.clientX - start.x, event.clientY - start.y));
          setRotation([
            Math.max(-1.2, Math.min(1.2, start.rotation[0] + (event.clientY - start.y) * 0.006)),
            start.rotation[1] + (event.clientX - start.x) * 0.008,
          ]);
        }}
        onPointerUp={(event) => {
          const released = drag.current;
          drag.current = null;
          if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
          if (!released) return;
          if (released.moved < 6) {
            // a tap pins the strand under the finger, or lets go
            const hit = pickAt(event);
            setPinned((current) => (hit === null || hit === current ? null : hit));
            return;
          }
          if (reducedMotion) return;
          // let go with momentum; the knot keeps turning, then settles
          let vx = released.vx * 16 * 0.008;
          let vy = released.vy * 16 * 0.006;
          const coast = () => {
            vx *= 0.93;
            vy *= 0.93;
            setRotation(([x, y]) => [Math.max(-1.2, Math.min(1.2, x + vy)), y + vx]);
            if (Math.abs(vx) + Math.abs(vy) > 0.0006) momentum.current = requestAnimationFrame(coast);
          };
          momentum.current = requestAnimationFrame(coast);
        }}
        onPointerCancel={() => { drag.current = null; }}
        onPointerLeave={() => { setTilt([0, 0]); setHover(null); }}
        onLostPointerCapture={() => { drag.current = null; }}>
        <div className={`material-still ${status === "webgpu" || status === "webgl" ? "is-hidden" : ""}`} aria-hidden="true">
          {/* Deterministic still from this exact mesh, before GPU initialization. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/images/material/study-${form}.svg`} alt="" width="600" height="600" />
        </div>
        <MaterialObject form={form} exploded={exploded} highlight={strand} idle={idle} onPickerReady={pickerReady} rotation={[rotation[0] + tilt[0], rotation[1] + tilt[1]]} zoom={closeView ? 1.25 : 1} progress={progress}
          reducedMotion={!!reducedMotion} onReady={ready} onError={failed} onCaptureReady={captureReady} />
        <span className="material-stage-axis" aria-hidden="true">+<i />+</span>
        <span className="material-stage-note" aria-hidden="true">{exploded ? "02 / structure exposed" : "01 / held together"}</span>
      </div>
      <div className="material-controls">
        <p id={instructionId}>{status === "still" ? "Still study · interaction unavailable" : "Drag to turn · tap a strand"}</p>
        <button type="button" aria-pressed={exploded} onClick={() => setExploded(!exploded)}>
          <span aria-hidden="true">{exploded ? "↙" : "↗"}</span> {exploded ? "Bring together" : "Separate layers"}
        </button>
        <button type="button" className="material-reset" aria-label="Reset object orientation" onClick={() => setRotation([0, 0])}>↺</button>
        <button type="button" className="material-zoom" aria-pressed={closeView} aria-label={closeView ? "Widen the view" : "Inspect the material up close"} title={closeView ? "Widen the view" : "Inspect the material up close"} onClick={() => setCloseView(!closeView)}>{closeView ? "−" : "+"}</button>
      </div>
      <div className="material-lenses">
        <div role="group" aria-label="Strands">
          {STRANDS.map((item, index) => (
            <button type="button" key={item.name} aria-pressed={pinned === index} data-strand={index}
              onClick={() => { touch(); setPinned(pinned === index ? null : index); }}
              onPointerEnter={() => setHover(index)} onPointerLeave={() => setHover(null)}>
              <i aria-hidden="true" />{item.name}
            </button>
          ))}
        </div>
        <div role="group" aria-label="Form">
          {FORMS.map((item) => (
            <button type="button" key={item.form} aria-pressed={form === item.form} title={item.line}
              onClick={() => { touch(); setFormOverride(item.form === study.form ? null : item.form); }}>
              {item.form}
            </button>
          ))}
        </div>
      </div>
      <figcaption className="material-caption" aria-live="polite">
        <span className="material-caption-marker" aria-hidden="true" />
        <div>
          {strand !== null ? (
            <><strong>{STRANDS[strand].name}</strong><p>{STRANDS[strand].line}</p></>
          ) : formOverride ? (
            <><strong>{formOverride[0].toUpperCase() + formOverride.slice(1)}. {FORMS.find((item) => item.form === formOverride)?.line}</strong><p>Same material, same three strands. Only the shape of the handoff changed.</p></>
          ) : (
            <><strong>{study.principle}</strong><p>{exploded ? study.layers : study.detail}</p></>
          )}
        </div>
        <button type="button" onClick={share} aria-label={`Copy link to ${study.name}`} title="Copy a link to this study">↗</button>
      </figcaption>
      {!compact && <Link className="material-evidence-link" href={study.href}>{study.link}<span aria-hidden="true">→</span></Link>}
      {canCapture && <button type="button" className="material-save" onClick={save} disabled={saving}>{saving ? "Preparing image…" : "Save this study"} <span aria-hidden="true">↓</span></button>}
      <span className="material-share-status" role="status">{shareStatus}</span>
      {shareUrl && <input className="material-share-url" readOnly value={shareUrl} aria-label="Study link" onFocus={(event) => event.currentTarget.select()} />}
      <dialog ref={exportDialog} className="material-export" onClose={() => setExportUrl("")} aria-label="Your material study image">
        <div className="material-export-bar"><span>Your study / 1200 × 1200</span><button type="button" onClick={() => exportDialog.current?.close()} aria-label="Close image preview">×</button></div>
        {/* This locally generated canvas image has no remote asset to optimize. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {exportUrl && <img src={exportUrl} alt={`${study.name}: a composed image of your sculpture`} />}
        <a href={exportUrl || undefined} download={`hope-atina-${study.form}-${exploded ? "layers" : "study"}.png`}>Download image <span aria-hidden="true">↓</span></a>
      </dialog>
    </figure>
  );
}
