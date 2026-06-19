# CV-Maker

A clean, professional CV/Resume maker for tech job applicants. Built with React + Vite, designed with content-style separation — fill in YAML files, run one command, get a polished PDF.

## Features

- **Zero frontend knowledge required** — edit YAML files to fill your resume content
- **Live preview** — `npm run dev` starts a dev server with hot reload
- **One-click PDF export** — `npm run export` generates an A4 PDF to `dist/`
- **Content-Style separation** — content in `contents/`, presentation in `src/`
- **Multiple color schemes** — Classic Navy & Modern Slate, configurable via YAML
- **Configurable fonts** — supports custom Chinese & English font families
- **Optional sections** — skills, awards, photo, social links, GPA etc. — all toggleable
- **Docker support** — dev container included for VSCode

## Quick Start

### Prerequisites

- Node.js >= 18
- npm >= 9

### Setup

```bash
# Install dependencies
npm install

# Start dev server (hot reload enabled)
npm run dev
```

Open http://localhost:5173 in your browser.

### Edit Your Resume

1. Edit `contents/cv.yml` — fill in your personal info, education, experience, etc.
2. Edit `contents/settings.yml` — choose color scheme and fonts
3. The browser preview updates instantly on save

### Export PDF

```bash
# Build and generate PDF
npm run export
```

The PDF will be saved to `dist/resume.pdf`.

## Project Structure

```
CV-Maker/
├── contents/                  # 👤 Your content — edit these files
│   ├── cv.yml                #    Resume data (name, education, work, etc.)
│   ├── settings.yml          #    Theme & display settings
│   └── images/                #    Your photo and other images
├── src/                       # 🎨 Style layer — resume components & theme
│   ├── components/            #    React components per resume section
│   ├── styles/                #    CSS and theme definitions
│   ├── types/                 #    TypeScript type definitions
│   └── utils/                 #    Content loading utilities
├── scripts/
│   └── export-pdf.mjs         # 📄 PDF generation script (Puppeteer)
├── docs/                      # 📖 Documentation
│   ├── config.md              #    Configuration guide
│   └── development.md         #    Developer guide
├── .devcontainer/             # 🐳 Docker / VSCode dev container
├── .gitignore
├── package.json
├── vite.config.ts
├── tsconfig.json
└── index.html
```

## Docker

```bash
# Build the image
docker build -t cv-maker -f .devcontainer/Dockerfile .

# Run dev server
docker run -p 5173:5173 cv-maker dev

# Export PDF
docker run -v $(pwd)/dist:/workspace/dist cv-maker export
```

### VSCode Dev Container

Open the project in VSCode, and when prompted, click "Reopen in Container". The dev server starts automatically on port 5173.

## Documentation

- [Configuration Guide](docs/CONFIG.md) — all YAML fields, color schemes, fonts
- [Development Guide](docs/DEVELOPMENT.md) — architecture, customization, contributing

## License

MIT
