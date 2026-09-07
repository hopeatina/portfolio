export type MaterialForm = "knot" | "weave" | "orbit" | "bridge";

export interface MaterialContext {
  id: string;
  index: string;
  name: string;
  form: MaterialForm;
  principle: string;
  detail: string;
  layers: string;
  href: string;
  link: string;
}

export const materialContexts: Record<string, MaterialContext> = {
  home: {
    id: "continuity", index: "01", name: "The continuity knot", form: "knot",
    principle: "Different threads. One continuous system.",
    detail: "Memory, authority, and execution are separate concerns. The green thread is what must survive their handoff.",
    layers: "Separate the layers and the connection remains. That is the principle behind the work below.",
    href: "/projects", link: "Explore the work",
  },
  orgx: {
    id: "orgx", index: "01", name: "A context that holds", form: "knot",
    principle: "Many agents. One operating context.",
    detail: "The knot holds independent strands together: shared memory, bounded authority, and work with evidence attached.",
    layers: "Each agent keeps its own surface. Goals, decisions, and receipts remain connected across the system.",
    href: "/proof/orgx-mcp-server", link: "Inspect the MCP receipt",
  },
  alma: {
    id: "alma", index: "02", name: "The protected boundary", form: "bridge",
    principle: "Continuity where a dropped handoff costs a person.",
    detail: "Parallel paths stay aligned across a controlled boundary: clinical workflows, careful rollout, and accountable changes.",
    layers: "A workflow, its permissions, and its audit trail can be inspected separately. Reliability depends on their alignment.",
    href: "/projects/alma#main-content", link: "Read the clinical context",
  },
  perfpulse: {
    id: "perfpulse", index: "03", name: "The feedback loop", form: "orbit",
    principle: "Observe. Understand. Intervene deliberately.",
    detail: "A local signal returns to the person operating the machine. The loop stays small enough to respect what it is measuring.",
    layers: "Observation, warning, and intervention are distinct. A warning gives you context before you decide what to change.",
    href: "/projects/perfpulse#main-content", link: "Read the product story",
  },
  openclaw: {
    id: "openclaw", index: "04", name: "Across the host boundary", form: "bridge",
    principle: "The session ends. The organization continues.",
    detail: "A shared thread crosses separate execution surfaces, carrying organizational memory into the next agent session.",
    layers: "The host, the work graph, and the live controls have different jobs. Persistent state connects them.",
    href: "/projects/openclaw#main-content", link: "Read the integration story",
  },
  about: {
    id: "practice", index: "09", name: "A practice, woven", form: "weave",
    principle: "The strands keep their character.",
    detail: "Cameroonian roots, bioengineering, music, and shared making meet in one practice. None needs to disappear into the others.",
    layers: "Culture shapes interpretation. Engineering shapes mechanisms. Music shapes timing. Making together gives the work life.",
    href: "/about#life-thread-title", link: "Follow the biography",
  },
  proof: {
    id: "evidence", index: "10", name: "Close the loop", form: "orbit",
    principle: "The result has to return with evidence.",
    detail: "A claim is only one part of the loop. The baseline, the method, and the failure make it possible to judge what happened.",
    layers: "Separate the claim from its evidence. What remains should still be inspectable, reproducible, and honestly bounded.",
    href: "/proof", link: "Open the ledger",
  },
  "brain-buffet": {
    id: "brain-buffet", index: "05", name: "A path through knowledge", form: "weave",
    principle: "A course should carry the learner's context.",
    detail: "Goals, prior knowledge, and curiosity become a learning path. The weave gives individual lessons a structure worth returning to.",
    layers: "The learner's goal, the course plan, and the study experience have different jobs. Progress keeps them connected.",
    href: "/projects/brain-buffet#main-content", link: "Explore the learning experience",
  },
  neuromosaic: {
    id: "neuromosaic", index: "06", name: "From paper to possibility", form: "knot",
    principle: "Make the connections in the research inspectable.",
    detail: "Papers, neural architectures, and experiments meet in one research workbench. A proposed model stays connected to the ideas that shaped it.",
    layers: "A source paper, an architecture proposal, and an experiment are distinct artifacts. Their connection makes the next question more precise.",
    href: "/projects/neuromosaic#main-content", link: "Explore the research workbench",
  },
  "chaos-riders": {
    id: "chaos-riders", index: "07", name: "Motion with consequence", form: "orbit",
    principle: "Every input should come back as something felt.",
    detail: "Steering, momentum, and the world around the vehicle form a continuous exchange. The loop makes a small action feel physical.",
    layers: "The vehicle, the simulation, and the camera carry different parts of the experience. Their timing is what makes them feel connected.",
    href: "/projects/chaos-riders#main-content", link: "Explore the game world",
  },
  meridian: {
    id: "meridian", index: "08", name: "The deliberate crossing", form: "bridge",
    principle: "A signal is a reason to inspect, not permission to act.",
    detail: "Market research, an explanation, and a decision sit on different sides of a boundary. The bridge makes the review path visible.",
    layers: "Research, paper evaluation, and execution remain separate. Evidence has to earn the next step across the boundary.",
    href: "/projects/meridian#main-content", link: "Explore the research interface",
  },
};

export function materialContextForPath(path: string): MaterialContext {
  const clean = path.split(/[?#]/)[0];
  if (clean === "/about") return materialContexts.about;
  if (clean.startsWith("/proof") || clean.startsWith("/blog")) return materialContexts.proof;
  const project = clean.split("/")[2];
  return materialContexts[project] ?? materialContexts.home;
}
