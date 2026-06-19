# CV-Maker

A clean, professional CV/Resume maker for tech job applicants. Built with React + Vite, designed with content-style separation — fill in YAML files, run one command, get a polished PDF.

## Features

- **Zero frontend knowledge** — edit `contents/cv.yml`, run `npm run export`, done
- **Live preview** — `npm run dev` with hot reload on YAML changes
- **PDF export** — single-command `npm run export` → A4 PDF to `dist/`
- **6 color schemes** — navy, slate, forest, burgundy, teal, charcoal
- **Custom fonts** — system fonts, local files, or Google Fonts
- **Icons** — Lucide icon set, custom icons supported (local/URL/data URI)
- **Markdown** — bold, italic, underline, inline code in descriptions
- **Docker** — dev container included, `npm run dev` or `npm run export`

## Quick Start

```bash
npm install
npm run dev           # http://localhost:5173
# edit contents/cv.yml → instant preview
npm run export        # → dist/resume.pdf
npm run clean         # clean built artifacts
```

## Project Structure

```
CV-Maker/
├── contents/              # 👤 Your content
│   ├── cv.yml             #    Resume data
│   └── settings.yml       #    Color scheme & fonts
├── src/                   # 🎨 Style layer
│   ├── components/        #    React components
│   ├── styles/            #    CSS + theme
│   ├── types/             #    TypeScript types
│   └── utils/             #    Content loader
├── public/
│   └── icons/             #    SVG icons (Lucide)
├── scripts/
│   └── export-pdf.mjs     # 📄 PDF generator
├── docs/                  # 📖 Documentation
│   ├── usage.md           #    Usage guide
│   └── development.md     #    Developer guide
├── .devcontainer/         # 🐳 Docker
└── package.json
```

## Documentation

- [Usage Guide](docs/usage.md) — how to prepare environment, fill in cv.yml, configure colors/fonts/margins
- [Development Guide](docs/development.md) — architecture, customization, how to extend

## License

MIT
