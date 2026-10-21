import { useEffect, useRef } from "react";

/**
 * RootField — the ground under every page.
 *
 * A lattice of hollow lozenges, the diamond from the Cameroonian pattern in
 * /public/patterns, drawn in bone at a few percent opacity on the carbon.
 * A slow wave breathes through the cloth; it leans away from the cursor
 * with a lagged ease, drifts a little as you scroll, and every few seconds
 * one lozenge lights green and fades. Subliminal by design: it should be
 * felt before it is noticed. Reduced motion gets a still field.
 */

const SPACING = 54;
const REACH = 240;

export default function RootField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    let raf = 0;
    let last = 0;
    let scrollY = window.scrollY;
    let hasPointer = false;
    const pointer = { x: -9999, y: -9999 };
    const eased = { x: -9999, y: -9999 };
    let pulse = { index: -1, at: 0 };
    let nextPulse = performance.now() + 2600;

    const cell = (index: number) => {
      const r = Math.floor(index / cols);
      const c = index % cols;
      return { x: (c + (r % 2 ? 0.5 : 0)) * SPACING - SPACING, y: r * SPACING - SPACING };
    };

    const draw = (now: number) => {
      const t = now / 1000;
      eased.x += (pointer.x - eased.x) * 0.09;
      eased.y += (pointer.y - eased.y) * 0.09;
      const drift = scrollY * 0.0022;
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = (c + (r % 2 ? 0.5 : 0)) * SPACING - SPACING;
          const y = r * SPACING - SPACING;
          // one slow wave travelling across the cloth, one slower breath over the whole
          const wave = 0.5 + 0.5 * Math.sin(x * 0.011 + y * 0.017 + t * 0.42 + drift);
          const breath = 0.5 + 0.5 * Math.sin(t * 0.33 + (x + y) * 0.0035);
          let size = 5.5 + wave * 4.5;
          let alpha = 0.03 + breath * 0.04;
          let dx = 0;
          let dy = 0;
          let lean = 0;
          if (hasPointer) {
            const ddx = x - eased.x;
            const ddy = y - eased.y;
            const d = Math.hypot(ddx, ddy);
            if (d < REACH && d > 0.01) {
              const k = 1 - d / REACH;
              lean = k * k;
              alpha += lean * 0.2;
              size += lean * 4;
              dx = (ddx / d) * lean * 11;
              dy = (ddy / d) * lean * 11;
            }
          }
          const px = x + dx;
          const py = y + dy;
          const sx = size * (1 - lean * 0.4);
          ctx.strokeStyle = `rgba(242,239,228,${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(px, py - size);
          ctx.lineTo(px + sx, py);
          ctx.lineTo(px, py + size);
          ctx.lineTo(px - sx, py);
          ctx.closePath();
          ctx.stroke();
        }
      }
      // the firefly: one lozenge, lit, held, let go
      if (!reduce) {
        if (pulse.index >= 0) {
          const age = (now - pulse.at) / 2200;
          if (age >= 1) pulse = { index: -1, at: 0 };
          else {
            const { x, y } = cell(pulse.index);
            const a = Math.sin(age * Math.PI);
            const s = 9 + a * 3;
            ctx.strokeStyle = `rgba(183,243,74,${(a * 0.55).toFixed(3)})`;
            ctx.fillStyle = `rgba(183,243,74,${(a * 0.12).toFixed(3)})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(x, y - s);
            ctx.lineTo(x + s, y);
            ctx.lineTo(x, y + s);
            ctx.lineTo(x - s, y);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
          }
        }
        if (now > nextPulse && pulse.index < 0) {
          pulse = { index: Math.floor(Math.random() * cols * rows), at: now };
          nextPulse = now + 3800 + Math.random() * 5200;
        }
      }
    };

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / SPACING) + 2;
      rows = Math.ceil(h / SPACING) + 2;
      draw(performance.now());
      canvas.classList.add("is-ready");
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (document.hidden) return;
      if (now - last < (coarse ? 50 : 33)) return;
      last = now;
      draw(now);
    };

    const onPointer = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      if (!hasPointer) {
        eased.x = pointer.x;
        eased.y = pointer.y;
        hasPointer = true;
      }
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onScroll = () => {
      scrollY = window.scrollY;
    };

    resize();
    window.addEventListener("resize", resize);
    if (!reduce) {
      raf = requestAnimationFrame(loop);
      window.addEventListener("scroll", onScroll, { passive: true });
      if (!coarse) {
        window.addEventListener("pointermove", onPointer, { passive: true });
        document.documentElement.addEventListener("pointerleave", onLeave);
      }
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="root-field" aria-hidden="true" />;
}
