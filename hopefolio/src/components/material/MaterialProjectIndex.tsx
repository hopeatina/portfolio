import { useEffect, useState } from "react";
import MaterialSpecimen from "./MaterialSpecimen";
import { materialContexts } from "./material-context";
import { selectedProjects } from "@/data/selected-projects";

export default function MaterialProjectIndex() {
  const [active, setActive] = useState("orgx");
  useEffect(() => {
    const restore = () => {
      const id = window.location.hash.replace("#material-", "");
      if (selectedProjects.some((project) => project.slug === id)) setActive(id);
    };
    restore();
    window.addEventListener("hashchange", restore);
    return () => window.removeEventListener("hashchange", restore);
  }, []);
  return <div className="material-inner-object material-project-index" data-material-form={materialContexts[active].form}>
    <MaterialSpecimen context={{ ...materialContexts[active], href: `/projects/${active}`, link: "Read this case study" }} />
    <div className="material-project-choices" role="group" aria-label="Explore each project's material study">
      {selectedProjects.map(({ slug, selectorLabel }) => <button type="button" key={slug} data-material-form={materialContexts[slug].form} aria-pressed={active === slug} onClick={() => setActive(slug)}>{selectorLabel}</button>)}
    </div>
  </div>;
}
