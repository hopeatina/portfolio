import React from "react";
import ProjectLayout from "@/components/projects/ProjectLayout";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectSection from "@/components/projects/ProjectSection";
import ProjectCTA from "@/components/projects/ProjectCTA";
import TechStack from "@/components/projects/TechStack";
import FeatureGrid from "@/components/projects/FeatureGrid";
import ProjectCard from "@/components/projects/ProjectCard";
import StatsDisplay from "@/components/projects/StatsDisplay";
import MermaidDiagram from "@/components/projects/MermaidDiagram";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

export default function BodyFX() {
  const { themeProps } = useTheme();

  const techStack = [
    {
      category: "Core ML",
      technologies: "SAM2 (Segment Anything Model 2), PyTorch",
    },
    { category: "Video Processing", technologies: "OpenCV, NumPy" },
    { category: "Languages", technologies: "Python 3.8+, ExtendScript (JSX)" },
    { category: "Integration", technologies: "Adobe After Effects API" },
    {
      category: "Performance",
      technologies: "CUDA GPU Acceleration, Batch Processing",
    },
    { category: "Distribution", technologies: "CLI Tools, pip installable" },
  ];

  const mainFeatures = [
    {
      title: "AI-Powered Video Segmentation",
      description:
        "Leverage Meta's SAM2 model for automatic subject detection and tracking without manual rotoscoping setup",
      items: [
        "Automatic subject detection without manual rotoscoping",
        "Frame-by-frame tracking with temporal consistency",
        "Support for multiple model sizes (small, medium, large)",
        "Custom prompt support for precise targeting",
      ],
    },
    {
      title: "After Effects Integration",
      description:
        "Seamless workflow integration with Adobe After Effects for professional VFX work",
      items: [
        "Direct import as animatable shape layers",
        "Preserves frame-accurate timing and motion",
        "Customizable stroke and fill styles",
        "Automatic composition setup with proper dimensions",
      ],
    },
    {
      title: "OBS Studio Plugin (Planned)",
      description:
        "Early-stage exploration of real-time background removal for live streaming — currently a stub with basic error handling",
      items: [
        "Initial C++ error handler scaffolding for OBS plugin architecture",
        "Planned: SAM2-based real-time segmentation for streaming",
        "Planned: Background blur and replacement options",
        "Note: OBS integration is not yet functional — After Effects integration is the primary focus",
      ],
    },
    {
      title: "Performance Optimization",
      description: "Built for production with scalability and speed in mind",
      items: [
        "GPU acceleration with CUDA support",
        "Intelligent batch processing for memory efficiency",
        "Downscaling options for faster processing",
        "Multi-subject tracking in a single pass",
      ],
    },
  ];

  const pipelineDiagram = `
    flowchart LR
      A[Video Input] --> B[Frame Extraction]
      B --> C[SAM2 Model]
      C --> D[Segmentation Masks]
      D --> E[Tracking & Refinement]
      E --> F[JSON Export]
      F --> G[After Effects Script]
      G --> H[Animated Shape Layers]
      
      style C fill:#8B5CF6,stroke:#7C3AED,color:#fff
      style E fill:#3B82F6,stroke:#2563EB,color:#fff
      style H fill:#10B981,stroke:#059669,color:#fff
  `;

  const technicalFeatures = [
    {
      title: "Advanced Segmentation",
      description: "Transformer-based segmentation model for precise subject isolation",
    },
    {
      title: "Temporal Consistency",
      description:
        "Smart tracking maintains segmentation quality across frames",
    },
    {
      title: "Custom Prompts",
      description: "Point or bounding box prompts for targeted segmentation",
    },
    {
      title: "Batch Processing",
      description: "Automatic memory management for long videos",
    },
    {
      title: "Preview Generation",
      description: "Quick key frame previews before full processing",
    },
    {
      title: "Easy Installation",
      description: "pip installable with automatic dependency management",
    },
  ];

  const keyMetrics = [
    { value: "3", label: "Model Variants", description: "Small to Large" },
    { value: "7", label: "ExtendScript Files", description: "AE integration" },
    { value: "SAM2", label: "AI Backbone", description: "Meta's segmentation model" },
    { value: "AE", label: "Integration", description: "After Effects shape layers" },
  ];

  return (
    <ProjectLayout
      title="BodyFX"
      description="AI-powered video segmentation pipeline using SAM2 for automated rotoscoping and visual effects in Adobe After Effects"
    >
      <ProjectHero
        title="BodyFX"
        description="AI-powered video segmentation using Meta's SAM2 for automated rotoscoping in After Effects. BodyFX automatically detects and tracks subjects frame-by-frame, exporting segmentation data as animatable shape layers via 7 ExtendScript (.jsx) files."
        tags={[
          "Computer Vision",
          "Video Effects",
          "Python",
          "SAM2",
          "After Effects",
          "ExtendScript",
        ]}
        image="/images/projects/bodyfx.svg"
      />

      <TechStack items={techStack} />

      <ProjectSection title="Project Overview">
        <p className="text-lg mb-6">
          BodyFX bridges the gap between recent AI research and practical
          video production needs. By leveraging Meta's Segment Anything Model 2
          (SAM2), it automates one of the most time-consuming tasks in visual
          effects: rotoscoping and subject isolation.
        </p>

        <ProjectCard variant="default" className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-primary">
            The Problem It Solves
          </h3>
          <p>
            Manual rotoscoping in video production is extremely time-intensive,
            often requiring hours of frame-by-frame work. BodyFX automates this
            process using SAM2-based AI segmentation, significantly reducing the
            time required while maintaining professional quality.
          </p>
        </ProjectCard>

        <div className="grid md:grid-cols-2 gap-6">
          <ProjectCard variant="secondary">
            <h4 className="text-lg font-semibold mb-3">Use Cases</h4>
            <ul className="space-y-2">
              <li>• Visual effects and compositing</li>
              <li>• Motion graphics integration</li>
              <li>• Subject isolation for color grading</li>
              <li>• Background replacement in post-production</li>
              <li>• Virtual production workflows</li>
            </ul>
          </ProjectCard>

          <ProjectCard variant="accent">
            <h4 className="text-lg font-semibold mb-3">Key Benefits</h4>
            <ul className="space-y-2">
              <li>• Significantly faster than manual rotoscoping</li>
              <li>• Frame-accurate tracking via SAM2</li>
              <li>• No training data required</li>
              <li>• Works with any video content</li>
              <li>• Professional After Effects integration (7 .jsx files)</li>
            </ul>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectSection title="Core Features">
        <FeatureGrid features={mainFeatures} columns={1} />
      </ProjectSection>

      <ProjectSection title="Processing Pipeline">
        <p className="text-lg mb-8">
          BodyFX implements a sophisticated pipeline that handles everything
          from video ingestion to After Effects integration, all optimized for
          production workflows.
        </p>

        <MermaidDiagram
          title="BodyFX Processing Pipeline"
          diagram={pipelineDiagram}
          description="End-to-end workflow from video input to animated shape layers in After Effects"
        />

        <div className="mt-8 space-y-6">
          <ProjectCard variant="default">
            <h3 className="text-xl font-semibold mb-4 text-primary">
              Command Line Interface
            </h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
              <p className="text-green-400"># Basic usage</p>
              <p>$ bodyfx-process video.mp4 models/sam_vit_h.pth</p>
              <br />
              <p className="text-green-400">
                # Multi-subject with GPU acceleration
              </p>
              <p>$ bodyfx-process video.mp4 models/sam_vit_h.pth \</p>
              <p> --multi-subject --device cuda --batch-size 4</p>
            </div>
          </ProjectCard>

          <ProjectCard variant="secondary">
            <h3 className="text-xl font-semibold mb-4 text-primary">
              After Effects Integration
            </h3>
            <p className="mb-4">
              The custom ExtendScript (JSX) integration provides a native After
              Effects experience:
            </p>
            <ul className="space-y-2">
              <li>• One-click import of segmentation data</li>
              <li>• Automatic shape layer creation with keyframes</li>
              <li>• Customizable visual styles (stroke/fill)</li>
              <li>• Maintains original video timing and dimensions</li>
            </ul>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectSection title="OBS Studio Plugin (Early Stage)">
        <p className="text-lg mb-8">
          An OBS plugin for real-time background removal is planned but currently
          in early exploration. Only a basic C++ error handler file exists as
          scaffolding. The primary focus of BodyFX is the After Effects
          segmentation pipeline described above.
        </p>

        <ProjectCard variant="secondary">
          <h3 className="text-xl font-semibold mb-4 text-primary">
            Planned OBS Features
          </h3>
          <ul className="space-y-2">
            <li>• SAM2-based real-time segmentation for live streaming</li>
            <li>• Background blur, replacement, and removal options</li>
            <li>• GPU-accelerated processing for streaming performance</li>
          </ul>
          <p className="mt-4 text-sm italic">
            Note: The OBS plugin is not yet functional. This section describes
            planned future work.
          </p>
        </ProjectCard>
      </ProjectSection>

      <ProjectSection title="Technical Innovation">
        <p className="text-lg mb-8">
          BodyFX applies recent computer vision research to practical production
          workflows, making GPU-accelerated AI segmentation accessible to
          creative professionals.
        </p>

        <FeatureGrid features={technicalFeatures} columns={3} />

        <ProjectCard variant="highlight" className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-primary">
            Performance Optimization
          </h3>
          <p className="mb-4">
            The project implements several optimization strategies to handle
            production workloads:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-2 h-2 rounded-full mt-2 bg-primary" />
              <span>
                <strong>Automatic Batch Size Detection:</strong> Dynamically
                adjusts processing based on available GPU memory to prevent
                crashes and maximize throughput.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-2 h-2 rounded-full mt-2 bg-primary" />
              <span>
                <strong>Resolution Scaling:</strong> Process at lower
                resolutions for draft work, then full resolution for final
                output.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-2 h-2 rounded-full mt-2 bg-primary" />
              <span>
                <strong>Model Selection:</strong> Choose between three model
                sizes based on quality requirements and processing speed needs.
              </span>
            </li>
          </ul>
        </ProjectCard>
      </ProjectSection>

      <ProjectSection title="Impact & Results">
        <StatsDisplay stats={keyMetrics} className="mb-8" />

        <ProjectCard variant="default" className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-primary">
            Real-World Applications
          </h3>
          <p className="mb-4">
            BodyFX has been designed with production pipelines in mind, offering
            practical solutions for common VFX challenges:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div>
              <h4 className="font-semibold mb-2">Film & TV Production</h4>
              <p className="text-sm">
                Quick rough cuts for editorial, clean plates for VFX
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Live Streaming</h4>
              <p className="text-sm">
                Professional streams without green screens, virtual backgrounds
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Content Creation</h4>
              <p className="text-sm">
                YouTube creators, social media effects, dynamic backgrounds
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Remote Work</h4>
              <p className="text-sm">
                Professional video calls, virtual presentations, online teaching
              </p>
            </div>
          </div>
        </ProjectCard>
      </ProjectSection>

      <ProjectSection title="Future Development">
        <div className="grid md:grid-cols-2 gap-6">
          <ProjectCard variant="default">
            <h3 className="text-lg font-semibold mb-3">Planned Features</h3>
            <ul className="space-y-2">
              <li>• DaVinci Resolve integration</li>
              <li>• Premiere Pro plugin</li>
              <li>• Web-based preview interface</li>
              <li>• Custom model fine-tuning tools</li>
              <li>• Mobile app for quick previews</li>
              <li>• Cloud processing API</li>
            </ul>
          </ProjectCard>

          <ProjectCard variant="accent">
            <h3 className="text-lg font-semibold mb-3">Research Directions</h3>
            <p>
              Exploring integration with other AI models for enhanced
              capabilities like 3D depth estimation, motion prediction, and
              style-aware segmentation.
            </p>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectCTA githubUrl="https://github.com/hopeatina/bodyfx" />
    </ProjectLayout>
  );
}
