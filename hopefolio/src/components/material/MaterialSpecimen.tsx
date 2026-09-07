import dynamic from "next/dynamic";
import Link from "next/link";
import { useMaterialReducedMotion } from "./use-material-motion";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/router";
import { MaterialContext, materialContextForPath } from "./material-context";

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
  const drag = useRef<{ x: number; y: number; rotation: [number, number] } | null>(null);
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
      data-form={study.form} data-renderer={status} data-layers={exploded ? "open" : "held"} data-zoom={closeView ? "close" : "wide"}>
      <div className="material-specimen-register" aria-hidden="true">
        <span>Study {study.index} / {study.name}</span><span>HA—{study.index}</span>
      </div>
      <div className="material-stage" role="group" aria-label={`Rotate ${study.name}`}
        aria-describedby={instructionId} tabIndex={status === "still" ? -1 : 0}
        data-rotation={rotation.map((value) => value.toFixed(2)).join(",")}
        onKeyDown={(event) => {
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
          drag.current = { x: event.clientX, y: event.clientY, rotation };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!drag.current) {
            if (reducedMotion || event.pointerType === "touch" || performance.now() - lastTilt.current < 45) return;
            lastTilt.current = performance.now();
            const box = event.currentTarget.getBoundingClientRect();
            setTilt([(event.clientY - box.top - box.height / 2) / box.height * 0.12, (event.clientX - box.left - box.width / 2) / box.width * 0.2]);
            return;
          }
          const start = drag.current;
          setRotation([
            Math.max(-1.2, Math.min(1.2, start.rotation[0] + (event.clientY - start.y) * 0.006)),
            start.rotation[1] + (event.clientX - start.x) * 0.008,
          ]);
        }}
        onPointerUp={(event) => {
          drag.current = null;
          if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={() => { drag.current = null; }}
        onPointerLeave={() => setTilt([0, 0])}
        onLostPointerCapture={() => { drag.current = null; }}>
        <div className={`material-still ${status === "webgpu" || status === "webgl" ? "is-hidden" : ""}`} aria-hidden="true">
          {/* Deterministic still from this exact mesh, before GPU initialization. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/images/material/study-${study.form}.svg`} alt="" width="600" height="600" />
        </div>
        <MaterialObject form={study.form} exploded={exploded} rotation={[rotation[0] + tilt[0], rotation[1] + tilt[1]]} zoom={closeView ? 1.25 : 1} progress={progress}
          reducedMotion={!!reducedMotion} onReady={ready} onError={failed} onCaptureReady={captureReady} />
        <span className="material-stage-axis" aria-hidden="true">+<i />+</span>
        <span className="material-stage-note" aria-hidden="true">{exploded ? "02 / structure exposed" : "01 / held together"}</span>
      </div>
      <div className="material-controls">
        <p id={instructionId}>{status === "still" ? "Still study · interaction unavailable" : "Drag to turn · arrow keys to inspect"}</p>
        <button type="button" aria-pressed={exploded} onClick={() => setExploded(!exploded)}>
          <span aria-hidden="true">{exploded ? "↙" : "↗"}</span> {exploded ? "Bring together" : "Separate layers"}
        </button>
        <button type="button" className="material-reset" aria-label="Reset object orientation" onClick={() => setRotation([0, 0])}>↺</button>
        <button type="button" className="material-zoom" aria-pressed={closeView} aria-label={closeView ? "Widen the view" : "Inspect the material up close"} title={closeView ? "Widen the view" : "Inspect the material up close"} onClick={() => setCloseView(!closeView)}>{closeView ? "−" : "+"}</button>
      </div>
      <figcaption className="material-caption">
        <span className="material-caption-marker" aria-hidden="true" />
        <div><strong>{study.principle}</strong><p>{exploded ? study.layers : study.detail}</p></div>
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
