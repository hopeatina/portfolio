import CaseStudyNarrative from "@/components/v4/CaseStudyNarrative";

export default function BrainBuffetPage() {
  return (
    <CaseStudyNarrative
      pageTitle="BrainBuffet case study — Hope Atina"
      description="Designing personal learning pathways: learner context, generated course previews, chapter progress, quizzes, and notes in one product."
      index="Case 05 / learning experience"
      status="Product prototype · 2024–2025"
      title="BrainBuffet"
      subtitle="Give curiosity somewhere to go."
      introduction="A topic is a starting point. A useful course also needs to understand what someone knows, what interests them, and what they want to do next. I built BrainBuffet's product experience around that context: shape a pathway, inspect the plan, and move through the material without losing your place."
      facts={[
        { label: "Role", value: "Product + engineering" },
        { label: "Audience", value: "Self-directed learners" },
        { label: "Experience", value: "Context → course → practice" },
        { label: "Scope", value: "Web application", note: "generation service integrated through an API" },
      ]}
      heroProof={{
        src: "/images/case-studies/brain-buffet/desktop-study.png",
        width: 1501,
        height: 1126,
        alt: "Saved BrainBuffet desktop composition showing a chapter, progress track, embedded video, and notes sidebar",
        label: "Saved product composition / the learning surface",
        caption: "A saved desktop composition brings the chapter experience together: a visible route through the material, contextual video, and notes beside the work.",
      }}
      problem={{
        eyebrow: "The blank prompt is only the beginning",
        title: "Getting an answer and learning a subject ask different things of a product.",
        body: <>
          <p>Someone arriving with a broad interest may not know which subtopics matter or where their existing knowledge stops. Asking them to specify the entire curriculum up front puts the hardest planning work on the learner.</p>
          <p>The experience needed to make that planning gradual, then carry the resulting context into a course with a visible structure and a clear next step.</p>
        </>,
        notes: ["Start with the learner's intent and prior knowledge.", "Let the learner inspect the plan before beginning.", "Keep progress and personal notes attached to the lesson."],
      }}
      insight={{
        eyebrow: "Personalization is a conversation",
        title: "Each answer should make the next choice more useful.",
        body: <>
          <p>I separated course creation into topic, expertise, subtopics, learning preferences, and a short expertise quiz. The selected topic and experience level feed subtopic recommendations; the chosen subtopics then shape the quiz request.</p>
          <p>That sequence turns an abstract promise of personalization into choices a person can understand and influence.</p>
        </>,
      }}
      decision={{
        eyebrow: "Make the learning state visible",
        title: "A course has a plan, a present moment, and a way back in.",
        body: <>
          <p>The preview exposes the course description, expected outcomes, and chapter outline. During generation, the interface checks the course's status and waits for usable preview data. Inside a chapter, the lesson, quiz feedback, progress, and notes share the same context.</p>
          <p>I treated those transitions as product states with their own purpose. The learner can see what is being prepared, what they are studying, and what they have already worked through.</p>
        </>,
      }}
      flow={[
        { glyph: "context", label: "Describe", detail: "Choose a topic and bring goals, interests, and experience into the creation flow." },
        { glyph: "branch", label: "Shape", detail: "Refine the scope through subtopics, preferences, and an expertise quiz." },
        { glyph: "inspect", label: "Preview", detail: "Inspect expected outcomes and the chapter plan after generation." },
        { glyph: "receipt", label: "Study", detail: "Read, answer, and keep notes with chapter-level progress." },
      ]}
      system={{
        eyebrow: "Architecture / context becomes a pathway",
        title: "Three connected states: what to learn, what is being prepared, and where you are now.",
        introduction: "React providers coordinate the creation and chapter experiences. The web client integrates with course, quiz, progress, and note services through a session-aware API layer.",
        layers: [
          { label: "learner context", title: "Make intent explicit", detail: "Goals, interests, expertise, selected subtopics, and preferences become structured inputs to the course flow.", technology: "React Context · TypeScript", tone: "cold" },
          { label: "course creation", title: "Separate preparation from study", detail: "A course identifier connects generation status to a preview with outcomes and an inspectable outline.", technology: "Next.js routing · course API", tone: "signal" },
          { label: "chapter state", title: "Keep the lesson coherent", detail: "A reducer coordinates the active step, selected quiz answers, and progress restored from chapter data.", technology: "React reducer · chapter API", tone: "cold" },
          { label: "personal record", title: "Attach notes to their context", detail: "Notes retain course, chapter, and step identifiers so observations can return with the material they refer to.", technology: "Supabase session · notes API" },
        ],
        rationale: [
          { pressure: "A topic alone hides the learner's starting point", choice: "Gather expertise and refine subtopics before generation", reason: "The request carries useful constraints instead of asking the learner to write a complete curriculum prompt." },
          { pressure: "Generation takes time and can return incomplete data", choice: "Give preparation a status and a separate preview", reason: "The interface has a place to explain progress before inviting someone into the lesson." },
          { pressure: "Reading, quizzes, and notes can lose their connection", choice: "Use chapter and step identifiers across the study experience", reason: "Progress and personal observations stay attached to the relevant material." },
        ],
        surfaces: [
          { name: "Course creation", mode: "guided", detail: "A sequence of choices builds the learner's brief." },
          { name: "Course preview", mode: "inspect", detail: "Outcomes and the chapter outline make the proposed course legible." },
          { name: "Chapter", mode: "practice", detail: "Lesson content, video, quiz feedback, and navigation share one focused surface." },
          { name: "Notes", mode: "return", detail: "Course and chapter filters help a learner revisit their own observations." },
        ],
        technologies: [
          { label: "Product", values: ["Next.js", "React", "TypeScript"] },
          { label: "Interface", values: ["Tailwind CSS", "NextUI", "Framer Motion"] },
          { label: "Integration", values: ["Supabase Auth", "Axios", "course and notes APIs"] },
        ],
        toolEvidence: [
          { name: "Next.js", icon: "next", category: "Product", project: "BrainBuffet", reason: "Routes connect course creation, preview, and study while retaining the course identifier between stages." },
          { name: "React", icon: "react", category: "Interaction", project: "Course + chapter flows", reason: "Context providers and reducers coordinate learner preferences, generation state, quiz answers, and chapter progress." },
          { name: "TypeScript", icon: "typescript", category: "Contracts", project: "Learning client", reason: "Typed course, chapter, and note models keep the different learning surfaces aligned." },
          { name: "Tailwind CSS", icon: "tailwind", category: "Interface", project: "BrainBuffet", reason: "Responsive layout utilities let the same course and chapter experience adapt from desktop to mobile." },
          { name: "NextUI", category: "Components", project: "Creation + study", reason: "Inputs, selection controls, accordions, and progress indicators give the guided workflow consistent interaction states." },
          { name: "Framer Motion", category: "Motion", project: "Step navigation", reason: "Animated chapter and creation headers help explain movement between steps and changing content." },
          { name: "Supabase", icon: "supabase", category: "Identity", project: "Learner sessions", reason: "Session-aware authentication connects a returning learner to their courses, progress, and personal notes." },
          { name: "Axios", category: "Integration", project: "Course + notes APIs", reason: "The shared API client carries the learner session into course generation, chapter progress, and note requests." },
        ],
      }}
      proofs={[
        {
          src: "/images/case-studies/brain-buffet/mobile-study.jpg",
          width: 1212,
          height: 2160,
          alt: "Saved BrainBuffet mobile composition with the original learning-adventure landing page and topic input",
          label: "Saved product composition / the invitation",
          caption: "The original mobile composition begins with a topic and an invitation to explore. A small first action opens into the more deliberate work of shaping a course.",
        },
      ]}
      learning={{
        eyebrow: "The moments between lessons",
        title: "Previewing, waiting, and returning are part of learning too.",
        body: <>
          <p>Building BrainBuffet taught me to look beyond the lesson itself. The preview helps someone decide whether a course fits. A clear generation state explains the wait. Progress and notes give a returning learner somewhere familiar to begin.</p>
          <p>The product remains a prototype. Its next useful test is the whole journey: whether someone can turn an initial question into a completed lesson, then return with enough context to keep going.</p>
        </>,
        notes: ["Make personalization visible in the choices people make.", "Design waiting, previewing, and resuming as complete states.", "Measure whether the learner can use what they learned."],
      }}
      primaryLink={{ href: "https://app.brainbuffet.co", label: "Open BrainBuffet", external: true }}
      secondaryLink={{ href: "/contact", label: "Discuss the work" }}
      next={{ href: "/projects/neuromosaic", label: "Next / research systems", title: "Neuromosaic" }}
    />
  );
}
