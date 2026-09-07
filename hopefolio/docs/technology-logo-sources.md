# Technology mark sources

Reviewed 2026-09-06. These marks identify technologies used in the portfolio; they are not the portfolio identity or a claim of vendor endorsement. All files are local, with no third-party image requests at runtime.

## Component contract

`src/components/v5/TechnologyMark.tsx` exports the default `TechnologyMark({ name, icon?, className? })`. It emits one decorative `span.technology-mark` with `data-technology`, `data-mark-kind="logo|text"`, and `aria-hidden="true"`. Logo children are one SVG or one image. The caller supplies the accessible name beside it. The full name takes precedence over a legacy `icon` key; old `next`, `node`, `postgres`, `tailwind`, and other atlas keys continue to work. Parent styles own optical sizing and hide text fallback marks while preserving the adjacent full name.

Recognized aliases include Claude Code → Claude, Framer Motion → Motion, Cloudflare Workers → Cloudflare, and OpenAI Codex → Codex. C# and SQL are language/standard names, not invented emblems. MCP Apps and React Three Fiber retain their full names because no distinct product mark was verified in the inspected primary sources. Unverified utility/provider marks (Tokio, Axum, Clap, sysinfo, launchd, Crossterm, Spring Health, Interactive Brokers) also use explicit name fallback, with no initials or borrowed logo.

## Local official assets

SVG path geometry is preserved. Transparent variants remove only favicon background rectangles; tight viewBoxes remove excess canvas, not parts of the mark. Fixed light monochrome presentation is documented below. No generated artwork is used as a vendor logo.

| Local asset | Primary source | Presentation |
| --- | --- | --- |
| `cursor.svg` | [Cursor brand page](https://cursor.com/brand), its linked [official ZIP](https://ptht05hbb1ssoooe.public.blob.vercel-storage.com/assets/brand/cursor-brand-assets.zip), `General Logos/Cube/SVG/CUBE_2D_DARK.svg` | Unmodified official 2D cube for a dark surface. |
| `opencode.svg` | [OpenCode brand](https://opencode.ai/brand), [project identity file](https://github.com/anomalyco/opencode/blob/dev/packages/identity/mark.svg) | Exact two-path mark; favicon backdrop removed, canvas fitted to mark. |
| `openclaw.svg` | [OpenClaw project mascot asset](https://github.com/openclaw/openclaw/blob/main/apps/macos/Icon.icon/Assets/molty.svg) | Unmodified official lobster mascot. |
| `codex.png` | Installed OpenAI app `/Applications/ChatGPT.app/Contents/Resources/icon-codex-dark-color.png`; bundle identifier `com.openai.codex`, signing team `2DC432GLL2`. Product identity checked against [OpenAI's Codex app announcement](https://openai.com/index/introducing-the-codex-app/) and [OpenAI brand guidance](https://openai.com/brand/). | Proportional 1024 → 128 px copy of the actual app icon, without recoloring or a substitute OpenAI knot. Source application has an embedded signature; this is not an online asset download. |
| `inngest.svg` | [Current Inngest homepage](https://www.inngest.com/), first standalone header SVG (`viewBox="0 0 29 17"`) | Exact emblem paths; `currentColor` fixed to light monochrome for external SVG use. |
| `mcp.svg` | [MCP project's favicon](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/docs/favicon.svg) | Exact white paths; black favicon rectangle removed. |
| `motion.svg` | [Motion](https://motion.dev/), [official favicon](https://motion.dev/favicon.svg) | Exact Motion glyph, fitted viewBox and backdrop removed. Motion explicitly identifies itself as the former Framer Motion; Framer's unrelated company glyph is not used. |
| `remotion.svg` | [Remotion's brand source](https://github.com/remotion-dev/remotion/blob/main/packages/brand/public/logo/remotion/logo.svg) | Unmodified official translucent blue mark. |
| `trigger-dev.svg` | Installed `@trigger.dev/companyicons@1.5.42`, `TriggerDotDevLightIcon`, maintained by [Trigger.dev](https://trigger.dev/) | Static SVG serialization of the package's official green mark. |
| `fal.png` | [Fal](https://fal.ai/), [official favicon](https://fal.ai/favicon.png) | Unmodified 32 px favicon. |
| `react-flow.svg` | [React Flow](https://reactflow.dev/), [official icon](https://reactflow.dev/icon.svg) | Unmodified vendor SVG, including its original light backdrop. |
| `convex.png` | [Convex](https://www.convex.dev/), [official favicon](https://www.convex.dev/favicon.ico) | Largest 48 px ICO frame losslessly exported as PNG. |
| `playwright.svg` | [Microsoft Playwright's source asset](https://github.com/microsoft/playwright/blob/main/packages/dashboard/public/playwright-logo.svg) | Unmodified project SVG. |
| `e2b.png` | [E2B homepage](https://e2b.dev/) dark-mode favicon link to its [official Webflow CDN](https://cdn.prod.website-files.com/6717bb6618f6a40d53ac2929/6a2a7d1f5c3c269c5ca10e65_Favicon_32x32_Dark.png) | Unmodified 32 px favicon. |
| `django-rest-framework.png` | [Django REST Framework's official logo](https://www.django-rest-framework.org/img/logo.png) | Unmodified red colon emblem; distinct from Django's mark. |
| `lightweight-charts.svg` | [TradingView Lightweight Charts source](https://github.com/tradingview/lightweight-charts/blob/master/website/static/img/navbar-logo-mobile-dark.svg) | Unmodified official library mark; not the generic TradingView corporate icon. |

## Installed icon library

Other marks are named imports from the already installed `react-icons@5.4.0`. Its Simple Icons collection supplies recognizable monochrome brand geometry; no custom substitute paths were drawn. The table records the matching primary brand or project source, cross-referenced through [Simple Icons' source index](https://github.com/simple-icons/simple-icons/blob/develop/data/simple-icons.json). A source pointer is not a claim that the installed package automatically tracks future rebrands. Historical NextUI usage retains that project's period identity rather than silently renaming its stack to HeroUI. Java uses Font Awesome's Java coffee mark, not the distinct OpenJDK mascot.

| Technology | Installed export | Primary reference |
| --- | --- | --- |
| TypeScript | `SiTypescript` | [Project source / brand reference](https://www.typescriptlang.org/branding) |
| JavaScript | `SiJavascript` | [Project source / brand reference](https://github.com/voodootikigod/logo.js/blob/1544bdeed6d618a6cfe4f0650d04ab8d9cfa76d9/js.svg) |
| Python | `SiPython` | [Project source / brand reference](https://www.python.org/community/logos/) |
| Rust | `SiRust` | [Project source / brand reference](https://www.rust-lang.org) |
| PostgreSQL | `SiPostgresql` | [Project source / brand reference](https://wiki.postgresql.org/wiki/Logo) |
| SQLite | `SiSqlite` | [Project source / brand reference](https://github.com/sqlite/sqlite/blob/43e862723ec680542ca6f608f9963c0993dd7324/art/sqlite370.eps) |
| React | `SiReact` | [Project source / brand reference](https://github.com/facebook/create-react-app/blob/282c03f9525fdf8061ffa1ec50dce89296d916bd/test/fixtures/relative-paths/src/logo.svg) |
| Next.js | `SiNextdotjs` | [Project source / brand reference](https://vercel.com/design/brands#next-js) |
| Node.js | `SiNodedotjs` | [Project source / brand reference](https://nodejs.org/en/about/branding) |
| FastAPI | `SiFastapi` | [Project source / brand reference](https://github.com/tiangolo/fastapi/blob/ffb4f77a11f83132b521ba0aac6c95792c19e797/docs/en/docs/img/icon-white.svg) |
| Flask | `SiFlask` | [Project source / brand reference](https://github.com/pallets/flask/blob/85c5d93cbd049c4bd0679c36fd1ddcae8c37b642/docs/_static/flask-icon.svg) |
| Django | `SiDjango` | [Project source / brand reference](https://www.djangoproject.com/community/logos/) |
| PyTorch | `SiPytorch` | [Project source / brand reference](https://github.com/pytorch/pytorch.github.io/blob/8f083bd12192ca12d5e1c1f3d236f4831d823d8f/assets/images/logo.svg) |
| TensorFlow | `SiTensorflow` | [Project source / brand reference](https://www.tensorflow.org) |
| scikit-learn | `SiScikitlearn` | [Project source / brand reference](https://github.com/scikit-learn/scikit-learn/blob/c5ef2e985c13119001aa697e446ebb3dbcb326e5/doc/logos/scikit-learn-logo.svg) |
| OpenAI | `SiOpenai` | [Project source / brand reference](https://openai.com/brand/) |
| Claude | `SiClaude` | [Project source / brand reference](https://claude.ai) |
| Anthropic | `SiAnthropic` | [Project source / brand reference](https://www.anthropic.com) |
| Supabase | `SiSupabase` | [Project source / brand reference](https://github.com/supabase/supabase/blob/4031a7549f5d46da7bc79c01d56be4177dc7c114/packages/common/assets/images/supabase-logo-wordmark--light.svg) |
| Redis | `SiRedis` | [Project source / brand reference](https://redis.io/brand-guidelines) |
| AWS | `SiAmazonwebservices` | [Project source / brand reference](https://aws.amazon.com/trademark-guidelines/) |
| Amazon S3 | `SiAmazons3` | [Project source / brand reference](https://aws.amazon.com/architecture/icons/) |
| Docker | `SiDocker` | [Project source / brand reference](https://www.docker.com/company/newsroom/media-resources) |
| Terraform | `SiTerraform` | [Project source / brand reference](https://www.hashicorp.com/brand) |
| GitHub | `SiGithub` | [Project source / brand reference](https://github.com/logos) |
| GitHub Actions | `SiGithubactions` | [Project source / brand reference](https://github.com/features/actions) |
| Vercel | `SiVercel` | [Project source / brand reference](https://vercel.com/geist/brands) |
| Blender | `SiBlender` | [Project source / brand reference](https://www.blender.org/about/logo) |
| Three.js | `SiThreedotjs` | [Project source / brand reference](https://github.com/mrdoob/three.js/blob/a567b810cfcb7f6a03e4faea99f03c53081da477/files/icon.svg) |
| WebGPU | `SiWebgpu` | [Project source / brand reference](https://www.w3.org/2023/02/webgpu-logos.html) |
| Figma | `SiFigma` | [Project source / brand reference](https://www.figma.com/using-the-figma-brand/) |
| Tailwind CSS | `SiTailwindcss` | [Project source / brand reference](https://tailwindcss.com/brand) |
| Stripe | `SiStripe` | [Project source / brand reference](https://stripe.com/newsroom/information) |
| pandas | `SiPandas` | [Project source / brand reference](https://pandas.pydata.org/about/citing.html) |
| NumPy | `SiNumpy` | [Project source / brand reference](https://numpy.org/press-kit/) |
| Unity | `SiUnity` | [Project source / brand reference](https://brand.unity.com) |
| Apache Spark | `SiApachespark` | [Project source / brand reference](https://apache.org/logos) |
| Scala | `SiScala` | [Project source / brand reference](https://www.scala-lang.org) |
| Snowflake | `SiSnowflake` | [Project source / brand reference](https://www.snowflake.com/brand-guidelines/) |
| Apache Kafka | `SiApachekafka` | [Project source / brand reference](https://apache.org/logos) |
| Apache Airflow | `SiApacheairflow` | [Project source / brand reference](https://apache.org/logos) |
| Celery | `SiCelery` | [Project source / brand reference](https://github.com/celery/celery/blob/4d77ddddb10797011dc10dd2e4e1e7a7467b8431/docs/images/favicon.ico) |
| d3js | `SiD3Dotjs` | [Project source / brand reference](https://react-icons.github.io/react-icons/icons/si/) |
| Java | `FaJava` | [Project source / brand reference](https://www.oracle.com/legal/trademarks.html) |
| Modal | `SiModal` | [Project source / brand reference](https://modal.com) |
| Hetzner | `SiHetzner` | [Project source / brand reference](https://www.hetzner.com) |
| Cloudflare | `SiCloudflare` | [Project source / brand reference](https://www.cloudflare.com/logo/) |
| Datadog | `SiDatadog` | [Project source / brand reference](https://www.datadoghq.com/about/resources) |
| Sentry | `SiSentry` | [Project source / brand reference](https://sentry.io/branding/) |
| Zod | `SiZod` | [Project source / brand reference](https://github.com/colinhacks/zod/blob/ff89187172ac6aa4a6264592980d1628ee785242/logo/Logo%20White.ai) |
| Homebrew | `SiHomebrew` | [Project source / brand reference](https://github.com/Homebrew/brew.sh/blob/2e576aaca83e62dda41a188597bb4bd20e75e385/assets/img/homebrew.svg) |
| NextUI | `SiNextui` | [Project source / brand reference](https://github.com/heroui-inc/heroui/tree/v2.6.11) |
| FFmpeg | `SiFfmpeg` | [Project source / brand reference](https://commons.wikimedia.org/wiki/File:FFmpeg_Logo_new.svg) |
| Vite | `SiVite` | [Project source / brand reference](https://github.com/voidzero-dev/community-design-resources/blob/55902097229cf01cf2a4ceb376f992f5cf306756/brand-assets/vite/vite-icon-color-bracketless.svg) |
| Axios | `SiAxios` | [Project source / brand reference](https://github.com/axios/axios-docs/blob/ba35d67160f94419c1b0292831cd1a4b378adb42/assets/logo.svg) |

## Attribution and maintenance

React Icons is MIT licensed; Simple Icons artwork is distributed under CC0, with trademarks remaining with their owners. Font Awesome Free brand icons are CC BY 4.0; Java's logo and name remain Oracle marks. Trigger.dev companyicons is MIT licensed. Library licenses do not replace individual trademark guidance. These are descriptive, adjacent-name uses, with no sponsorship claim.

**WebGPU logo attribution:** W3C, [WebGPU Logos](https://www.w3.org/2023/02/webgpu-logos.html), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The installed monochrome vector is used as a technology identifier; it is not a W3C conformance badge.

Validation: every referenced local file exists; each local SVG parses as XML and has no executable scripts or external references. A 72-name render sheet was produced for optical inspection; root task separately checks the live page layouts and mobile behavior. Scoped ESLint and full TypeScript (`npx tsc --noEmit --pretty false`) passed after the final asset mapping. The optical sheet covered 72 current unique names; 61 use actual marks and 11 retain explicit text fallback.
