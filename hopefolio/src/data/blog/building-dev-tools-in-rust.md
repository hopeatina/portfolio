---
title: "Building a Homebrew-Installable Dev Tool in Rust: The PerfPulse Story"
date: "2025-01-10"
excerpt: "Why Rust for CLI tools, cross-platform M1/Intel builds, Homebrew tap distribution, and integrating Claude API for AI-powered recommendations."
category: "Developer Tooling"
readTime: "10 min read"
tags:
  - Rust
  - CLI
  - Homebrew
relatedPosts:
  - building-multi-agent-orchestration
  - mcp-in-production
---

PerfPulse started as a weekend experiment: what if macOS Activity Monitor was actually useful? Not just a wall of numbers, but a tool that tells you *why* your system is slow and *what to do about it*. Six months later, it's a Rust CLI with three interface modes, Claude API integration, and a Homebrew tap.

This post covers the technical decisions behind PerfPulse, from choosing Rust to distributing via Homebrew.

## Why Rust for CLI Tools

I considered three languages: Go, TypeScript (via Bun), and Rust. Here's why Rust won:

**Binary size matters.** PerfPulse ships as a 3.3-4.3 MiB static binary. No runtime, no dependencies, no "please install Node 18 first." Users run `brew install hopeatina/perf-pulse/perf-pulse` and they're done.

**Performance is the product.** PerfPulse is a performance monitoring tool. If the monitor itself consumes significant CPU or memory, it defeats the purpose. Rust's zero-cost abstractions mean PerfPulse uses negligible resources while continuously sampling system metrics.

**Cross-platform compilation.** Rust's target system made building for both Apple Silicon (M1/M2/M3) and Intel straightforward. One codebase, two binaries, no platform-specific code.

**Error handling that compiles.** For a system tool that reads `/proc` equivalents and makes HTTP calls to Claude's API, Rust's `Result` type catches entire categories of bugs at compile time.

## Architecture: Three Interfaces, One Core

PerfPulse has a layered architecture:

```
┌─────────────────────────────────────┐
│         Interface Layer              │
│  ┌─────┐  ┌──────────┐  ┌───────┐  │
│  │ CLI │  │ Web (Axum)│  │  TUI  │  │
│  └──┬──┘  └────┬─────┘  └───┬───┘  │
│     └──────────┼────────────┘       │
│           ┌────┴────┐               │
│           │  Core   │               │
│           │ Engine  │               │
│           └────┬────┘               │
│     ┌──────────┼──────────┐         │
│  ┌──┴───┐  ┌──┴───┐  ┌──┴──────┐  │
│  │sysinfo│  │Claude│  │Scoring  │  │
│  │ crate │  │ API  │  │ Engine  │  │
│  └──────┘  └──────┘  └─────────┘  │
└─────────────────────────────────────┘
```

### The Core Engine

The core engine uses the `sysinfo` crate to collect system metrics: CPU usage per core, memory pressure, disk I/O, network traffic, and per-process resource consumption. It runs on a configurable sampling interval (default: 2 seconds).

```rust
pub struct SystemSnapshot {
    pub cpu_usage: Vec<f32>,       // Per-core usage
    pub memory: MemoryInfo,         // Used/total/available
    pub top_processes: Vec<ProcessInfo>,  // Sorted by CPU
    pub disk_io: DiskIOInfo,
    pub network: NetworkInfo,
    pub timestamp: SystemTime,
}
```

### CLI Mode

The simplest interface. Run `perf-pulse` and get a formatted snapshot of your system's health:

```
$ perf-pulse
╭─ PerfPulse v1.5.4 ─────────────────────────╮
│ CPU: 34% ████████░░░░░░░░  (8 cores)       │
│ MEM: 12.4/16.0 GB (78%) ████████████████░░ │
│ Score: 72/100 (Good)                         │
│                                              │
│ Top Processes:                               │
│  1. Chrome Helper (23.1% CPU, 2.1GB RAM)    │
│  2. node (8.4% CPU, 890MB RAM)              │
│  3. Slack Helper (4.2% CPU, 650MB RAM)      │
╰──────────────────────────────────────────────╯
```

### Web Dashboard (Axum)

Run `perf-pulse --web` and PerfPulse starts an Axum web server on `localhost:3847`. The dashboard shows real-time charts, historical trends, and AI recommendations.

Axum was the right choice for the web server. It's async, fast, and integrates naturally with Rust's type system. The dashboard is server-rendered HTML with minimal JavaScript — no React, no build step, just templates and a few lines of vanilla JS for chart updates via Server-Sent Events.

```rust
async fn dashboard(State(state): State<AppState>) -> Html<String> {
    let snapshot = state.engine.latest_snapshot().await;
    let score = state.scorer.score(&snapshot);
    let html = render_dashboard(&snapshot, &score);
    Html(html)
}
```

### TUI Mode

Run `perf-pulse --tui` for a full terminal UI built with `crossterm`. This gives you a real-time dashboard in your terminal with live-updating charts, process lists, and AI recommendations.

The TUI was the most fun to build. `crossterm` provides the low-level terminal manipulation primitives, and building the UI components directly on top of it gave full control over rendering and layout.

## Claude API Integration

The AI recommendation system is PerfPulse's differentiator. When you run `perf-pulse --analyze`, it:

1. Collects a system snapshot
2. Identifies anomalies (high CPU, memory pressure, unusual processes)
3. Sends a structured prompt to Claude's API
4. Returns actionable recommendations

```rust
async fn get_ai_recommendation(snapshot: &SystemSnapshot) -> Result<String> {
    let prompt = format!(
        "System: {} cores at {}% avg, {:.1}GB/{:.1}GB RAM. \
         Top process: {} at {}% CPU. \
         Provide 2-3 specific, actionable recommendations.",
        snapshot.cpu_usage.len(),
        snapshot.avg_cpu(),
        snapshot.memory.used_gb(),
        snapshot.memory.total_gb(),
        snapshot.top_processes[0].name,
        snapshot.top_processes[0].cpu_percent,
    );

    let response = claude_client.message(&prompt).await?;
    Ok(response.content)
}
```

The key insight: send *structured data*, not raw metrics. Claude gives much better recommendations when you pre-process the data into a meaningful summary rather than dumping raw numbers.

## Meeting Mode

One feature users love: Meeting Mode. Run `perf-pulse --meeting` before a video call, and PerfPulse:

1. Identifies resource-heavy background processes
2. Suggests which to pause/close
3. Monitors during the meeting for resource spikes
4. Alerts if your system is about to throttle

This came from personal frustration with Zoom/Meet calls where my laptop would thermal throttle because Chrome had 47 tabs open.

## Homebrew Distribution

Getting PerfPulse into Homebrew was a priority from day one. Developers install tools with `brew install`, and anything that requires manual binary downloads or `curl | sh` has higher adoption friction.

### Setting Up the Tap

A Homebrew tap is just a GitHub repo with a specific naming convention (`homebrew-perf-pulse`) containing Ruby formula files:

```ruby
class PerfPulse < Formula
  desc "AI-powered macOS system monitor and performance tool"
  homepage "https://github.com/hopeatina/perf-pulse"
  version "1.5.4"

  if Hardware::CPU.arm?
    url "https://github.com/hopeatina/perf-pulse/releases/download/v1.5.4/perf-pulse-aarch64-apple-darwin.tar.gz"
    sha256 "..."
  else
    url "https://github.com/hopeatina/perf-pulse/releases/download/v1.5.4/perf-pulse-x86_64-apple-darwin.tar.gz"
    sha256 "..."
  end

  def install
    bin.install "perf-pulse"
  end
end
```

### CI/CD Pipeline

Every release triggers a GitHub Actions workflow that:

1. Builds for `aarch64-apple-darwin` (M1/M2/M3)
2. Builds for `x86_64-apple-darwin` (Intel)
3. Creates a GitHub release with both binaries
4. Updates the Homebrew formula with new SHA256 hashes

The cross-compilation setup uses Rust's target system:

```yaml
- name: Build (Apple Silicon)
  run: cargo build --release --target aarch64-apple-darwin

- name: Build (Intel)
  run: cargo build --release --target x86_64-apple-darwin
```

## Security Considerations

A system monitoring tool has elevated access concerns. PerfPulse handles this carefully:

- **XSS prevention** in the web dashboard — all user-facing output is HTML-escaped
- **CORS configuration** — the Axum server only accepts connections from localhost
- **Input sanitization** — process names and paths are sanitized before display
- **No root required** — PerfPulse uses only unprivileged system APIs
- **No data exfiltration** — system data is only sent to Claude's API when the user explicitly requests AI analysis

## Performance Targets

PerfPulse monitors its own resource usage and targets a lean footprint:

- **Binary size**: 3.3-4.3 MiB (verified across Apple Silicon and Intel builds)
- **Resource usage**: The sampling interval automatically adjusts if PerfPulse detects it's consuming too many resources, keeping overhead minimal during monitoring.

## What I Learned

**1. Rust's learning curve is worth it for CLI tools.** The first week was painful. After that, the compiler catches so many bugs that you ship with confidence.

**2. Ship the simplest interface first.** I built CLI mode in a weekend, shipped it, got feedback, then built the web dashboard and TUI. Each interface taught me what users actually wanted.

**3. Homebrew distribution removes friction.** Developers have strong opinions about installation methods, and `brew install` is the path of least resistance on macOS.

**4. AI integration should be optional.** PerfPulse works perfectly without the Claude API key. The AI recommendations are a bonus, not a dependency.

**5. Performance tools must be performant.** This sounds obvious but it's easy to violate. One careless allocation in the hot path and your monitoring tool becomes the problem.

## Try It

```bash
brew tap hopeatina/perf-pulse
brew install perf-pulse
perf-pulse --web
```

Source code is on [GitHub](https://github.com/hopeatina/perf-pulse). Issues and PRs welcome.
