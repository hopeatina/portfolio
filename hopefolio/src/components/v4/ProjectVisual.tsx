import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

export interface ProjectVisualProps {
  src: string;
  alt: string;
  label: string;
  caption: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  presentation?: "identity" | "surface";
}

export default function ProjectVisual({
  src,
  alt,
  label,
  caption,
  width,
  height,
  priority = false,
  className = "",
  presentation = "surface",
}: ProjectVisualProps) {
  const id = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [actualSize, setActualSize] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const [naturalSize, setNaturalSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    setOpen(false);
    setNaturalSize(null);
    setActualSize(false);
  }, [src]);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const bodyStyle = document.body.style;
    const rootStyle = document.documentElement.style;
    const previousOverflow = bodyStyle.getPropertyValue("overflow");
    const previousOverflowPriority = bodyStyle.getPropertyPriority("overflow");
    const previousGutter = rootStyle.getPropertyValue("scrollbar-gutter");
    const previousGutterPriority = rootStyle.getPropertyPriority("scrollbar-gutter");

    // Native modality handles focus containment, Escape, and returning to the opener.
    dialog.showModal();
    rootStyle.setProperty("scrollbar-gutter", "stable");
    bodyStyle.setProperty("overflow", "hidden");

    return () => {
      if (dialog.open) dialog.close();
      if (previousOverflow) bodyStyle.setProperty("overflow", previousOverflow, previousOverflowPriority);
      else bodyStyle.removeProperty("overflow");
      if (previousGutter) rootStyle.setProperty("scrollbar-gutter", previousGutter, previousGutterPriority);
      else rootStyle.removeProperty("scrollbar-gutter");
    };
  }, [open]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!open || !viewport || !naturalSize || presentation === "identity") {
      setCanExpand(false);
      return;
    }

    const measure = () => {
      const style = getComputedStyle(viewport);
      const availableWidth = viewport.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      const availableHeight = viewport.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
      const overflows = naturalSize.width > availableWidth || naturalSize.height > availableHeight;
      setCanExpand(overflows);
      if (!overflows) setActualSize(false);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [open, naturalSize, presentation]);

  function close() {
    dialogRef.current?.close();
  }

  function toggleSize() {
    setActualSize((current) => !current);
    viewportRef.current?.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }

  return (
    <figure className={`project-visual project-visual-${presentation}${className ? ` ${className}` : ""}`}>
      <div className="project-visual-frame">
        <Image
          className="project-visual-image"
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={presentation === "identity" ? "(max-width: 640px) 92vw, 576px" : "(max-width: 820px) 92vw, (max-width: 1480px) 86vw, 1280px"}
          priority={priority}
        />
      </div>
      <figcaption className="project-visual-caption">
        <div className="project-visual-copy">
          <span className="project-visual-label">{label}</span>
          <p>{caption}</p>
        </div>
        <button
          className="project-visual-open"
          type="button"
          aria-haspopup="dialog"
          aria-controls={`${id}-dialog`}
          aria-label={`View full image: ${label}`}
          onClick={() => { setActualSize(false); setOpen(true); }}
        >
          View full image <span aria-hidden="true">↗</span>
        </button>
      </figcaption>

      <dialog
        ref={dialogRef}
        id={`${id}-dialog`}
        className="project-visual-dialog"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-description`}
        onClose={() => { setOpen(false); setActualSize(false); }}
      >
        <div className="project-visual-dialog-header">
          <div className="project-visual-dialog-copy">
            <h2 id={`${id}-title`}>{label}</h2>
            <p id={`${id}-description`}>{caption}</p>
          </div>
          <div className="project-visual-dialog-actions">
            {canExpand && (
              <button className="project-visual-size" type="button" onClick={toggleSize}>
                {actualSize ? "Fit to view" : "Actual size"}
              </button>
            )}
            <button className="project-visual-close" type="button" onClick={close} aria-label="Close full image">
              Close <span aria-hidden="true">×</span>
            </button>
          </div>
        </div>
        <div
          ref={viewportRef}
          className={`project-visual-viewport${actualSize ? " project-visual-viewport-actual" : ""}`}
          tabIndex={actualSize ? 0 : undefined}
          role={actualSize ? "region" : undefined}
          aria-label={actualSize ? "Full-size image. Use arrow keys to scroll." : undefined}
        >
          {open && (
            <Image
              className="project-visual-dialog-image"
              src={src}
              alt={alt}
              width={naturalSize?.width ?? width}
              height={naturalSize?.height ?? height}
              unoptimized
              loading="eager"
              style={actualSize && naturalSize ? { width: naturalSize.width } : undefined}
              onLoad={(event) => {
                const image = event.currentTarget;
                setNaturalSize({ width: image.naturalWidth, height: image.naturalHeight });
              }}
            />
          )}
        </div>
      </dialog>
    </figure>
  );
}
