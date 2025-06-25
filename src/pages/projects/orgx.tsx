import { GetStaticProps } from "next";
import ProjectLayout from "@/components/projects/ProjectLayout";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectSection from "@/components/projects/ProjectSection";
import ProjectCTA from "@/components/projects/ProjectCTA";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";

interface OrgXProps {
  // Add any props if needed
}

const OrgX = (props: OrgXProps) => {
  const techStack = [
    "Next.js",
    "React",
    "TypeScript",
    "React Flow",
    "Tailwind CSS",
    "Framer Motion",
    "Supabase",
    "OpenAI API",
    "Zustand",
    "Radix UI",
    "Lodash",
    "Sentry",
    "Vercel Analytics",
    "Vitest",
    "Playwright",
  ];

  return (
    <ProjectLayout>
      <ProjectHero
        title="OrgX"
        description="An advanced canvas-based project management platform featuring intelligent critical path analysis, real-time collaboration, and AI-accelerated product development workflows with sophisticated visualization and performance optimization."
        image="/images/projects/orgx.jpg"
        githubUrl="https://github.com/hopeatina/orgx"
        liveUrl="https://orgx.dev"
        status="Active"
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
              Next.js with React Flow for advanced canvas interactions, Framer
              Motion animations
            </p>
          </Card>
          <Card className="p-4">
            <h4 className="font-medium mb-2">Backend & Data</h4>
            <p className="text-sm text-muted-foreground">
              Supabase for real-time database, OpenAI integration, Zustand for
              state management
            </p>
          </Card>
          <Card className="p-4">
            <h4 className="font-medium mb-2">DevOps & Testing</h4>
            <p className="text-sm text-muted-foreground">
              Vitest unit testing, Playwright E2E, Sentry monitoring, Vercel
              deployment
            </p>
          </Card>
        </div>
      </ProjectSection>

      {/* Problem Context */}
      <ProjectSection title="The Problem">
        <div className="prose max-w-none">
          <p>
            Traditional project management tools fail to capture the complex
            interdependencies and dynamic nature of modern product development.
            Teams struggle with static, list-based interfaces that don't
            visualize critical paths, dependencies, or resource constraints.
            Existing solutions lack the flexibility to adapt to changing
            requirements and fail to provide intelligent insights that could
            accelerate development cycles and improve resource allocation.
          </p>

          <div className="bg-muted p-4 rounded-lg my-6">
            <h4 className="font-medium mb-2">Core Inefficiencies</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>
                Static project views that don't reflect dynamic
                interdependencies
              </li>
              <li>
                Lack of intelligent critical path analysis for optimal resource
                allocation
              </li>
              <li>
                Poor visualization of complex project architectures and
                workflows
              </li>
              <li>
                Missing real-time collaboration features for distributed teams
              </li>
              <li>
                Absence of AI-powered insights for project optimization and risk
                prediction
              </li>
            </ul>
          </div>
        </div>
      </ProjectSection>

      {/* Solution Architecture */}
      <ProjectSection title="Advanced Canvas Architecture">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Intelligent Visualization System
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-medium">React Flow Integration</h4>
                <p className="text-sm text-muted-foreground">
                  Advanced canvas-based interface with custom nodes, edges, and
                  interactive elements
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-medium">Critical Path Algorithm</h4>
                <p className="text-sm text-muted-foreground">
                  Automated critical path calculation with animated highlighting
                  and bottleneck identification
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-medium">Real-time Collaboration</h4>
                <p className="text-sm text-muted-foreground">
                  Supabase-powered real-time updates with conflict resolution
                  and collaborative editing
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-3">Performance Metrics</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium">Render Performance</div>
                <div className="text-muted-foreground">60 FPS canvas</div>
              </div>
              <div>
                <div className="font-medium">Node Capacity</div>
                <div className="text-muted-foreground">1000+ nodes</div>
              </div>
              <div>
                <div className="font-medium">Real-time Sync</div>
                <div className="text-muted-foreground">&lt;100ms latency</div>
              </div>
              <div>
                <div className="font-medium">Test Coverage</div>
                <div className="text-muted-foreground">Comprehensive</div>
              </div>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* Implementation Deep Dive */}
      <ProjectSection title="Technical Excellence">
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Advanced Canvas Performance
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="font-medium mb-3">Optimization Strategies</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>Virtualization:</strong> Efficient rendering for
                    large datasets with viewport culling
                  </li>
                  <li>
                    <strong>Memoization:</strong> React optimization patterns
                    for complex node calculations
                  </li>
                  <li>
                    <strong>State Management:</strong> Zustand for predictable
                    state updates and performance
                  </li>
                  <li>
                    <strong>Animation:</strong> Framer Motion for smooth
                    transitions and micro-interactions
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h4 className="font-medium mb-3">Algorithm Implementation</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>Critical Path:</strong> Advanced graph algorithms
                    for dependency analysis
                  </li>
                  <li>
                    <strong>Layout Engine:</strong> Automatic node positioning
                    with collision detection
                  </li>
                  <li>
                    <strong>Path Finding:</strong> Intelligent edge routing with
                    obstacle avoidance
                  </li>
                  <li>
                    <strong>Real-time Updates:</strong> Efficient diff
                    algorithms for collaborative editing
                  </li>
                </ul>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">
              Enterprise-Grade Infrastructure
            </h3>
            <div className="prose max-w-none">
              <p>
                Built with scalability and reliability as core requirements,
                featuring comprehensive monitoring, testing, and deployment
                automation:
              </p>

              <div className="grid md:grid-cols-3 gap-4 my-6">
                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">Real-time Database</h4>
                  <p className="text-sm text-muted-foreground">
                    Supabase integration with real-time subscriptions and
                    optimistic updates
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">AI Integration</h4>
                  <p className="text-sm text-muted-foreground">
                    OpenAI API for intelligent project insights and automated
                    task generation
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">Error Monitoring</h4>
                  <p className="text-sm text-muted-foreground">
                    Sentry integration for comprehensive error tracking and
                    performance monitoring
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">
              Quality Assurance Framework
            </h3>
            <div className="prose max-w-none">
              <p>
                Comprehensive testing strategy ensuring reliability and
                performance across all user scenarios:
              </p>

              <div className="bg-muted p-6 rounded-lg my-6">
                <h4 className="font-medium mb-3">Testing Architecture</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium mb-2">
                      Unit & Integration Testing
                    </h5>
                    <ul className="text-sm space-y-1">
                      <li>
                        • Vitest for fast, reliable unit testing with coverage
                        reporting
                      </li>
                      <li>
                        • Component testing with React Testing Library patterns
                      </li>
                      <li>
                        • Algorithm testing for critical path and layout
                        calculations
                      </li>
                      <li>
                        • Performance benchmarking for canvas rendering
                        optimization
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">End-to-End Testing</h5>
                    <ul className="text-sm space-y-1">
                      <li>
                        • Playwright for comprehensive user workflow validation
                      </li>
                      <li>
                        • Canvas interaction testing with visual regression
                        detection
                      </li>
                      <li>
                        • Real-time collaboration testing across multiple
                        sessions
                      </li>
                      <li>• Performance testing under high-load scenarios</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* Innovation Impact */}
      <ProjectSection title="Innovation & User Impact">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">50%</div>
            <div className="text-sm text-muted-foreground">
              Faster project planning and execution
            </div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">90%</div>
            <div className="text-sm text-muted-foreground">
              Improved critical path visibility
            </div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">1000+</div>
            <div className="text-sm text-muted-foreground">
              Node capacity with smooth performance
            </div>
          </Card>
        </div>

        <div className="mt-8 prose max-w-none">
          <p>
            OrgX demonstrates cutting-edge application of advanced web
            technologies to solve real business problems. The platform's
            sophisticated canvas-based interface, combined with intelligent
            algorithms and real-time collaboration features, represents a
            significant advancement in project management tooling. The technical
            implementation showcases expertise in performance optimization,
            complex state management, and enterprise-grade application
            architecture.
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

export default OrgX;
