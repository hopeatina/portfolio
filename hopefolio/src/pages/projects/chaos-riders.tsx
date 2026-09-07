import CaseStudyNarrative from "@/components/v4/CaseStudyNarrative";

export default function ChaosRidersPage() {
  return (
    <CaseStudyNarrative
      pageTitle="Chaos Riders case study — Hope Atina"
      description="A Cameroon-rooted driving world explored through creative direction, a Three.js browser prototype, and a tactile steer, steady, and flow interaction."
      index="Case 07 / interactive worlds"
      status="Independent project · playable prototype"
      title="Chaos Riders"
      subtitle="Read the road. Find the line. Hold your nerve."
      introduction="Chaos Riders brings the markets, taxis, weather, and roads of Cameroon into a driving world. My work connects creative direction and product engineering: a launch experience that establishes the world, and a playable browser prototype that puts its central idea under your thumb. The larger game remains in development."
      facts={[
        { label: "Role", value: "Direction + engineering", note: "independent project" },
        { label: "World", value: "Cameroon first", note: "Yaoundé · Douala · Bamenda · Limbe" },
        { label: "Runtime", value: "Three.js + React", note: "browser prototype" },
        { label: "Interaction", value: "Steer / steady / flow", note: "touch + keyboard controls" },
      ]}
      heroProof={{
        src: "/images/case-studies/chaos-riders/world-market.webp",
        width: 3840,
        height: 2144,
        alt: "Chaos Riders concept artwork of a weathered taxi turning through a dusty Yaoundé market",
        label: "World direction / Yaoundé concept art",
        caption: "A visual target for the world: a working taxi, market density, warm dust, and a readable route through the street. This is concept art; a captured browser prototype appears below.",
      }}
      problem={{
        eyebrow: "A world has to survive contact with the player",
        title: "The place needed to shape the driving, down to the next small correction.",
        body: (
          <>
            <p>
              A market street asks different things of a driver than a clean circuit. The road is
              uneven, openings narrow, and the best route changes as hazards approach. Those conditions
              offered the core interaction: look ahead, choose a line, and keep the machine settled.
            </p>
            <p>
              The experience also had to make sense in a browser and on a phone. A large imagined world
              could establish ambition, but a short playable run had to explain what the player would
              actually do.
            </p>
          </>
        ),
        notes: [
          "Give the setting a mechanical consequence.",
          "Make the first run understandable with touch or a keyboard.",
          "Keep the visual target and the playable build clearly identified.",
        ],
      }}
      insight={{
        eyebrow: "A line is a promise",
        title: "The guidance on the road has to agree with the road itself.",
        body: (
          <p>
            The racing line becomes useful when it responds to the same potholes that can unsettle the
            car. In the prototype, hazards are generated first, then the line bends around them. Its
            purpose is legible in motion: it gives the player a path to read, a reason to steer, and a
            reference for judging the quality of a run.
          </p>
        ),
      }}
      decision={{
        eyebrow: "Make one small drive carry the idea",
        title: "Build a short loop of anticipation, correction, and earned momentum.",
        body: (
          <>
            <p>
              The browser demo begins with a twenty-second clock. Steering selects the route; braking
              creates room to react; a timed steady action helps control the machine through a hazard
              field. Clean driving earns flow feedback and a speed boost. Camera response, road motion,
              and the HUD make the consequences visible.
            </p>
            <p>
              That compact loop gave the project a concrete center while the regional world, vehicles,
              and broader game continued to develop.
            </p>
          </>
        ),
      }}
      flow={[
        { glyph: "context", label: "Read ahead", detail: "The line reveals a route through the approaching pothole field." },
        { glyph: "branch", label: "Choose the opening", detail: "Steer toward the route and brake when the next correction needs more room.", tone: "cold" },
        { glyph: "judgment", label: "Steady the machine", detail: "Time the steady action as the field challenges the car's stability.", tone: "heat" },
        { glyph: "receipt", label: "Carry the momentum", detail: "Clean sectors trigger flow; impacts and line quality remain visible in the run feedback." },
      ]}
      system={{
        eyebrow: "The same road, through every layer",
        title: "Track math, vehicle response, and presentation share one playable situation.",
        introduction: "The launch prototype has its own focused runtime. It pairs deterministic track functions with a Three.js scene and a React interface, while keeping the larger game's engine exploration separate.",
        layers: [
          { label: "world", title: "Generate hazards before guidance", detail: "Deterministic distance-based functions place pothole fields and compute the line around nearby hazards.", technology: "TypeScript · pure track functions", tone: "cold" },
          { label: "response", title: "Translate input into a felt consequence", detail: "Steering, braking, timed stability, collision response, and flow operate on the current run state.", technology: "Touch · keyboard · frame loop", tone: "heat" },
          { label: "scene", title: "Keep the road and the feedback together", detail: "The rendered road, hazard positions, vehicle, camera, and HUD express the same driving state.", technology: "Three.js · React Three Fiber", tone: "signal" },
          { label: "entry", title: "Let the visitor choose when to drive", detail: "The launch page introduces the world, then loads the playable demo at its explicit play interaction.", technology: "React lazy · Suspense · Vite" },
        ],
        rationale: [
          { pressure: "A decorative line can disagree with the hazards", choice: "Compute guidance from the generated potholes", reason: "What the player sees refers to the same situation the collision loop evaluates." },
          { pressure: "A short demo needs more than left and right", choice: "Combine route choice, braking, stability timing, and flow", reason: "A small input vocabulary supports anticipation and increasingly deliberate control." },
          { pressure: "A rich world can become an expensive first impression", choice: "Make the playable runtime an explicit lazy-loaded entry", reason: "Visitors can understand the setting before committing to the driving interaction." },
        ],
        decisions: [
          {
            id: "hazards-first",
            label: "make guidance accountable",
            before: "The visible path and the collision system could describe different versions of the road.",
            decision: "Generate deterministic pothole fields, then use smooth repulsion and road bounds to shape the line around them.",
            consequence: "Rendering and collision can query the same track functions at any distance. The route has a mechanical basis.",
            evidence: "Shared track functions · hazard fields · computed line",
            tone: "cold",
          },
          {
            id: "small-input-deep-loop",
            label: "make control worth learning",
            before: "Automatic acceleration and simple steering leave little room for a player to improve intentionally.",
            decision: "Add braking, a timed steady action, line-quality feedback, and flow rewards for clean fields.",
            consequence: "Players can trade speed for control, then feel a clean sequence turn back into momentum.",
            evidence: "Steer · brake · steady · flow",
            tone: "heat",
          },
          {
            id: "world-to-play",
            label: "give the world a playable center",
            before: "Regional art and vehicle direction can establish atmosphere without explaining the actual game.",
            decision: "Place an explicitly activated driving prototype inside the launch experience and distinguish it from concept imagery.",
            consequence: "The visitor can move from the proposed world to a concrete run and understand the current scope.",
            evidence: "Launch chapters · lazy-loaded demo · separate concept and build labels",
            tone: "signal",
          },
        ],
        surfaces: [
          { name: "World introduction", mode: "creative direction", detail: "Regional imagery connects markets, highlands, rain, and coast to distinct driving conditions." },
          { name: "Playable run", mode: "interaction", detail: "A bounded browser scene puts line reading, steering, braking, and stability under direct control." },
          { name: "Run feedback", mode: "consequence", detail: "The clock, speed, line quality, impacts, and flow make performance inspectable during and after a run." },
          { name: "Vehicle garage", mode: "exploration", detail: "The launch experience introduces the machines and their personalities; model development continues alongside the prototype." },
        ],
        technologies: [
          { label: "Runtime", values: ["Three.js", "React Three Fiber", "TypeScript"] },
          { label: "Interface", values: ["React", "Framer Motion", "touch + keyboard"] },
          { label: "Delivery", values: ["Vite", "lazy-loaded demo", "WebP imagery"] },
        ],
        toolEvidence: [
          { name: "Three.js", category: "Rendering", project: "Playable prototype", reason: "Road geometry, vehicles, lighting, and hazards share a real-time scene that responds to the player's driving." },
          { name: "React Three Fiber", category: "Interaction", project: "Playable prototype", reason: "The game loop joins React state to the camera, vehicle, track, and immediate driving feedback." },
          { name: "Blender", category: "Asset authoring", project: "Vehicle pipeline · in development", reason: "Vehicle geometry, material studies, and repeatable review views are authored in the evolving local asset pipeline." },
          { name: "Python", icon: "python", category: "Pipeline", project: "Vehicle authoring + QA", reason: "Blender scripts build components, set up camera comparisons, and inspect geometry across vehicle revisions." },
          { name: "FFmpeg", category: "Media", project: "Vehicle review", reason: "Frame sequences become turntable and comparison videos for reviewing the asset work in motion." },
          { name: "TypeScript", icon: "typescript", category: "Runtime", project: "Game + launch site", reason: "Typed vehicle, track, and input state keep the browser prototype's response understandable as it evolves." },
          { name: "React", icon: "react", category: "Interface", project: "Launch experience", reason: "The regional story, game entry point, and driving HUD connect through one component-based interface." },
          { name: "Framer Motion", category: "Motion", project: "Launch experience", reason: "Transitions and interactive presentation carry the world's pace into the surrounding launch site." },
          { name: "Vite", category: "Delivery", project: "Browser build", reason: "The build separates the playable scene from the initial landing experience through a lazy-loaded demo." },
        ],
      }}
      proofs={[
        {
          src: "/images/case-studies/chaos-riders/prototype-gameplay.png",
          width: 1440,
          height: 900,
          alt: "Captured Chaos Riders browser prototype with a taxi on a market road, racing line, countdown, speed, and smooth-line feedback",
          label: "Playable prototype / captured browser build",
          caption: "An existing development capture of the playable scene. The road, taxi, racing line, countdown, speed, and line-quality readout are rendered together. This documents the prototype rather than a released full game.",
        },
        {
          src: "/images/case-studies/chaos-riders/bamenda-world.webp",
          width: 3200,
          height: 1786,
          alt: "Chaos Riders Bamenda concept artwork showing a taxi climbing a winding mist-covered highland road",
          label: "Regional direction / Bamenda concept art",
          caption: "The Bamenda world concept shifts the driving proposition toward highland climbs and control. Regional artwork establishes the intended range; it does not imply that every location is already playable.",
        },
      ]}
      learning={{
        eyebrow: "Materiality is also response",
        title: "A world starts to feel real when a small action changes what happens next.",
        body: (
          <>
            <p>
              The strongest connection between the art and the prototype is the demand the road makes
              on the player. A turn, a patch of broken ground, and the decision to brake can carry as
              much identity as a large establishing image. The work continues at that boundary:
              bringing the visual direction closer to the playable response without losing clarity.
            </p>
            <p>
              The current evidence is a launch experience, a playable browser prototype, and an
              evolving game and asset pipeline. The broader game and its regional modes remain in development.
            </p>
          </>
        ),
        notes: [
          "Let the environment determine the interaction.",
          "Use motion and feedback to explain consequence.",
          "Show the visual ambition and the running build with equal precision.",
        ],
      }}
      primaryLink={{ href: "#project-evidence", label: "See the prototype captures" }}
      next={{ href: "/projects/meridian", label: "Next / decision systems", title: "Meridian" }}
    />
  );
}
