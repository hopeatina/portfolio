# Generate the resume PDF — manual step

The portfolio ships `hope-atina-resume.md` as the canonical source. The `/hiring` page "Download resume" button currently points at the `.md` so the link is never broken.

To ship a PDF (preferred for recruiters), run one of these from your machine:

## Option 1 — VS Code "Markdown PDF" extension (easiest)

1. Open `hopefolio/public/resume/hope-atina-resume.md` in VS Code.
2. Install the "Markdown PDF" extension by yzane.
3. Right-click → "Markdown PDF: Export (pdf)".
4. Move the output to `hopefolio/public/resume/hope-atina-resume.pdf`.
5. Repoint the hiring-page button from `.md` to `.pdf` in `hopefolio/src/pages/hiring.tsx`.

## Option 2 — `md-to-pdf` (CLI, needs Chromium download)

```bash
cd hopefolio
npx md-to-pdf public/resume/hope-atina-resume.md
```

First run downloads Chromium (~150 MB). Output goes to the same directory as the input.

## Option 3 — Browser print

1. `cd hopefolio && npm run dev`
2. Open `http://localhost:3000/resume/hope-atina-resume.md` — or push the file into a rendered HTML preview (any md viewer).
3. Cmd-P → Save as PDF. Tight margins, standard font.

## After generating

1. Commit the PDF at `hopefolio/public/resume/hope-atina-resume.pdf`.
2. Update `hopefolio/src/pages/hiring.tsx:183` to point at `.pdf` instead of `.md`.
3. Rebuild + deploy.
