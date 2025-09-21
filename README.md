# md-to-pdf-ts

A simple **Markdown → PDF** converter written in **TypeScript**. It converts a `.md` file into a nicely rendered PDF using `markdown-it` for Markdown-to-HTML and `puppeteer` to render HTML to PDF (headless Chromium).

## Features
- Convert local Markdown files to PDF
- Small, easy-to-understand TypeScript code
- Example `example.md` included
- GitHub Actions workflow that builds the project on push

## Requirements
- Node.js >= 16 (Node 18+ recommended)
- npm

## Install & run (local)
```bash
git clone https://github.com/YOUR-USERNAME/md-to-pdf-ts.git
cd md-to-pdf-ts
npm install
```

### Convert a markdown file
```bash
# simple (uses ts-node)
npm run convert -- example.md example.pdf

# or build then run
npm run build
node dist/convert.js example.md example.pdf
```

Output PDF will be saved to `example.pdf` (or the path you provide).

## Notes
- Puppeteer will download a Chromium binary during `npm install`. This may take some time and disk space.
- For CI environments you might want to use `puppeteer-core` + a system Chromium; this example uses full `puppeteer` for simplicity.

## Project structure
```
md-to-pdf-ts/
├─ src/convert.ts       # main converter
├─ example.md           # sample markdown
├─ README.md
└─ .github/workflows/nodejs.yml
```

## Future ideas
- Add CLI flags for page size, margins, and CSS theme
- Add support for remote images (download/caching)
- Add a simple web UI or REST API
