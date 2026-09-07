import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import MaterialSpecimen from "./MaterialSpecimen";
import { materialContexts, MaterialContext } from "./material-context";

const chapters: Array<{ label: string; title: string; body: string; context: MaterialContext }> = [
  { label: "Memory", title: "Carry what matters.",
    body: "The next run inherits the goal, the decisions, and the prior proof. Distinct strands become context that can travel together.",
    context: { ...materialContexts.home, id: "memory", name: "Memory / the weave", form: "weave", principle: "Context travels as a whole.", detail: "Separate histories become a shared starting point. The signal is carried by the structure around it." } },
  { label: "Authority", title: "Give the boundary a shape.",
    body: "Agents act inside bounded permissions. High-consequence work waits for the right person. The boundary is part of the system.",
    context: { ...materialContexts.alma, id: "authority", href: "/projects/alma", link: "Explore Alma" } },
  { label: "Execution", title: "Cross without losing the thread.",
    body: "Claude, Codex, Cursor, and OpenClaw keep their native strengths. One operating context connects the work between them.",
    context: { ...materialContexts.orgx, id: "execution", index: "03", href: "/projects/orgx", link: "Explore OrgX" } },
  { label: "Proof", title: "Bring the result back.",
    body: "A result should leave the next person something they can inspect: a baseline, a measured change, and an honest account of what failed.",
    context: { ...materialContexts.proof, id: "proof", index: "04" } },
];

export default function MaterialJourney() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const selected = chapters.findIndex((chapter) => window.location.hash === `#chapter-${chapter.label.toLowerCase()}`);
    if (selected >= 0) setActive(selected);
    const elements = root.current?.querySelectorAll<HTMLElement>("[data-material-chapter]");
    if (!elements) return;
    const mobile = window.matchMedia("(max-width: 820px)");
    let observer: IntersectionObserver;
    const observe = () => {
      observer?.disconnect();
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.materialChapter));
      }, {
        // Percentage root margins resolve against width, including vertically.
        rootMargin: `-${window.innerHeight * (mobile.matches ? 0.55 : 0.25)}px 0px -${window.innerHeight * (mobile.matches ? 0.15 : 0.45)}px 0px`,
        threshold: 0,
      });
      elements.forEach((element) => observer.observe(element));
    };
    observe();
    window.addEventListener("resize", observe);
    return () => { observer.disconnect(); window.removeEventListener("resize", observe); };
  }, []);

  return (
    <section className="material-journey" ref={root} aria-labelledby="material-journey-title" data-material-form={chapters[active].context.form}>
      <header className="material-journey-header"><span>01 / A working philosophy, in four forms</span>
        <h2 id="material-journey-title">The shape of<br /><em>how I work.</em></h2>
        <p>One material. Different constraints.<br />Follow the thread as the work changes.</p>
      </header>
      <div className="material-journey-grid">
        <div className="material-chapters">
          {chapters.map((chapter, index) => <article key={chapter.label} id={`chapter-${chapter.label.toLowerCase()}`} data-material-chapter={index} className={active === index ? "is-active" : ""}>
            <span className="material-chapter-index">0{index + 1} / {chapter.label}</span>
            <h3>{chapter.title}</h3><p>{chapter.body}</p>
            <Link href={chapter.context.href}>{chapter.context.link} <span aria-hidden="true">↗</span></Link>
          </article>)}
        </div>
        <div className="material-journey-sticky">
          <MaterialSpecimen context={chapters[active].context} compact progress={active / 3} />
          <nav className="material-chapter-nav" aria-label="Material chapters">
            {chapters.map((chapter, index) => <a key={chapter.label} href={`#chapter-${chapter.label.toLowerCase()}`} aria-current={active === index ? "step" : undefined} onClick={() => setActive(index)}><span>0{index + 1}</span>{chapter.label}</a>)}
          </nav>
        </div>
      </div>
    </section>
  );
}
