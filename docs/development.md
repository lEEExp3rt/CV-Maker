# Development Guide

This document is for developers who want to understand, customize, or extend CV-Maker.

## Architecture Overview

CV-Maker follows a **Content-Style separation** architecture:

```
┌──────────────────────────────┐
│  Content Layer (contents/)   │  ← User-edited YAML files
│  cv.yaml + settings.yaml     │
└──────────────┬───────────────┘
               │  Vite virtual module plugin
               │  (parses YAML → JS objects with HMR)
               ▼
┌──────────────────────────────┐
│  Data Layer (src/utils/)     │
│  loadContent.ts              │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│  Theme Layer (src/styles/)   │
│  theme.ts → CSS variables    │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│  View Layer (src/components/)│
│  PersonalInfo, Education,    │
│  Internship, Projects,       │
│  Skills, Awards              │
└──────────────────────────────┘
```

### Key Design Decisions

1. **Virtual Module for YAML**: Instead of importing YAML files directly (which Vite doesn't natively support with HMR), a custom Vite plugin (`vite.config.ts`) creates a virtual module `virtual:cv-data`. The plugin reads YAML files on the server side, parses them with `js-yaml`, and provides the parsed data as JS exports. File changes trigger HMR updates automatically.

2. **CSS Custom Properties for Theming**: Color schemes and font configs are injected as CSS custom properties (variables) via the `style` attribute on the resume container. This keeps theming dynamic without requiring CSS-in-JS or runtime style injection.

3. **Print-First CSS**: The stylesheet (`resume.css`) is designed with `@media print` and `@page` rules. The resume page is an exact A4 container (210mm × 297mm), ensuring WYSIWYG between screen and PDF.

## Project Structure

```
src/
├── components/          # React components — one per resume section
│   ├── PersonalInfo.tsx # Name, contact, photo, social links
│   ├── Education.tsx    # Education history entries
│   ├── Internship.tsx   # Internship experience entries
│   ├── Projects.tsx     # Project entries
│   ├── Skills.tsx       # Skill categories (optional)
│   └── Awards.tsx       # Awards & honors (optional)
├── styles/
│   ├── theme.ts         # Color scheme definitions, typography scale, CSS var builder
│   ├── resume.css       # Resume layout, section styles, print rules
│   └── global.css       # Reset & base page styles
├── types/
│   ├── resume.ts        # TypeScript interfaces for all resume data
│   └── virtual.d.ts     # Type declarations for virtual modules
├── utils/
│   └── loadContent.ts   # Re-exports from virtual module with fallbacks
├── App.tsx              # Root component — loads data, passes to Resume
├── Resume.tsx           # Layout container — applies theme, renders sections
└── main.tsx             # Vite entry point
```

## How To...

### Add a New Resume Section

1. **Define types** in `src/types/resume.ts`:
   ```ts
   export interface NewSectionEntry {
     title: string
     description: string
   }
   ```
   Add it to `ResumeData`:
   ```ts
   export interface ResumeData {
     // ... existing fields
     new_section?: NewSectionEntry[]
   }
   ```

2. **Create component** in `src/components/NewSection.tsx`:
   ```tsx
   export default function NewSection({ data }: { data: NewSectionEntry[] }) {
     if (!data?.length) return null
     return (
       <section className="resume-section">
         <h2 className="resume-section-title">New Section</h2>
         {/* render entries */}
       </section>
     )
   }
   ```

3. **Register in Resume.tsx** — import and add to the render tree inside `.resume-page`.

4. **Add to YAML schema** — update `contents/cv.yaml` with sample data.

### Add a Color Scheme

Edit `src/styles/theme.ts`:

```ts
export const colorSchemes = {
  // ... existing
  forest: {
    primary: '#276749',
    accent: '#48bb78',
    body: '#1a202c',
    divider: '#276749',
    bg: '#ffffff',
    muted: '#718096',
  },
}

// Update the type:
export type ColorScheme = 'navy' | 'slate' | 'forest'
```

Then set `color_scheme: "forest"` in `contents/settings.yaml`.

### Customize Typography

Edit the `typography` object in `src/styles/theme.ts`:

```ts
export const typography = {
  name: { fontSize: '26pt', fontWeight: 700, lineHeight: 1.3 },
  sectionTitle: { fontSize: '14pt', fontWeight: 600, lineHeight: 1.4 },
  // ...
}
```

### Modify PDF Export Behavior

Edit `scripts/export-pdf.mjs`. The script:
1. Starts a Vite preview server on port 4173
2. Launches headless Chromium via Puppeteer
3. Navigates to `http://127.0.0.1:4173?print=true`
4. Calls `page.pdf()` with A4 settings
5. Saves to `dist/resume.pdf`

Add `?print=true` to the URL to hide UI chrome during export.

## Vite Plugin: YAML Virtual Module

Located in `vite.config.ts`, the `yamlVirtualPlugin()` function:

1. Watches `contents/cv.yaml` and `contents/settings.yaml`
2. On load: reads, parses (via `js-yaml`), and exports parsed objects
3. On change: invalidates the virtual module and sends HMR update

The virtual module ID is `virtual:cv-data` (resolved to `\0virtual:cv-data`).

## HMR Flow

```
YAML file changed on disk
  → Vite file watcher detects change
  → Plugin invalidates virtual:cv-data module
  → Vite HMR WebSocket sends update to browser
  → App.tsx import.meta.hot.accept('virtual:cv-data') fires
  → refresh() re-reads data → React re-renders
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | TypeScript check + production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run export` | Build + generate PDF via Puppeteer |

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^18 | UI framework |
| `vite` | ^5 | Build tool & dev server |
| `js-yaml` | ^4 | YAML parsing (in Vite plugin) |
| `puppeteer` | ^22 | Headless PDF generation |
| `typescript` | ~5.4 | Type checking |
