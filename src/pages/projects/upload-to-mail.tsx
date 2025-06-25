import { GetStaticProps } from "next";
import ProjectLayout from "@/components/projects/ProjectLayout";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectSection from "@/components/projects/ProjectSection";
import ProjectCTA from "@/components/projects/ProjectCTA";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";

interface UploadToMailProps {
  // Add any props if needed
}

const UploadToMail = (props: UploadToMailProps) => {
  const techStack = [
    "React",
    "TypeScript",
    "Express.js",
    "PostgreSQL",
    "Drizzle ORM",
    "Stripe",
    "Docker",
    "Jest",
    "Playwright",
    "Radix UI",
    "Tailwind CSS",
    "Framer Motion",
    "Auth0",
  ];

  return (
    <ProjectLayout>
      <ProjectHero
        title="Upload to Mail"
        description="A production-ready digital-to-physical mail service that bridges online document creation with traditional postal delivery through secure processing, address verification, and automated fulfillment."
        image="/images/projects/upload-to-mail.jpg"
        githubUrl="https://github.com/hopeatina/uploadtomail"
        liveUrl="https://uploadtomail.com"
        status="Production"
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
              React 18 with TypeScript, Radix UI components, Tailwind CSS, and
              Framer Motion animations
            </p>
          </Card>
          <Card className="p-4">
            <h4 className="font-medium mb-2">Backend</h4>
            <p className="text-sm text-muted-foreground">
              Express.js server with PostgreSQL database, Drizzle ORM, and
              comprehensive API layer
            </p>
          </Card>
          <Card className="p-4">
            <h4 className="font-medium mb-2">Infrastructure</h4>
            <p className="text-sm text-muted-foreground">
              Docker containerization, automated testing with Jest & Playwright,
              CI/CD pipeline
            </p>
          </Card>
        </div>
      </ProjectSection>

      {/* Problem Context */}
      <ProjectSection title="The Problem">
        <div className="prose max-w-none">
          <p>
            Small businesses, remote workers, and individuals frequently need to
            send physical documents but lack access to printers, stamps, or
            postal infrastructure. The traditional solution requires multiple
            trips: creating documents digitally, printing them, purchasing
            postage, and visiting post offices. This process is time-consuming,
            expensive, and often impossible for remote workers or those without
            reliable postal access.
          </p>

          <div className="bg-muted p-4 rounded-lg my-6">
            <h4 className="font-medium mb-2">Real User Pain Points</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>
                Remote workers needing to send signed contracts and legal
                documents
              </li>
              <li>Small businesses lacking mailroom infrastructure</li>
              <li>International users requiring US postal services</li>
              <li>
                Time-sensitive document delivery without reliable printer access
              </li>
            </ul>
          </div>
        </div>
      </ProjectSection>

      {/* Solution Architecture */}
      <ProjectSection title="Solution Architecture">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Core System Design</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-medium">Document Processing Pipeline</h4>
                <p className="text-sm text-muted-foreground">
                  Secure file upload → Format validation → Preview generation →
                  Print queue management
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-medium">Address Verification System</h4>
                <p className="text-sm text-muted-foreground">
                  Real-time USPS address validation with intelligent correction
                  suggestions
                </p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h4 className="font-medium">Payment & Fulfillment</h4>
                <p className="text-sm text-muted-foreground">
                  Stripe integration with automated print vendor coordination
                  and tracking
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-3">Technical Metrics</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium">Test Coverage</div>
                <div className="text-muted-foreground">
                  95%+ across all layers
                </div>
              </div>
              <div>
                <div className="font-medium">API Response Time</div>
                <div className="text-muted-foreground">&lt;200ms average</div>
              </div>
              <div>
                <div className="font-medium">File Processing</div>
                <div className="text-muted-foreground">PDF, DOCX, Images</div>
              </div>
              <div>
                <div className="font-medium">Security</div>
                <div className="text-muted-foreground">Auth0 + hCaptcha</div>
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
              Production-Grade Testing Strategy
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="font-medium mb-3">Comprehensive Test Suite</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>Unit Tests:</strong> Jest with React Testing Library
                    for component testing
                  </li>
                  <li>
                    <strong>Integration Tests:</strong> API endpoint testing
                    with Supertest
                  </li>
                  <li>
                    <strong>E2E Tests:</strong> Playwright for complete user
                    workflow validation
                  </li>
                  <li>
                    <strong>Visual Tests:</strong> Snapshot testing for UI
                    consistency
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h4 className="font-medium mb-3">CI/CD Pipeline</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>Automated Testing:</strong> All tests run on every
                    commit
                  </li>
                  <li>
                    <strong>Code Quality:</strong> ESLint, TypeScript strict
                    mode
                  </li>
                  <li>
                    <strong>Security Scanning:</strong> Dependency vulnerability
                    checks
                  </li>
                  <li>
                    <strong>Performance:</strong> Bundle size analysis and
                    optimization
                  </li>
                </ul>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">
              Advanced Frontend Architecture
            </h3>
            <div className="prose max-w-none">
              <p>
                Built with React 18 and TypeScript for type safety and modern
                React patterns. The UI leverages Radix UI primitives for
                accessibility compliance and consistent design system
                implementation. Key features include:
              </p>

              <div className="grid md:grid-cols-3 gap-4 my-6">
                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">Document Preview System</h4>
                  <p className="text-sm text-muted-foreground">
                    Real-time PDF and image preview with zoom, rotation, and
                    page navigation controls
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">Guided Onboarding Flow</h4>
                  <p className="text-sm text-muted-foreground">
                    Multi-step form with progress tracking, validation, and
                    contextual help tooltips
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">Responsive Design</h4>
                  <p className="text-sm text-muted-foreground">
                    Mobile-first approach with touch-optimized interactions and
                    adaptive layouts
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">
              Database & API Design
            </h3>
            <div className="prose max-w-none">
              <p>
                PostgreSQL database with Drizzle ORM provides type-safe database
                operations and automatic migration management. The API
                architecture emphasizes security, performance, and scalability:
              </p>

              <div className="bg-muted p-6 rounded-lg my-6">
                <h4 className="font-medium mb-3">
                  Key Technical Implementations
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium mb-2">Security Features</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Auth0 integration for secure authentication</li>
                      <li>• hCaptcha integration to prevent abuse</li>
                      <li>• Rate limiting and request validation</li>
                      <li>• Secure file upload with virus scanning</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">
                      Performance Optimizations
                    </h5>
                    <ul className="text-sm space-y-1">
                      <li>• Connection pooling for database efficiency</li>
                      <li>• Async processing for large file uploads</li>
                      <li>• CDN integration for static asset delivery</li>
                      <li>• Caching strategies for frequently accessed data</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* Business Impact */}
      <ProjectSection title="Business Impact & Metrics">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">40%</div>
            <div className="text-sm text-muted-foreground">
              Faster document delivery vs traditional mail
            </div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">$12</div>
            <div className="text-sm text-muted-foreground">
              Average cost savings per document sent
            </div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-sm text-muted-foreground">
              Uptime with automated monitoring
            </div>
          </Card>
        </div>

        <div className="mt-8 prose max-w-none">
          <p>
            The platform addresses a genuine market need, evidenced by
            consistent user adoption and positive feedback from small businesses
            and remote workers. The combination of technical excellence and
            practical utility demonstrates both engineering skills and product
            market fit understanding.
          </p>
        </div>
      </ProjectSection>

      <ProjectCTA
        nextProject={{
          title: "TaskToModel",
          description: "AI model creation platform",
          href: "/projects/tasktomodel",
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

export default UploadToMail;
