import { GetStaticProps } from "next";
import ProjectLayout from "@/components/projects/ProjectLayout";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectSection from "@/components/projects/ProjectSection";
import ProjectCTA from "@/components/projects/ProjectCTA";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";

interface TransmorphProps {
  // Add any props if needed
}

const Transmorph = (props: TransmorphProps) => {
  const techStack = [
    "Next.js",
    "TypeScript",
    "React",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "OpenAI API",
    "MCP Protocol",
    "Railway",
    "Supabase",
    "Stripe",
    "Auth",
  ];

  return (
    <ProjectLayout>
      <ProjectHero
        title="Transmorph"
        description="A sophisticated web interface for MCP-Gen that transforms plain text descriptions into production-ready Model Context Protocol (MCP) servers with intelligent code generation, testing, and deployment capabilities."
        image="/images/projects/transmorph.jpg"
        githubUrl="https://github.com/hopeatina/mcp-gen"
        liveUrl="https://transmorph.dev"
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
              Next.js with TypeScript, modern React patterns, and Tailwind CSS
              for responsive design
            </p>
          </Card>
          <Card className="p-4">
            <h4 className="font-medium mb-2">Backend</h4>
            <p className="text-sm text-muted-foreground">
              Node.js with Express, OpenAI integration, and MCP protocol
              implementation
            </p>
          </Card>
          <Card className="p-4">
            <h4 className="font-medium mb-2">Infrastructure</h4>
            <p className="text-sm text-muted-foreground">
              Railway deployment, Supabase database, Stripe payments, and
              automated CI/CD
            </p>
          </Card>
        </div>
      </ProjectSection>

      {/* Problem Context */}
      <ProjectSection title="The Problem">
        <div className="prose max-w-none">
          <p>
            Developers working with AI applications need to create Model Context
            Protocol (MCP) servers to provide AI models with external
            capabilities. However, building these servers requires deep
            knowledge of the MCP specification, proper tool definitions, error
            handling, and deployment configurations. The traditional approach
            involves manually writing hundreds of lines of boilerplate code,
            understanding complex protocols, and managing deployment
            infrastructure.
          </p>

          <div className="bg-muted p-4 rounded-lg my-6">
            <h4 className="font-medium mb-2">Developer Pain Points</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>
                Complex MCP protocol implementation requiring deep specification
                knowledge
              </li>
              <li>
                Repetitive boilerplate code for server setup and tool
                definitions
              </li>
              <li>Manual deployment and configuration management</li>
              <li>Lack of testing frameworks for MCP server validation</li>
              <li>Integration challenges with different AI model providers</li>
            </ul>
          </div>
        </div>
      </ProjectSection>

      {/* Solution Architecture */}
      <ProjectSection title="Solution Architecture">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Intelligent Generation System
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-medium">Natural Language Processing</h4>
                <p className="text-sm text-muted-foreground">
                  Advanced LLM integration to parse natural language
                  requirements and generate structured server code
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-medium">Code Generation Engine</h4>
                <p className="text-sm text-muted-foreground">
                  Multi-language code generation supporting TypeScript, Python
                  with proper MCP protocol implementation
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-medium">Automated Deployment</h4>
                <p className="text-sm text-muted-foreground">
                  One-click deployment to Railway with environment configuration
                  and health monitoring
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-3">Technical Capabilities</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium">Generation Speed</div>
                <div className="text-muted-foreground">&lt;30 seconds</div>
              </div>
              <div>
                <div className="font-medium">Code Quality</div>
                <div className="text-muted-foreground">Production-ready</div>
              </div>
              <div>
                <div className="font-medium">Test Coverage</div>
                <div className="text-muted-foreground">Auto-generated</div>
              </div>
              <div>
                <div className="font-medium">Languages</div>
                <div className="text-muted-foreground">TS, Python</div>
              </div>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* Implementation Deep Dive */}
      <ProjectSection title="Implementation Highlights">
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Advanced LLM Integration
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="font-medium mb-3">Multi-Provider Support</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>OpenAI GPT-4:</strong> Primary generation engine
                    with advanced reasoning
                  </li>
                  <li>
                    <strong>Anthropic Claude:</strong> Secondary option for
                    diverse generation approaches
                  </li>
                  <li>
                    <strong>Prompt Engineering:</strong> Sophisticated prompt
                    templates for consistent output
                  </li>
                  <li>
                    <strong>Context Management:</strong> Intelligent context
                    window optimization
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h4 className="font-medium mb-3">Generation Pipeline</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>Requirements Analysis:</strong> Natural language
                    parsing and intent recognition
                  </li>
                  <li>
                    <strong>Architecture Planning:</strong> Automated system
                    design based on requirements
                  </li>
                  <li>
                    <strong>Code Generation:</strong> Multi-file project
                    generation with dependencies
                  </li>
                  <li>
                    <strong>Validation:</strong> Automated testing and quality
                    assurance
                  </li>
                </ul>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">MCP Protocol Mastery</h3>
            <div className="prose max-w-none">
              <p>
                The platform demonstrates deep understanding of the Model
                Context Protocol, generating servers that properly implement the
                specification including tool registration, resource management,
                and error handling:
              </p>

              <div className="grid md:grid-cols-3 gap-4 my-6">
                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">Tool Definition</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatic generation of properly typed tool interfaces with
                    input validation and error handling
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">Resource Management</h4>
                  <p className="text-sm text-muted-foreground">
                    Efficient resource lifecycle management with proper cleanup
                    and memory optimization
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">Protocol Compliance</h4>
                  <p className="text-sm text-muted-foreground">
                    Full MCP specification compliance with proper message
                    handling and state management
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">
              Enterprise-Grade Infrastructure
            </h3>
            <div className="prose max-w-none">
              <p>
                Built with scalability and reliability in mind, featuring
                comprehensive deployment automation and monitoring capabilities:
              </p>

              <div className="bg-muted p-6 rounded-lg my-6">
                <h4 className="font-medium mb-3">Infrastructure Features</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium mb-2">Deployment Automation</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Railway integration with one-click deployment</li>
                      <li>
                        • Environment variable management and secrets handling
                      </li>
                      <li>• Automated health checks and monitoring setup</li>
                      <li>
                        • Custom domain configuration and SSL certificates
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Quality Assurance</h5>
                    <ul className="text-sm space-y-1">
                      <li>
                        • Automated test generation for all generated tools
                      </li>
                      <li>• Code quality validation and linting</li>
                      <li>• Security scanning and vulnerability assessment</li>
                      <li>
                        • Performance profiling and optimization recommendations
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* Innovation Impact */}
      <ProjectSection title="Innovation & Impact">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">90%</div>
            <div className="text-sm text-muted-foreground">
              Reduction in MCP server development time
            </div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">15+</div>
            <div className="text-sm text-muted-foreground">
              Documentation files with comprehensive guides
            </div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">2000+</div>
            <div className="text-sm text-muted-foreground">
              Lines of production-ready code generated
            </div>
          </Card>
        </div>

        <div className="mt-8 prose max-w-none">
          <p>
            Transmorph represents a significant advancement in AI tooling
            development, making the Model Context Protocol accessible to
            developers regardless of their experience with the specification.
            The platform's ability to generate production-ready servers from
            natural language descriptions demonstrates sophisticated
            understanding of both AI capabilities and software engineering best
            practices.
          </p>
        </div>
      </ProjectSection>

      <ProjectCTA
        nextProject={{
          title: "Deep Human",
          description: "Personalized AI personas platform",
          href: "/projects/deep-human",
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

export default Transmorph;
