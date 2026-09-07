import CaseStudyNarrative from "@/components/v4/CaseStudyNarrative";

export default function NeuromosaicPage() {
  return (
    <CaseStudyNarrative
      pageTitle="Neuromosaic case study — Hope Atina"
      description="A research workbench connecting papers, structured neural architectures, generated model code, and inspectable experiments."
      index="Case 06 / research systems"
      status="Research prototype · alpha"
      title="Neuromosaic"
      subtitle="Make the space between ideas inspectable."
      introduction="A neural architecture is more than a model name. It is a set of components, parameters, implementation choices, and experimental conditions. I built Neuromosaic to connect those layers: begin with research, describe an architecture, generate code, and keep the resulting experiment attached to what produced it."
      facts={[
        { label: "Role", value: "Research + engineering" },
        { label: "Audience", value: "ML researchers + builders" },
        { label: "Core", value: "Python + PyTorch" },
        { label: "Surfaces", value: "Explorer + CLI", note: "research prototype; incomplete search strategies" },
      ]}
      heroProof={{
        src: "/images/case-studies/neuromosaic/identity.png",
        width: 2048,
        height: 2048,
        presentation: "identity",
        alt: "Original Neuromosaic identity rendering with interlocking violet and blue forms around the product name",
        label: "Original identity / a family of related forms",
        caption: "The original website identity gives related structures distinct contours, held together as one family of forms.",
      }}
      problem={{
        eyebrow: "A paper is not yet an experiment",
        title: "Research knowledge loses its structure on the way into code.",
        body: <>
          <p>A paper may describe an attention mechanism, a normalization choice, and a training setup in different sections. Reconstructing a useful experiment means keeping those relationships intact while making room for deliberate variation.</p>
          <p>I wanted a workbench where the architecture, the generated implementation, and the recorded result could be inspected together. That required a common representation before adding a search algorithm or a richer visualization.</p>
        </>,
        notes: ["Keep components and parameters explicit.", "Preserve a route back to the source research.", "Attach experiment results to the implementation that produced them."],
      }}
      insight={{
        eyebrow: "Give the idea a representation",
        title: "An architecture becomes easier to vary when its choices have names and bounds.",
        body: <>
          <p>The architecture space separates continuous parameters from categorical choices: layer count, hidden size, attention heads, feed-forward variants, normalization, and activation. An encoder turns that specification into a vector that can be decoded again.</p>
          <p>That representation gives code generation and exploration something concrete to work with. The visual interfaces can then offer two different scales of inspection: a spatial model overview and a node-based architecture hierarchy.</p>
        </>,
      }}
      decision={{
        eyebrow: "Keep the provenance attached",
        title: "Treat generated code as one step in an experiment with a history.",
        body: <>
          <p>The orchestration cycle requests an architecture, generates code, versions it, runs the configured execution environment, and records the architecture specification alongside metrics and the code version. Cleanup sits in a finalization path so a failed run still has an exit.</p>
          <p>Paper ingestion follows a separate, staged job: download, extract metadata and architecture details, gather metrics and datasets, then persist the record. Its progress is exposed to the explorer instead of hiding the whole operation behind one spinner.</p>
        </>,
      }}
      flow={[
        { glyph: "context", label: "Read", detail: "Bring a paper into a staged extraction workflow." },
        { glyph: "branch", label: "Represent", detail: "Describe the components, categorical choices, and parameter ranges." },
        { glyph: "judgment", label: "Run", detail: "Generate and version the implementation before executing the configured experiment." },
        { glyph: "inspect", label: "Inspect", detail: "Return to the specification, code version, recorded metrics, and architecture view." },
      ]}
      system={{
        eyebrow: "Architecture / an experiment carries its context",
        title: "The interfaces change. The experiment needs to stay identifiable.",
        introduction: "A Python research core coordinates architecture encoding, code-generation providers, execution, and stored results. The Next.js explorer provides a separate route into papers and architecture structure.",
        layers: [
          { label: "research", title: "Extract a structured paper record", detail: "A staged processing job separates metadata, architectures, metrics, datasets, and implementation details.", technology: "FastAPI · Gemini integration · SQLModel", tone: "cold" },
          { label: "representation", title: "Make the search space explicit", detail: "Architecture vectors encode numerical bounds and categorical options rather than relying on a free-form model description.", technology: "Python · NumPy · architecture encoder", tone: "signal" },
          { label: "experiment", title: "Bind implementation to results", detail: "The orchestration cycle retains the architecture specification, code version, execution status, and returned metrics together.", technology: "PyTorch · provider interfaces · version control", tone: "cold" },
          { label: "inspection", title: "Move between overview and structure", detail: "The website includes selectable 3D model points and a pan-and-zoom hierarchy of architectural components.", technology: "React Three Fiber · Three.js · React Flow" },
        ],
        rationale: [
          { pressure: "A model name hides the choices worth changing", choice: "Encode bounded parameters and named component variants", reason: "Candidate architectures have an explicit specification before code generation begins." },
          { pressure: "A generated file can become detached from its result", choice: "Record code version, architecture, and metrics in one cycle", reason: "A result retains the context needed for later inspection and comparison." },
          { pressure: "An overview cannot explain a model's internal structure", choice: "Pair spatial model selection with a node-based hierarchy", reason: "Exploration and detailed inspection get different views of the research." },
        ],
        surfaces: [
          { name: "Paper explorer", mode: "discovery", detail: "Search and inspect papers while processing jobs expose their current stage." },
          { name: "Architecture view", mode: "structure", detail: "A React Flow hierarchy makes components and their relationships visible." },
          { name: "Model space", mode: "overview", detail: "Selectable 3D points provide a spatial route into model details." },
          { name: "CLI", mode: "experiment", detail: "Quickstart, workflow, inspection, and analysis commands frame the research loop." },
        ],
        technologies: [
          { label: "Research core", values: ["Python", "PyTorch", "NumPy", "Pydantic"] },
          { label: "Services", values: ["FastAPI", "SQLModel", "PostgreSQL", "Docker"] },
          { label: "Explorer", values: ["Next.js", "React Three Fiber", "React Flow", "TypeScript"] },
        ],
        toolEvidence: [
          { name: "Python", icon: "python", category: "Research", project: "Neuromosaic", reason: "One research core connects architecture specifications, code generation, experiment orchestration, and recorded results." },
          { name: "PyTorch", category: "Modeling", project: "Generated implementations", reason: "Generated model and training artifacts target the PyTorch module and tensor model; saved code remains distinct from a successful experiment." },
          { name: "NumPy", category: "Representation", project: "Architecture space", reason: "Numerical vectors encode architecture choices so specifications can be transformed, compared, and reconstructed." },
          { name: "FastAPI", category: "Service", project: "Research API", reason: "Structured endpoints expose papers, architectures, implementations, experiments, and metrics to the explorer." },
          { name: "Docker", category: "Execution", project: "Environment manager", reason: "A container provider gives generated experiments an explicit runtime boundary and environment checks." },
          { name: "TypeScript", icon: "typescript", category: "Interface", project: "Research explorer", reason: "Typed model and architecture data connect visual selection to detailed inspection in the Next.js client." },
          { name: "Three.js", category: "Spatial rendering", project: "Model visualization", reason: "A rendered model field makes relationships and selectable points visible at an overview scale." },
          { name: "React Three Fiber", category: "Interaction", project: "Model visualization", reason: "The React scene connects spatial model points, camera controls, and selection to the surrounding interface." },
          { name: "React Flow", category: "Structure", project: "Architecture view", reason: "The implemented graph component translates a model's hierarchy into inspectable nodes and relationships." },
        ],
      }}
      proofs={[
        {
          src: "/images/case-studies/neuromosaic/mosaic-study.png",
          width: 2048,
          height: 2048,
          alt: "Original Neuromosaic website artwork composed of reflective violet, teal, and blue tiles",
          label: "Original visual study / components and relationships",
          caption: "Original website artwork: reflective components remain individually visible while forming a larger field.",
        },
      ]}
      learning={{
        eyebrow: "Make the result traceable",
        title: "A useful research surface lets you follow the result back to its choices.",
        body: <>
          <p>The most consequential design choice was keeping architecture, implementation, and experiment context connected. A spatial overview helps you find something worth inspecting. The component hierarchy and recorded code version help you understand what you found.</p>
          <p>Neuromosaic remains an alpha research prototype: the explorer includes sample records, and parts of the search strategy are unfinished. A completed search loop and reproducible baseline are the next steps toward a defensible discovery claim.</p>
        </>,
        notes: ["Preserve the specification alongside the implementation.", "Give overview and detailed inspection distinct jobs.", "Make the difference between sample data and experimental evidence explicit."],
      }}
      primaryLink={{ href: "https://neuromosaic.vercel.app", label: "Open Neuromosaic", external: true }}
      secondaryLink={{ href: "/contact", label: "Discuss the research" }}
      next={{ href: "/projects/chaos-riders", label: "Next / emergent play", title: "Chaos Riders" }}
    />
  );
}
