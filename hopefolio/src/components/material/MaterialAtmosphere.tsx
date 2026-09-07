import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useMaterialReducedMotion } from "./use-material-motion";
import { useEffect, useRef, useState } from "react";
import { MaterialForm, materialContextForPath } from "./material-context";

const MaterialObject = dynamic(() => import("./MaterialObject"), { ssr: false });
const forms = new Set<MaterialForm>(["knot", "weave", "bridge", "orbit"]);

/** The same object at architectural scale, carrying the page's changing context. */
export default function MaterialAtmosphere() {
  const router = useRouter();
  const reducedMotion = useMaterialReducedMotion();
  const path = router.asPath.split(/[?#]/)[0].replace(/\/$/, "") || "/";
  const caseStudy = /^\/projects\/(?!archive$|index$)[^/]+$/.test(path);
  const surface = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<MaterialForm>("knot");
  const [rotation, setRotation] = useState<[number, number]>([0, 0]);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = surface.current;
    const root = element?.closest<HTMLElement>(".material-root");
    if (!root || !element) return;
    if (reducedMotion || caseStudy) {
      setRotation([0, 0]);
      root.style.setProperty("--material-parallax-x", "0px");
      root.style.setProperty("--material-parallax-y", "0px");
    }
    const routeForm = materialContextForPath(router.asPath).form;
    const reading = /^\/(blog|proof)\//.test(path);
    let sectionForm = routeForm;
    let hoverForm: MaterialForm | null = null;
    let scrollFrame = 0;
    let pointerFrame = 0;
    let pointer = { x: 0, y: 0 };
    let lastPointer = 0;
    const apply = () => {
      const next = hoverForm ?? sectionForm;
      setForm(next);
      root.dataset.materialForm = next;
      root.dataset.materialEngaged = hoverForm ? "true" : "false";
    };
    const scroll = () => {
      scrollFrame = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const fraction = Math.min(1, Math.max(0, window.scrollY / max));
      setProgress(reducedMotion ? 0 : fraction * (caseStudy ? 0.18 : 1));
      root.style.setProperty("--material-travel", fraction.toFixed(4));
      const middle = window.innerHeight * 0.6;
      sectionForm = routeForm;
      // A case keeps its own material identity while the project supplies the story.
      if (!caseStudy) {
        const candidates = document.querySelectorAll<HTMLElement>("main [data-material-form]:not(button):not(a)");
        for (const candidate of candidates) {
          const box = candidate.getBoundingClientRect();
          if (box.top <= middle && box.bottom >= middle) {
            const value = candidate.dataset.materialForm as MaterialForm;
            if (forms.has(value)) sectionForm = value;
          }
        }
      }
      const hero = document.querySelector(".material-home-hero, .v4-case-hero, .v4-work-hero, .v4-about-hero, .v4-hiring-hero, .v4-contact-hero, .v4-proof-hero");
      const heroVisible = !!hero && hero.getBoundingClientRect().bottom > window.innerHeight * 0.4;
      element.style.setProperty("--atmosphere-opacity", caseStudy ? heroVisible ? "0.045" : "0.032" : reading ? "0.055" : heroVisible ? "0.14" : "0.20");
      apply();
    };
    const onScroll = () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(scroll); };
    const updatePointer = (now: number) => {
      pointerFrame = 0;
      if (now - lastPointer < 45) { pointerFrame = requestAnimationFrame(updatePointer); return; }
      lastPointer = now;
      root.style.setProperty("--material-light-x", `${((pointer.x + 1) * 50).toFixed(1)}%`);
      root.style.setProperty("--material-light-y", `${((pointer.y + 1) * 50).toFixed(1)}%`);
      root.style.setProperty("--material-parallax-x", `${(pointer.x * (caseStudy ? 3 : 18)).toFixed(1)}px`);
      root.style.setProperty("--material-parallax-y", `${(pointer.y * (caseStudy ? 2 : 12)).toFixed(1)}px`);
      const influence = caseStudy ? 0.2 : 1;
      setRotation([pointer.y * 0.1 * influence, pointer.x * 0.16 * influence]);
    };
    const onPointer = (event: PointerEvent) => {
      if (reducedMotion || event.pointerType === "touch") return;
      pointer = { x: event.clientX / window.innerWidth * 2 - 1, y: event.clientY / window.innerHeight * 2 - 1 };
      if (!pointerFrame) pointerFrame = requestAnimationFrame(updatePointer);
    };
    const engage = (target: EventTarget | null) => {
      if (caseStudy) return;
      const control = target instanceof Element ? target.closest<HTMLElement>("a, button") : null;
      const explicit = control?.dataset.materialForm as MaterialForm;
      const href = control?.getAttribute("href");
      hoverForm = explicit && forms.has(explicit) ? explicit : href?.startsWith("/projects/") ? materialContextForPath(href).form : null;
      apply();
    };
    const onOver = (event: PointerEvent) => engage(event.target);
    const onOut = (event: PointerEvent) => engage(event.relatedTarget);
    const onFocus = (event: FocusEvent) => engage(event.target);
    const onBlur = (event: FocusEvent) => engage(event.relatedTarget);
    scroll();
    const changes = new MutationObserver(onScroll);
    const main = document.querySelector("main");
    if (main && !caseStudy) changes.observe(main, { attributes: true, subtree: true, attributeFilter: ["data-material-form"] });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("focusin", onFocus);
    document.addEventListener("focusout", onBlur);
    return () => {
      cancelAnimationFrame(scrollFrame);
      cancelAnimationFrame(pointerFrame);
      changes.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("focusout", onBlur);
    };
  }, [router.asPath, path, caseStudy, reducedMotion]);

  return <div ref={surface} className={`material-atmosphere ${ready ? "is-ready" : ""}`} aria-hidden="true" data-form={form} data-surface={caseStudy ? "case-study" : "ambient"}>
    <div className="material-atmosphere-volume">
      <MaterialObject form={form} exploded={false} rotation={rotation} progress={progress}
        reducedMotion={!!reducedMotion} ambient onReady={() => setReady(true)} onError={() => setReady(false)} />
    </div>
    <div className="material-atmosphere-thread" />
  </div>;
}
