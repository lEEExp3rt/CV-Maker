# Changelog

## [2.2.0] — Editor Polish & Quality of Life

### Added

- **Entry Drag-and-Drop** — reorder entries in Education, Internship, Projects, Skills, Awards, Socials, Customs, Courses, and Details by dragging the `⠿` handle
- **Anonymous Mode** — toggle in settings bar, selectively hide name/photo/contact/socials/school/company/links; applied to both preview and PDF export
- **JSON Import Validation** — detects parse errors and missing fields, shows warnings/errors in toast; `validate()` checks required fields and types
- **JSON Metadata Envelope** — export wraps data in `{ type, version, source, exported, data }`; import detects format, shows version mismatch warnings, backward compatible with old bare JSON
- **Version Badge** — `v2.2.0` tag in nav bar and homepage title area; click to view changelog in a modal
- **License Modal** — click "MIT License" in footer to view full license text in a modal
- **Import Success Toast** — green notification on successful import, yellow for warnings, red for errors
- **Auto-resizing Textareas** — brief and details fields grow with content, no scrollbars

### Changed

- **Field Names** — `school_en` → `school_subtitle`, `company_en` → `company_subtitle`, project `name`/`name_en` → `title`/`subtitle`; all labels and placeholders updated to descriptive names
- **JSON Export** — file name defaults to project name
- **Project Sidebar** — date display shows full date + time (`2026/07/09 16:00:27`)
- **Markdown** — supports combined formatting (`***bold italic***`, `**bold `code`**`)

### Fixed

- Brief/details fields auto-resize on JSON import and window resize
- Editor section spacing unified across PersonalInfo tabs
- PDF export scrollbar hidden, page breaks for long content
- Footer icons use official brand logos

---

## [2.1.0] — Remix Icons & Social Links

### Added

- **Remix Icon Integration** — replaced all Lucide icons with [Remix Icon](https://remixicon.com) (npm package, MIT)
- **20+ Built-in Social Icons** — GitHub, WeChat, QQ, Zhihu, Bilibili, Tiktok, Weibo, X/Twitter, Instagram, LinkedIn, Reddit, Discord, Telegram, RSS, Gitee, Stack Overflow
- **Dynamic Icon Loading** — enter any Remix icon name (e.g. `discord-fill`) to load from 2800+ icons at runtime
- **Socials Section** — dedicated form section for built-in social links with icon type picker
- **Homepage Demo JSON Files** — demos extracted to `examples/` as standalone importable JSON
- **Official Brand Logos** — React, TypeScript, Vite, GitHub, Remix Icon logos in footer

### Changed

- **Contact Fields** — `github` standalone field removed, merged into `socials[]` array
- **Icons** — all Lucide SVGs removed from `public/icons/`, replaced with Remix import system
- **Icon Size** — personal info icons default size increased for better readability

### Fixed

- PersonalInfo editor section spacing unified across all 4 sections
- Footer uses official GitHub mark and colored Remix Icon logo
- All editor placeholders replaced with descriptive labels (no hardcoded names)
- Demo data anonymized and extracted to standalone `examples/*.json` files

---

## [2.0.0] — Visual Editor

A complete rewrite of CV-Maker into a visual editor with browser-side PDF export. Replaces the previous YAML-based workflow.

### Added

- **Visual Editor** — form-based editor with live preview at `/editor`
- **Multi-Project Management** — sidebar to create, switch, duplicate, rename, and delete resume projects
- **Project Sidebar** — collapsible, resizable sidebar with project list
- **Editor Panel** — collapsible form panel with percentage-based width and drag-to-resize
- **Six Form Tabs** — Personal Info, Education, Internship, Projects, Skills, Awards
- **Photo Upload** — base64 local storage, no server needed
- **Icon Picker** — built-in presets (Remix Icon) + custom URL/upload
- **Color Scheme Selector** — 6 schemes (navy / slate / forest / burgundy / teal / charcoal)
- **Language Selector** — Chinese / English section titles
- **Import/Export** — JSON modal with copy-to-clipboard and file download
- **Homepage** (`/`) — project intro, feature cards, demo resumes
- **Documentation Site** (`/docs/usage`, `/docs/development`) — rendered from markdown with syntax highlighting
- **Responsive Layout** — scalable demo cards, responsive editor breakpoints
- **`ScalableWrapper`** — proportional A4 resume scaling on homepage
- **Footer Component** — shared MIT license + powered-by banner
- **GitHub Pages Workflow** — auto-deploy from `main` branch

### Changed

- **Data Storage** — YAML files replaced with localStorage + JSON export/import
- **PDF Export** — Puppeteer CLI replaced with browser `window.print()`
- **Dependencies** — removed `puppeteer`, `js-yaml`, `@types/js-yaml` (~300MB Docker image reduction)
- **Documentation** — rewritten as full Chinese docs (README, usage, development)
- **Docker** — simplified Dockerfile (no Chromium, no Puppeteer env vars)

### Removed

- YAML-based workflow (`src/App.tsx`, `src/utils/loadContent.ts`, `scripts/export-pdf.mjs`)
- YAML virtual module Vite plugin
- `puppeteer`, `js-yaml` dependencies

---

## [1.0.0] — YAML-Based (main)

Initial release. Resume generator driven by YAML content files with Puppeteer PDF export.

### Features

- **YAML Content** — edit `contents/cv.yml` and `contents/settings.yml`
- **6 Resume Sections** — Personal Info, Education, Internship, Projects, Skills, Awards
- **Live Preview** — `npm run dev` with HMR on YAML changes
- **PDF Export** — `npm run export` via headless Puppeteer
- **6 Color Schemes** — navy, slate, forest, burgundy, teal, charcoal
- **Chinese/English Support** — configurable section titles
- **Font Configuration** — system fonts, local files, or CDN
- **Lucide Icons** — inline SVG icons for built-in fields
- **Markdown Support** — bold, italic, underline, inline code in descriptions
- **Docker** — full dev container with Chromium, CJK fonts, Puppeteer
- **VSCode Dev Container** — pre-configured `.devcontainer/`
