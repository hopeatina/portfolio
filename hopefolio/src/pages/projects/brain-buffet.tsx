import React from "react";
import ProjectLayout from "@/components/projects/ProjectLayout";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectSection from "@/components/projects/ProjectSection";
import ProjectCTA from "@/components/projects/ProjectCTA";

export default function BrainBuffet() {
  return (
    <ProjectLayout
      title="Brain Buffet"
      description="AI-powered personalized learning platform that revolutionizes course creation and adaptive education"
    >
      <ProjectHero
        title="Brain Buffet"
        description="An innovative EdTech platform that leverages advanced AI to create personalized learning experiences, transforming how courses are designed, delivered, and consumed in the digital age."
        tags={[
          "EdTech",
          "LLM Integration",
          "Next.js",
          "Personalized Learning",
          "Course Creation",
          "AI",
        ]}
        image="/images/projects/brain-buffet.jpg"
      />

      <div className="bg-gray-50 dark:bg-gray-800 px-6 py-8 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">🔧 Tech Stack</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <strong>Frontend:</strong> Next.js, React, TypeScript
          </div>
          <div>
            <strong>Backend:</strong> Node.js, Express, GraphQL
          </div>
          <div>
            <strong>Database:</strong> PostgreSQL, Redis
          </div>
          <div>
            <strong>AI/ML:</strong> OpenAI GPT-4, Claude, Custom NLP
          </div>
          <div>
            <strong>Analytics:</strong> Mixpanel, Custom Dashboards
          </div>
          <div>
            <strong>Infrastructure:</strong> AWS, Vercel, Docker
          </div>
          <div>
            <strong>Payment:</strong> Stripe, Revenue Analytics
          </div>
          <div>
            <strong>Content:</strong> Markdown, Video Processing
          </div>
        </div>
      </div>

      <ProjectSection title="The Problem">
        <p className="text-lg mb-4">
          <strong>
            Traditional course creation is time-intensive and produces
            one-size-fits-all content.
          </strong>{" "}
          Educators spend months creating static courses that fail to adapt to
          individual learning styles, resulting in poor engagement and
          completion rates.
        </p>
        <ul className="space-y-2">
          <li>
            <strong>Time barriers</strong>: Creating quality courses takes 100+
            hours of manual work
          </li>
          <li>
            <strong>Static content</strong>: Traditional courses can't adapt to
            individual learning patterns
          </li>
          <li>
            <strong>Low engagement</strong>: Average online course completion
            rates hover around 15%
          </li>
          <li>
            <strong>Accessibility gaps</strong>: Content doesn't accommodate
            diverse learning needs and preferences
          </li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Solution Architecture">
        <div className="grid md:grid-cols-2 gap-8 mb-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border">
            <h4 className="font-semibold mb-3">🎯 Core Innovation</h4>
            <p>
              <strong>AI-Driven Course Generation</strong>: Advanced LLM
              integration creates personalized learning paths that adapt in
              real-time based on student progress, learning style, and
              comprehension levels.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border">
            <h4 className="font-semibold mb-3">📚 Dynamic Content Engine</h4>
            <p>
              <strong>Adaptive Learning System</strong>: Intelligent content
              recommendation engine that personalizes difficulty, pacing, and
              teaching methods based on individual student performance
              analytics.
            </p>
          </div>
        </div>

        <h4 className="text-lg font-semibold mb-4">
          Learning Flow Architecture
        </h4>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-sm font-mono mb-6">
          <pre>{`Student Input → AI Analysis → Content Generation → Interactive Lessons → Progress Tracking
     ↑                                                                         ↓
Adaptive Recommendations ←―――――――――――――――――――――――――――――――――――――――――――――― Performance Analytics`}</pre>
        </div>
      </ProjectSection>

      <ProjectSection title="Platform Features">
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-3">
              🎨 Course Creation Studio
            </h4>
            <ul className="space-y-2">
              <li>
                <strong>AI Content Generation</strong>: Automated lesson
                creation with customizable depth and complexity
              </li>
              <li>
                <strong>Interactive Elements</strong>: Built-in quizzes,
                assignments, and interactive exercises
              </li>
              <li>
                <strong>Multi-format Support</strong>: Text, video, audio, and
                interactive simulations
              </li>
              <li>
                <strong>Template Library</strong>: Pre-built course structures
                for different subjects and learning goals
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">
              🧠 Personalization Engine
            </h4>
            <ul className="space-y-2">
              <li>
                <strong>Learning Style Analysis</strong>: AI-powered assessment
                of visual, auditory, and kinesthetic preferences
              </li>
              <li>
                <strong>Adaptive Pacing</strong>: Dynamic adjustment of content
                delivery based on comprehension rates
              </li>
              <li>
                <strong>Knowledge Gap Detection</strong>: Intelligent
                identification and targeted remediation of learning gaps
              </li>
              <li>
                <strong>Progress Prediction</strong>: ML models forecast student
                success and suggest interventions
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">
              📊 Analytics & Insights
            </h4>
            <ul className="space-y-2">
              <li>
                <strong>Real-time Dashboards</strong>: Comprehensive analytics
                for educators and administrators
              </li>
              <li>
                <strong>Engagement Metrics</strong>: Detailed tracking of
                student interaction and participation
              </li>
              <li>
                <strong>Performance Analytics</strong>: Advanced reporting on
                learning outcomes and course effectiveness
              </li>
              <li>
                <strong>Predictive Insights</strong>: Early warning systems for
                at-risk students
              </li>
            </ul>
          </div>
        </div>
      </ProjectSection>

      <ProjectSection title="Business Impact & Results">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                📈 Market Validation
              </h4>
              <ul className="text-sm space-y-1 mt-2">
                <li>
                  • <strong>Market</strong>: Global education technology sector
                </li>
                <li>
                  • <strong>Target</strong>: Corporate training and higher
                  education
                </li>
                <li>
                  • <strong>Revenue Model</strong>: SaaS subscription with
                  usage-based pricing
                </li>
                <li>
                  • <strong>Competitive Edge</strong>: AI-first personalization
                  approach
                </li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 dark:text-green-200">
                🎯 User Engagement
              </h4>
              <ul className="text-sm space-y-1 mt-2">
                <li>
                  • <strong>Course Completion</strong>: Significant improvement
                  over traditional platforms
                </li>
                <li>
                  • <strong>Time to Create</strong>: Substantial reduction in
                  course development time
                </li>
                <li>
                  • <strong>Student Engagement</strong>: Positive feedback from
                  early users
                </li>
                <li>
                  • <strong>Retention</strong>: Strong user engagement and
                  return rates
                </li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200">
                🚀 Technical Excellence
              </h4>
              <ul className="text-sm space-y-1 mt-2">
                <li>
                  • <strong>Performance</strong>: Reliable uptime with CDN
                  distribution
                </li>
                <li>
                  • <strong>Scalability</strong>: Auto-scaling infrastructure
                  for concurrent users
                </li>
                <li>
                  • <strong>Security</strong>: Enterprise-grade data protection
                  and privacy measures
                </li>
                <li>
                  • <strong>Mobile</strong>: Responsive design with optimized
                  mobile experience
                </li>
              </ul>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-800 dark:text-orange-200">
                💡 Innovation
              </h4>
              <ul className="text-sm space-y-1 mt-2">
                <li>
                  • <strong>AI-Driven Approach</strong>: Novel adaptive learning
                  algorithm implementation
                </li>
                <li>
                  • <strong>Research Focus</strong>: Exploring personalized
                  learning methodologies
                </li>
                <li>
                  • <strong>Community Engagement</strong>: Active in EdTech
                  innovation discussions
                </li>
                <li>
                  • <strong>Knowledge Sharing</strong>: Contributing to
                  open-source education tools
                </li>
              </ul>
            </div>
          </div>
        </div>
      </ProjectSection>

      <ProjectSection title="Use Cases & Success Stories">
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg">
            <h4 className="text-lg font-semibold mb-3">
              🏢 Corporate Training
            </h4>
            <p className="mb-3">
              <strong>Corporate Training Implementation</strong>: Designed for
              employee technical skills training, focusing on faster
              certification completion and improved satisfaction rates.
            </p>
            <ul className="text-sm space-y-1">
              <li>• Accelerated onboarding processes</li>
              <li>• Improved compliance training completion rates</li>
              <li>
                • Custom learning paths for different roles and departments
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-lg">
            <h4 className="text-lg font-semibold mb-3">🎓 Higher Education</h4>
            <p className="mb-3">
              <strong>Academic Integration</strong>: Platform designed to
              support personalized STEM education with focus on improving course
              completion rates and accessibility.
            </p>
            <ul className="text-sm space-y-1">
              <li>• Improved course completion rates</li>
              <li>• Support for diverse learning needs</li>
              <li>
                • Enhanced accessibility for students with learning differences
              </li>
            </ul>
          </div>
        </div>
      </ProjectSection>

      <ProjectSection title="Future Roadmap">
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              Q2 2024
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              VR/AR Integration
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              Q3 2024
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Multi-language Support
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              Q4 2024
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              AI Tutor Assistant
            </div>
          </div>
        </div>
      </ProjectSection>

      <ProjectCTA
        githubUrl="https://github.com/hopeatina/brain-buffet"
        demoUrl="https://brainbuffet.co"
      />
    </ProjectLayout>
  );
}
