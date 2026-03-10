import React from "react";
import ProjectLayout from "@/components/projects/ProjectLayout";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectSection from "@/components/projects/ProjectSection";
import ProjectCTA from "@/components/projects/ProjectCTA";
import TechStack from "@/components/projects/TechStack";
import FeatureGrid from "@/components/projects/FeatureGrid";
import ProjectCard from "@/components/projects/ProjectCard";
import MermaidDiagram from "@/components/projects/MermaidDiagram";
import StatsDisplay from "@/components/projects/StatsDisplay";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

export default function Meridian() {
  const { themeProps } = useTheme();

  const techStack = [
    { category: "Real-time", technologies: "Convex, WebSocket" },
    {
      category: "Database",
      technologies: "TimescaleDB, time-series data",
    },
    {
      category: "Trading",
      technologies: "IBKR integration, market data",
    },
    {
      category: "Analytics",
      technologies: "Signal processing, approval workflows",
    },
    {
      category: "Frontend",
      technologies: "Next.js, React, TailwindCSS",
    },
  ];

  const architectureDiagram = `
    flowchart TB
      subgraph "Data Ingestion"
        A[Market Data Feeds] --> D[Signal Processing]
        B[Alternative Data] --> D
        C[IBKR Market Data] --> D
      end

      subgraph "Processing Engine"
        D --> E[Signal Generation]
        E --> F[Approval Workflow]
        F --> G{Approved?}
      end

      subgraph "Execution & Storage"
        G -->|Yes| H[Trade Execution]
        G -->|No| I[Archive]
        H --> J[IBKR API]
        H --> K[TimescaleDB]
      end

      subgraph "Real-Time Layer"
        L[Convex] --> M[WebSocket Push]
        M --> N[Dashboard]
        K --> L
      end

      style D fill:#8B5CF6,stroke:#7C3AED,color:#fff
      style F fill:#3B82F6,stroke:#2563EB,color:#fff
      style L fill:#10B981,stroke:#059669,color:#fff
  `;

  const features = [
    {
      title: "Multi-Source Data Ingestion",
      description:
        "Aggregate trading signals from multiple data sources into a unified processing pipeline",
      items: [
        "Real-time market data feeds via IBKR TWS API",
        "Alternative data source integration for signal diversity",
        "Normalized data pipeline with schema validation",
        "Historical data backfill from TimescaleDB for backtesting",
      ],
    },
    {
      title: "Approval Workflows",
      description:
        "Human-in-the-loop approval system ensuring every trade signal is reviewed before execution",
      items: [
        "Multi-stage approval pipeline with configurable reviewers",
        "Signal confidence scoring to prioritize review queue",
        "Time-sensitive expiration for signals with market relevance windows",
        "Audit trail of all approval decisions with reasoning capture",
      ],
    },
    {
      title: "Real-Time Analytics",
      description:
        "Live dashboard powered by Convex and WebSocket for instant visibility into signal performance",
      items: [
        "Convex reactive queries for zero-latency dashboard updates",
        "WebSocket push for real-time P&L and position tracking",
        "TimescaleDB continuous aggregates for historical analytics",
        "Customizable chart views with TailwindCSS-styled components",
      ],
    },
    {
      title: "IBKR Integration",
      description:
        "Deep integration with Interactive Brokers for market data consumption and trade execution",
      items: [
        "TWS API connection for real-time market data streaming",
        "Order management with support for multiple order types",
        "Position tracking and portfolio synchronization",
        "Account data monitoring for risk management",
      ],
    },
  ];

  const stats = [
    {
      value: "Real-time",
      label: "Signals",
      description: "WebSocket-driven updates",
    },
    {
      value: "Multi-source",
      label: "Data Ingestion",
      description: "Diverse signal origins",
    },
    {
      value: "Approval",
      label: "Workflows",
      description: "Human-in-the-loop",
    },
    {
      value: "IBKR",
      label: "Integrated",
      description: "Trade execution ready",
    },
  ];

  return (
    <ProjectLayout
      title="Meridian"
      description="Premium trading signal platform with Convex, TimescaleDB, and IBKR integration"
    >
      <ProjectHero
        title="Meridian"
        description="A premium trading signal platform combining Convex for real-time reactivity, TimescaleDB for time-series analytics, and Interactive Brokers integration for trade execution. Meridian features multi-source data ingestion, human-in-the-loop approval workflows, and a live dashboard for monitoring signal performance."
        tags={[
          "Trading Platform",
          "Real-Time Data",
          "Convex",
          "TimescaleDB",
          "IBKR",
        ]}
        image="/images/projects/meridian.svg"
      />

      <TechStack items={techStack} />

      <ProjectSection title="System Architecture">
        <p className="text-lg mb-6">
          Meridian's architecture flows from multi-source data ingestion
          through signal processing and approval workflows to trade
          execution via IBKR, with Convex providing real-time reactivity
          for the analytics dashboard.
        </p>

        <MermaidDiagram
          title="Trading Signal Pipeline"
          diagram={architectureDiagram}
          description="Market data from multiple sources flows through signal processing and a human-in-the-loop approval workflow before trade execution via IBKR. TimescaleDB stores time-series data while Convex pushes real-time updates to the dashboard via WebSocket."
        />

        <ProjectCard variant="secondary" className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-primary">
            Why This Stack?
          </h3>
          <p>
            Convex provides real-time reactivity without manual WebSocket
            management, making dashboard updates instant. TimescaleDB
            handles time-series data with continuous aggregates for
            historical analytics. IBKR's TWS API offers institutional-grade
            market data and execution capabilities. Together, they form a
            platform that is both responsive and analytically powerful.
          </p>
        </ProjectCard>
      </ProjectSection>

      <ProjectSection title="Core Features">
        <FeatureGrid features={features} columns={1} />
      </ProjectSection>

      <ProjectSection title="Platform Metrics">
        <StatsDisplay stats={stats} className="mb-8" />

        <div className="grid md:grid-cols-2 gap-6">
          <ProjectCard variant="accent">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              Human-in-the-Loop Design
            </h3>
            <p>
              Meridian's approval workflow ensures no trade executes without
              human review. Signals are scored by confidence, queued for
              review with market-relevant expiration windows, and logged
              with full audit trails. This design balances automation speed
              with the judgment that algorithmic systems alone cannot
              provide.
            </p>
          </ProjectCard>

          <ProjectCard variant="highlight">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              Time-Series Analytics
            </h3>
            <p>
              TimescaleDB's hypertables and continuous aggregates enable
              efficient querying across millions of time-series data points.
              Combined with Convex's reactive subscriptions, the dashboard
              delivers both historical depth and real-time responsiveness
              for informed trading decisions.
            </p>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectCTA githubUrl="https://github.com/hopeatina" />
    </ProjectLayout>
  );
}
