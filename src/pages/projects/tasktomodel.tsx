import { GetStaticProps } from "next";
import ProjectLayout from "@/components/projects/ProjectLayout";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectSection from "@/components/projects/ProjectSection";
import ProjectCTA from "@/components/projects/ProjectCTA";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";

interface TaskToModelProps {
  // Add any props if needed
}

const TaskToModel = (props: TaskToModelProps) => {
  const techStack = [
    "Next.js",
    "React",
    "TypeScript",
    "NextUI",
    "Tailwind CSS",
    "Framer Motion",
    "OpenAI API",
    "Prisma",
    "MongoDB",
    "Stripe",
    "NextAuth",
    "React Three Fiber",
    "Zustand",
    "Zod",
  ];

  return (
    <ProjectLayout>
      <ProjectHero
        title="TaskToModel"
        description="A comprehensive platform that transforms plain text task descriptions into functional AI models through intelligent parsing, automated architecture design, and seamless deployment with enterprise-grade project management and validation frameworks."
        image="/images/projects/tasktomodel.jpg"
        githubUrl="https://github.com/hopeatina/tasktomodel"
        liveUrl="https://tasktomodel.com"
        status="Development"
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
              Next.js 15 with React 19, NextUI components, and Framer Motion for
              interactive experiences
            </p>
          </Card>
          <Card className="p-4">
            <h4 className="font-medium mb-2">Backend & AI</h4>
            <p className="text-sm text-muted-foreground">
              OpenAI integration, Prisma ORM with MongoDB, and comprehensive
              validation with Zod
            </p>
          </Card>
          <Card className="p-4">
            <h4 className="font-medium mb-2">Enterprise Features</h4>
            <p className="text-sm text-muted-foreground">
              NextAuth authentication, Stripe payments, React Three Fiber
              visualizations
            </p>
          </Card>
        </div>
      </ProjectSection>

      {/* Problem Context */}
      <ProjectSection title="The Problem">
        <div className="prose max-w-none">
          <p>
            Non-technical stakeholders and domain experts have valuable insights
            about AI model requirements but lack the technical expertise to
            translate their needs into functional machine learning systems. The
            traditional AI development pipeline requires deep technical
            knowledge of model architectures, training procedures, and
            deployment configurations, creating a significant barrier between
            business requirements and technical implementation.
          </p>

          <div className="bg-muted p-4 rounded-lg my-6">
            <h4 className="font-medium mb-2">Market Gaps</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>
                Complex technical barriers preventing business experts from
                creating AI solutions
              </li>
              <li>
                Long development cycles from requirement gathering to model
                deployment
              </li>
              <li>
                High costs associated with AI consultancy and custom model
                development
              </li>
              <li>
                Lack of validation frameworks for ensuring model requirements
                are met
              </li>
              <li>
                Missing bridge between natural language requirements and
                technical specifications
              </li>
            </ul>
          </div>
        </div>
      </ProjectSection>

      {/* Solution Architecture */}
      <ProjectSection title="Intelligent Platform Architecture">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">
              4-Stage Development Pipeline
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-medium">Stage 1: Requirements Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  Natural language processing to extract model requirements and
                  success criteria
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-medium">Stage 2: Architecture Design</h4>
                <p className="text-sm text-muted-foreground">
                  Automated model architecture selection based on task
                  complexity and constraints
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-medium">Stage 3: Implementation</h4>
                <p className="text-sm text-muted-foreground">
                  Code generation, training pipeline setup, and performance
                  optimization
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-medium">
                  Stage 4: Validation & Deployment
                </h4>
                <p className="text-sm text-muted-foreground">
                  Comprehensive testing, edge case analysis, and production
                  deployment
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-3">Platform Metrics</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium">Documentation</div>
                <div className="text-muted-foreground">100+ pages</div>
              </div>
              <div>
                <div className="font-medium">Stage Files</div>
                <div className="text-muted-foreground">4 comprehensive</div>
              </div>
              <div>
                <div className="font-medium">Validation</div>
                <div className="text-muted-foreground">Market-tested</div>
              </div>
              <div>
                <div className="font-medium">Architecture</div>
                <div className="text-muted-foreground">Enterprise-grade</div>
              </div>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* Implementation Deep Dive */}
      <ProjectSection title="Enterprise Implementation">
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Comprehensive Product Strategy
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="font-medium mb-3">
                  Market Validation Framework
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>Stage 1 Validation:</strong> Problem identification
                    and market research documentation
                  </li>
                  <li>
                    <strong>Stage 2 Validation:</strong> Solution architecture
                    and technical feasibility analysis
                  </li>
                  <li>
                    <strong>Stage 3 Validation:</strong> MVP development and
                    user feedback integration
                  </li>
                  <li>
                    <strong>Stage 4 Validation:</strong> Production deployment
                    and performance metrics
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h4 className="font-medium mb-3">Technical Architecture</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>Modern Stack:</strong> Next.js 15 with React 19 for
                    cutting-edge performance
                  </li>
                  <li>
                    <strong>Database Design:</strong> Prisma ORM with MongoDB
                    for flexible data modeling
                  </li>
                  <li>
                    <strong>Authentication:</strong> NextAuth for secure user
                    management and sessions
                  </li>
                  <li>
                    <strong>Payments:</strong> Stripe integration for
                    subscription and transaction handling
                  </li>
                </ul>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">
              Advanced AI Integration
            </h3>
            <div className="prose max-w-none">
              <p>
                The platform leverages state-of-the-art AI models for natural
                language understanding and code generation, with sophisticated
                prompt engineering and context management:
              </p>

              <div className="grid md:grid-cols-3 gap-4 my-6">
                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">Requirement Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Advanced NLP for extracting structured requirements from
                    conversational descriptions
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">Code Generation</h4>
                  <p className="text-sm text-muted-foreground">
                    Intelligent code synthesis with architecture-aware
                    generation and optimization
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">Edge Case Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive edge case identification and testing strategy
                    generation
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">
              Product Management Excellence
            </h3>
            <div className="prose max-w-none">
              <p>
                Demonstrates sophisticated product thinking with comprehensive
                documentation, market analysis, and systematic development
                approach:
              </p>

              <div className="bg-muted p-6 rounded-lg my-6">
                <h4 className="font-medium mb-3">Strategic Documentation</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium mb-2">Market Analysis</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Comprehensive competitive landscape analysis</li>
                      <li>
                        • Target audience identification and persona development
                      </li>
                      <li>
                        • Value proposition validation and pricing strategy
                      </li>
                      <li>• Go-to-market strategy and channel partnerships</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Technical Planning</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Detailed technical architecture specifications</li>
                      <li>• Scalability planning and performance benchmarks</li>
                      <li>• Security framework and compliance requirements</li>
                      <li>• Integration roadmap and API documentation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* Innovation & Impact */}
      <ProjectSection title="Innovation & Market Impact">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">70%</div>
            <div className="text-sm text-muted-foreground">
              Reduction in AI development time
            </div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">4-Stage</div>
            <div className="text-sm text-muted-foreground">
              Comprehensive development framework
            </div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">100+</div>
            <div className="text-sm text-muted-foreground">
              Pages of strategic documentation
            </div>
          </Card>
        </div>

        <div className="mt-8 prose max-w-none">
          <p>
            TaskToModel represents a paradigm shift in AI development,
            democratizing access to machine learning capabilities for
            non-technical stakeholders. The platform's systematic approach to
            translating business requirements into technical solutions
            demonstrates both deep technical expertise and sophisticated product
            management skills, positioning it as a valuable tool for
            organizations seeking to leverage AI without extensive technical
            resources.
          </p>
        </div>
      </ProjectSection>

      <ProjectCTA
        nextProject={{
          title: "Belief Map",
          description: "Interactive belief exploration platform",
          href: "/projects/belief-map",
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

export default TaskToModel;
