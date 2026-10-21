import CaseStudyNarrative from "@/components/v4/CaseStudyNarrative";

export default function OpenBecomingPage() {
  return (
    <CaseStudyNarrative
      pageTitle="Open Becoming case study — Hope Atina"
      description="Open Becoming is a companion for becoming more: a Life Clock that maps moments across twelve ways of living, and Nib, a pen-tip companion that helps a person practise what they care about."
      index="Case 02 / a life in twelve ways"
      status="Founder-built · in development · design system v3, October 2026"
      title="Open Becoming"
      subtitle="Become more of who you are."
      introduction="You talk to it, jot a note, or add a photo. Open Becoming places it in one of twelve ways of living, helps you practise what you care about, and shows you how far you've come. I'm building the product, the brand, and the design system. Nothing here is a validated outcome yet, and every person shown is a labelled, fictional example."
      facts={[
        { label: "Job", value: "map a life, not a score" },
        { label: "Ownership", value: "founder · product · design system" },
        { label: "Boundary", value: "asking for help counts" },
        { label: "Delivery", value: "web prototypes · design system · film" },
        { label: "Status", value: "in development", note: "no waitlist, no outcome claims · October 2026" },
      ]}
      heroProof={{
        src: "/images/case-studies/open-becoming/home-hero.jpg",
        width: 1600,
        height: 1311,
        alt: "Open Becoming homepage, version seventeen. The headline Become more of who you are sits beside a Life Clock with photographs of real moments pinned into its slices.",
        label: "The homepage, v17 / paper, ink, marigold",
        caption: "Bright and paper-warm on purpose. The Life Clock is live, drawn by the engine, with photographs pinned into its slices as moments. One hollow dot rides the edge: still open.",
      }}
      problem={{
        eyebrow: "A calendar says where the time went",
        title: "Nothing in a person's records says what they chose, or what they're becoming.",
        body: (
          <>
            <p>
              Trackers score you. Habit apps count streaks. Self-help sells independence. None of
              them hold the shape of an actual life: a swim before work, a song finished for the
              first time, a hard conversation you had instead of avoided, a plant you kept alive.
            </p>
            <p>
              I wanted a place that keeps those moments in a person's own words, connects them to
              the ways of living they touch, and helps with the next small step. Without a score,
              and without pretending growth means needing people less.
            </p>
          </>
        ),
        notes: [
          "Twelve fixed ways: Body, Emotion, Attention, Taste, Judgment, Agency, Relationships, Care, Play, Learning, Meaning, Place.",
          "Inside each way, the person names their own pursuits in their own words.",
          "Health goes to a clinician. Body goals get no appearance scores. Money gets no advice.",
        ],
      }}
      insight={{
        eyebrow: "One idea at three scales",
        title: "A ring still being drawn. The dot is where the pen is now.",
        body: (
          <>
            <p>
              The Life Clock: the centre is when you started, the edge is now, and the angle is the
              way. Dots are moments you kept. A hollow dot is still open. Photos appear as grain,
              meaning time passed, not meaning. A life ring never closes; only tasks do.
            </p>
            <p>
              The logo is the same ring: the o of &ldquo;open&rdquo; with its gap at one-thirty and a
              marigold dot where the pen rests. Nib, the companion, is the pen tip. One drawing, at
              the scale of a mark, a map, and a character.
            </p>
          </>
        ),
      }}
      decision={{
        eyebrow: "The help ladder had the values backwards",
        title: "Progress can mean asking sooner, or asking the right person.",
        body: (
          <>
            <p>
              An early draft framed becoming more as needing less help. That is my own failure mode,
              not a value worth shipping. The practice loop now runs show me, help me try, hint, my
              call, ask someone, and asking someone is a step up the ladder, not a fall off it.
            </p>
            <p>
              Nib labels every reply as reflecting, pushing forward, pushing back, connecting you to
              a person, or staying quiet. The stance is always the person's choice. A suggestion
              can be argued with: it gets struck through in red, and nothing is saved as yours until
              you accept the wording.
            </p>
          </>
        ),
      }}
      flow={[
        { glyph: "context", label: "Notice", detail: "Say what happened. Voice, a note, or a photo. No forms." },
        { glyph: "branch", label: "Name", detail: "It lands in one of twelve ways, in your words. You can correct it.", tone: "cold" },
        { glyph: "judgment", label: "Practise", detail: "One small rep with the right help, including asking someone.", tone: "heat" },
        { glyph: "receipt", label: "Keep", detail: "What's true goes on your map. The ring stays open." },
      ]}
      system={{
        eyebrow: "A design system before a product",
        title: "The system is the mark, the clock, and the companion, built from one construction.",
        introduction: "Version three of the system is the single source for the site, the product screens, and the film. Everything is a ring or built from one; if it isn't, it gets cut. The linter enforces the rest.",
        layers: [
          { label: "ink", title: "One stroke engine for everything drawn", detail: "The open ring, the twelve way shapes (built from circles by union and overlap, at most one straight edge), the glyph family with one ink, one weight, and one gap, and the Life Clock. DOM-free.", technology: "ink.js · perfect-freehand · SVG", tone: "signal" },
          { label: "pigment", title: "A paint box, not a rainbow", detail: "Twelve real pigments computed in OKLCH, each with a deep, wash, and tint role, contrast-checked and distinctness-scored. Marigold belongs to the brand alone.", technology: "pigments.json · tokens.css", tone: "heat" },
          { label: "Nib", title: "The companion as the pen tip", detail: "Springs and a small timeline give Nib its states: enter, rest, listen, think, suggest, push back, connect, quiet, exit, and a morph into a way. The only living thing on the page; one ambient motion at a time.", technology: "nib.js · light-DOM custom elements", tone: "cold" },
          { label: "photography", title: "The moment of becoming", detail: "Documentary, chest height, real light, an honest detail, no text in frame. Photos live inside the system's shapes as moments on someone's clock. Generated casts are labelled fictional, never presented as participants.", technology: "cast briefs · humanity test (8 of 10)" },
        ],
        rationale: [
          { pressure: "Pencil-and-ink read as something anyone would do", choice: "One construction, the ring with a gap, at three scales", reason: "A brand you can draw in one stroke is ownable. A mood board is not." },
          { pressure: "The first direction board was warped, cheesy, and sparse", choice: "Clean rectangular photos, one strict twelve-column grid, text never over images", reason: "Confidence comes from restraint and real light, not blob masks and watercolour filters." },
          { pressure: "The help ladder implied independence equals progress", choice: "Make asking someone a rung, and give Nib a connecting stance", reason: "The product's values have to match the lesson that produced it." },
        ],
        surfaces: [
          { name: "Life Clock", mode: "my map", detail: "Years as rings, ways as slices, moments as dots. Open a way and it unfolds into your pursuits." },
          { name: "River", mode: "insights", detail: "Each way as a watercolour stream over time, with now at the right edge." },
          { name: "Practice session", mode: "practise", detail: "A situation, a small aim, your attempt before help, feedback you can inspect, a later check in a new setting." },
          { name: "Voice", mode: "talk", detail: "Every reply carries a stance. Quiet, curious, or challenging is always your choice." },
        ],
        technologies: [
          { label: "Drawing", values: ["SVG", "perfect-freehand", "canvas"] },
          { label: "Type", values: ["Bricolage Grotesque", "Newsreader", "Atkinson Hyperlegible Next", "IBM Plex Mono"] },
          { label: "Production", values: ["static HTML pages", "headless Chrome renders", "Codex", "Claude", "Midjourney"] },
        ],
        surfaceProofs: [
          {
            src: "/images/case-studies/open-becoming/clock.jpg",
            width: 1600,
            height: 1111,
            alt: "Open Becoming workspace showing the Life Clock with a selected moment: Rewrote a suggestion, with the person's own words and the way chips beside it",
            label: "My map / Clock",
            caption: "A selected moment shows its source, what it came from, and what it led to. Photos are traces, not scores. Jo is a fictional example.",
          },
          {
            src: "/images/case-studies/open-becoming/logo-board.jpg",
            width: 1400,
            height: 535,
            alt: "Open Becoming logo board: the wordmark with the o as an open ring and marigold dot, on paper, ink, and marigold, with app icon and favicon sizes",
            label: "The mark / generated from ink.js",
            caption: "Never edited by hand. The logo files are regenerated from the stroke engine and a shaped wordmark outline, so the mark and the clock can't drift apart.",
          },
        ],
      }}
      proofs={[
        {
          src: "/images/case-studies/open-becoming/loop.jpg",
          width: 1600,
          height: 1111,
          alt: "How it works: one loop drawn as a line with five numbered loops, Notice, Name, Practise, Reflect, Keep, each time round ending further out",
          label: "How it works / one loop, drawn",
          caption: "From a first deadlift to a first solo, every practice runs the same five steps. The loop never closes, so there's always a next time round.",
        },
        {
          src: "/images/case-studies/open-becoming/body-lift.jpg",
          width: 1200,
          height: 800,
          alt: "A person mid-lift in a plain gym, photographed at chest height in ordinary light",
          label: "Photography direction / the moment of becoming",
          caption: "The cast brief: swim, shot, IV, sing, bike, show, tree, run. Documentary light, an honest detail, no text in frame. This cast is generated and labelled fictional wherever it appears.",
          presentation: "identity",
        },
      ]}
      learning={{
        eyebrow: "What the product taught me",
        title: "The values in the product had to match the lesson that produced it.",
        body: (
          <>
            <p>
              Over-self-reliance is a failure mode I know from the inside. When the copy drifted
              toward glorifying it, the fix wasn't a word change. It was a rung on the ladder, a
              stance for the companion, and a rule in the system: the human moment wins, and asking
              for help counts.
            </p>
            <p>
              The next honest test is small: can one person understand and correct a connection on
              their map without being told how? Until that passes, Open Becoming stays in
              development, and this page makes no claim it hasn't earned.
            </p>
          </>
        ),
        notes: [
          "Draw the brand from the product's one idea, not from a mood.",
          "Repetition only as chrome or as progression; the strike appears once a view.",
          "Label fictional people as fictional, every time they appear.",
        ],
      }}
      primaryLink={{ href: "mailto:hopeatina@gmail.com?subject=Open%20Becoming", label: "Ask me about Open Becoming", external: true }}
      secondaryLink={{ href: "/projects/orgx", label: "The other half of the practice: OrgX" }}
      next={{ href: "/projects/alma", label: "Next / regulated production", title: "Alma" }}
    />
  );
}
