# Development Guide

## Project Overview

CV-Maker is a single-page React application built with Vite. It separates resume **content** (YAML files in `contents/`) from **presentation** (React components + CSS in `src/`).

## Architecture

```
contents/cv.yml  ──┐
                    ├──► Vite plugin (vite.config.ts)
contents/settings.yml ─┘    parses YAML → virtual:cv-data module
                                       │
                              ┌────────┘
                              ▼
                    src/utils/loadContent.ts
                              │
                              ▼
                    src/App.tsx → src/Resume.tsx
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
        PersonalInfo      Education       Internship ...
```

### Key Files

| Path | Purpose |
|------|---------|
| `contents/cv.yml` | Resume content (user-editable) |
| `contents/settings.yml` | Visual settings (color scheme, fonts) |
| `src/types/resume.ts` | TypeScript interfaces for all data |
| `src/styles/theme.ts` | Color scheme definitions, typography scale |
| `src/styles/resume.css` | All layout and print styles |
| `src/styles/global.css` | Reset and base page styles |
| `src/components/*.tsx` | One component per resume section |
| `vite.config.ts` | Vite config + YAML virtual module plugin |
| `scripts/export-pdf.mjs` | Puppeteer PDF generation |

### Data Flow

1. `vite.config.ts` contains a custom plugin that reads `contents/cv.yml` and `contents/settings.yml`, parses them with `js-yaml`, and exposes the parsed objects as a virtual module `virtual:cv-data`
2. `src/utils/loadContent.ts` provides typed accessors (`loadResumeData()`, `loadSettings()`) with fallback defaults
3. `App.tsx` loads data and passes it to `Resume.tsx`
4. `Resume.tsx` builds CSS variables from the settings and renders all section components
5. Each section component receives its typed data slice and renders conditionally (returns `null` if empty)

### HMR

When YAML files change, the Vite plugin invalidates the virtual module and sends an HMR update. `App.tsx` listens via `import.meta.hot.accept('virtual:cv-data', ...)` and re-renders.

## Getting Started

```bash
npm install
npm run dev        # dev server at localhost:5173
npm run build      # production build to dist/
npm run export     # build + PDF export
npm run clean      # remove dist/, node_modules/, .vite/
```

## How To

### Add a New Color Scheme

Edit `src/styles/theme.ts`:

```ts
// 1. Add the scheme definition
export const colorSchemes = {
  // ...existing...
  mytheme: {
    primary: '#123456',
    accent: '#789abc',
    body: '#333333',
    divider: '#123456',
    bg: '#ffffff',
    muted: '#718096',
  },
}

// 2. Update the type in src/types/resume.ts
export type ColorScheme = 'navy' | 'slate' | ... | 'mytheme'
```

Then set `color_scheme: "mytheme"` in `contents/settings.yml`.

### Add a New Resume Section

1. Define the type in `src/types/resume.ts`
2. Create a component in `src/components/NewSection.tsx`
3. Import and render it in `src/Resume.tsx`
4. Add sample data to `contents/cv.yml`

### Customize Typography

Edit the `typography` object in `src/styles/theme.ts`:

```ts
export const typography = {
  name: { fontSize: '24pt', fontWeight: 700, lineHeight: 1.3 },
  sectionTitle: { fontSize: '13pt', fontWeight: 600, lineHeight: 1.4 },
  itemTitle: { fontSize: '11pt', fontWeight: 600, lineHeight: 1.4 },
  body: { fontSize: '9.5pt', fontWeight: 400, lineHeight: 1.5 },
  small: { fontSize: '8pt', fontWeight: 400, lineHeight: 1.4 },
}
```

### Add or Replace Icons

1. Download an SVG from [Lucide](https://lucide.dev/icons) (or any source)
2. Save to `public/icons/`
3. Add an export in `src/components/Icons.tsx`:
   ```tsx
   export function MyIcon({ size = 16 }: IconProps) {
     return <LocalIcon src="my-icon.svg" size={size} />
   }
   ```
4. Use it in any component

### Understand the Vite Plugin

The `yamlVirtualPlugin()` in `vite.config.ts`:
- Watches `contents/cv.yml` and `contents/settings.yml`
- On load: reads, parses, and exports parsed objects
- On change: invalidates the virtual module and sends HMR update
- Fallback: provides empty defaults if files are missing

### Modify PDF Export

Edit `scripts/export-pdf.mjs`:
1. Starts Vite preview server on port 4173
2. Launches headless Chromium via Puppeteer
3. Navigates to `http://127.0.0.1:4173?print=true` (hides toolbar)
4. Calls `page.pdf()` with A4 format
5. Saves to `dist/resume.pdf`

CSS `@media print` rules in `resume.css` control the printed layout.

## Docker

```bash
docker build -t cv-maker -f .devcontainer/Dockerfile .
docker run -p 5173:5173 cv-maker dev
docker run -v $(pwd)/dist:/workspace/dist cv-maker export
```

The Dockerfile installs Chromium for Puppeteer and Noto CJK fonts for Chinese rendering.
