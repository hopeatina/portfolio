import { GetStaticProps } from "next";
import ProjectLayout from "@/components/projects/ProjectLayout";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectSection from "@/components/projects/ProjectSection";
import ProjectCTA from "@/components/projects/ProjectCTA";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";

interface BeliefMapProps {
  // Add any props if needed
}

const BeliefMap = (props: BeliefMapProps) => {
  const techStack = [
    "JavaScript",
    "HTML5",
    "CSS3",
    "Web Components",
    "LocalStorage",
    "Canvas API",
    "ES6 Modules",
    "Responsive Design",
  ];

  return (
    <ProjectLayout>
      <ProjectHero
        title="Belief Map"
        description="An interactive web application for exploring and visualizing personal belief systems through dynamic node-based mapping, enabling users to discover connections between their values, experiences, and worldview in an intuitive visual interface."
        image="/images/projects/belief-map.jpg"
        githubUrl="https://github.com/hopeatina/mybeliefmap"
        liveUrl="https://beliefmap.dev"
        status="Concept"
      />

      {/* Tech Stack Section */}
      <ProjectSection title="Technology Stack">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          {techStack.map((tech, index) => (
            <Tag key={index} variant="secondary">
              {tech}
            </Tag>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-4">
            <h4 className="font-medium mb-2">Frontend</h4>
            <p className="text-sm text-muted-foreground">
              Vanilla JavaScript with modern ES6+ features and Web Components
              for modular architecture
            </p>
          </Card>
          <Card className="p-4">
            <h4 className="font-medium mb-2">Visualization</h4>
            <p className="text-sm text-muted-foreground">
              Canvas API for dynamic node rendering with interactive connections
              and animations
            </p>
          </Card>
          <Card className="p-4">
            <h4 className="font-medium mb-2">Data Storage</h4>
            <p className="text-sm text-muted-foreground">
              LocalStorage for client-side persistence with JSON data structures
            </p>
          </Card>
        </div>
      </ProjectSection>

      {/* Problem Context */}
      <ProjectSection title="The Problem">
        <div className="prose max-w-none">
          <p>
            People struggle to understand the complex relationships between
            their beliefs, values, and experiences. Traditional methods of
            self-reflection—journaling, therapy, or meditation—often fail to
            reveal the interconnected nature of our belief systems. Without a
            clear visual representation of how our beliefs relate to each other,
            it becomes difficult to identify contradictions, understand the
            origins of our worldview, or make informed decisions about personal
            growth and change.
          </p>

          <div className="bg-muted p-4 rounded-lg my-6">
            <h4 className="font-medium mb-2">Self-Discovery Challenges</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>
                Difficulty visualizing complex relationships between personal
                beliefs and values
              </li>
              <li>
                Lack of tools for systematic exploration of worldview formation
              </li>
              <li>
                Missing connections between experiences and resulting belief
                systems
              </li>
              <li>
                Challenge in identifying contradictions or inconsistencies in
                personal philosophy
              </li>
              <li>
                No structured approach to examine belief evolution over time
              </li>
            </ul>
          </div>
        </div>
      </ProjectSection>

      {/* Solution Architecture */}
      <ProjectSection title="Interactive Visualization System">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Node-Based Mapping</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-medium">Dynamic Node Creation</h4>
                <p className="text-sm text-muted-foreground">
                  Interactive system for creating and categorizing belief nodes
                  with customizable properties
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-medium">Connection Mapping</h4>
                <p className="text-sm text-muted-foreground">
                  Visual connection system showing relationships, influences,
                  and contradictions between beliefs
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-medium">Progressive Discovery</h4>
                <p className="text-sm text-muted-foreground">
                  Guided exploration system that helps users uncover implicit
                  connections and patterns
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-3">User Experience Features</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium">Interface</div>
                <div className="text-muted-foreground">
                  Intuitive drag & drop
                </div>
              </div>
              <div>
                <div className="font-medium">Persistence</div>
                <div className="text-muted-foreground">Local data storage</div>
              </div>
              <div>
                <div className="font-medium">Customization</div>
                <div className="text-muted-foreground">Personal categories</div>
              </div>
              <div>
                <div className="font-medium">Exploration</div>
                <div className="text-muted-foreground">Guided discovery</div>
              </div>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* Implementation Deep Dive */}
      <ProjectSection title="Technical Implementation">
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Vanilla JavaScript Architecture
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="font-medium mb-3">Modern Web Standards</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>ES6 Modules:</strong> Clean, modular code
                    organization with proper separation of concerns
                  </li>
                  <li>
                    <strong>Web Components:</strong> Reusable custom elements
                    for consistent UI patterns
                  </li>
                  <li>
                    <strong>Canvas API:</strong> High-performance 2D graphics
                    for node rendering and animations
                  </li>
                  <li>
                    <strong>LocalStorage:</strong> Client-side data persistence
                    without external dependencies
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h4 className="font-medium mb-3">User Interface Design</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>Responsive Layout:</strong> Adaptive design that
                    works across desktop and mobile devices
                  </li>
                  <li>
                    <strong>Accessibility:</strong> ARIA labels and keyboard
                    navigation for inclusive user experience
                  </li>
                  <li>
                    <strong>Interactive Elements:</strong> Drag-and-drop
                    functionality with visual feedback
                  </li>
                  <li>
                    <strong>Animation System:</strong> Smooth transitions and
                    micro-interactions for engagement
                  </li>
                </ul>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Visualization Engine</h3>
            <div className="prose max-w-none">
              <p>
                The core visualization system uses HTML5 Canvas for
                high-performance rendering of complex node networks with
                real-time interaction capabilities:
              </p>

              <div className="grid md:grid-cols-3 gap-4 my-6">
                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">Node Rendering</h4>
                  <p className="text-sm text-muted-foreground">
                    Dynamic node creation with customizable shapes, colors, and
                    labels based on belief categories
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">Connection System</h4>
                  <p className="text-sm text-muted-foreground">
                    Intelligent edge drawing with different line styles
                    representing relationship types
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">Layout Algorithms</h4>
                  <p className="text-sm text-muted-foreground">
                    Force-directed layout with collision detection for optimal
                    node positioning
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Data Architecture</h3>
            <div className="prose max-w-none">
              <p>
                Efficient client-side data management with structured JSON
                storage and real-time synchronization:
              </p>

              <div className="bg-muted p-6 rounded-lg my-6">
                <h4 className="font-medium mb-3">Data Management Strategy</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium mb-2">Storage Structure</h5>
                    <ul className="text-sm space-y-1">
                      <li>
                        • Hierarchical JSON schema for belief categorization
                      </li>
                      <li>
                        • Efficient relationship mapping with unique identifiers
                      </li>
                      <li>
                        • Version control for tracking belief evolution over
                        time
                      </li>
                      <li>
                        • Export/import functionality for data portability
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">
                      Performance Optimization
                    </h5>
                    <ul className="text-sm space-y-1">
                      <li>• Lazy loading for large belief networks</li>
                      <li>• Efficient rendering with viewport culling</li>
                      <li>• Debounced user input for smooth interactions</li>
                      <li>• Memory management for long-term usage sessions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* Innovation & Impact */}
      <ProjectSection title="Personal Development Impact">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">Visual</div>
            <div className="text-sm text-muted-foreground">
              Intuitive belief system mapping
            </div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              Interactive
            </div>
            <div className="text-sm text-muted-foreground">
              Real-time exploration and discovery
            </div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              Insightful
            </div>
            <div className="text-sm text-muted-foreground">
              Hidden connection revelation
            </div>
          </Card>
        </div>

        <div className="mt-8 prose max-w-none">
          <p>
            Belief Map represents an innovative approach to personal
            introspection and self-discovery, combining intuitive visualization
            with systematic exploration of personal belief systems. The platform
            demonstrates technical proficiency in vanilla JavaScript while
            solving a meaningful human problem—helping people understand
            themselves better through visual mapping of their inner world. This
            project showcases both technical skill and empathetic product
            thinking, creating tools that facilitate personal growth and
            self-awareness.
          </p>
        </div>
      </ProjectSection>

      <ProjectCTA
        nextProject={{
          title: "Neuromosaic",
          description: "Distributed ML platform",
          href: "/projects/neuromosaic",
        }}
      />
    </ProjectLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default BeliefMap;
