# Usage Guide

## Basic Usage

### 1. Fill in Your Resume

Edit `contents/cv.yml` — this is the only file you need to touch. All fields marked with `?` are optional.

```yaml
personal_info:
  name: "Your Name"
  photo: "images/photo.jpg"        # ?
  contact:
    email: "you@example.com"
    phone: "+86-xxx-xxxx-xxxx"
    homepage: "https://example.com" # ?
    github: "https://github.com/you"# ?
    customs:                        # ?
      - label: "Blog"
        url: "https://example.com/blog"
        icon: "icons/blog.svg"      # ? local / https:// / data:

educations:
  - school: "XX University"
    school_en: "XX University"     # ?
    degree: "Bachelor"
    major: "Computer Science"
    start: "2020-09"
    end: "2024-06"                  # omit if ongoing → "至今"
    gpa: "3.8/4.0"                 # ?
    ranking: "5/120"               # ?
    courses:                        # ?
      - "Data Structures"
      - "Operating Systems"

internships:
  - company: "XX Company"
    company_en: "XX Company"       # ?
    department: "Engineering"      # ?
    role: "Software Engineer Intern"
    brief: "Brief summary"         # ? Markdown supported
    start: "2023-06"
    end: "2023-09"
    details:
      - "Built **high-performance** API with `Go`, QPS 10K+"
      - "Reduced latency by *35%*"

projects:
  - name: "Project Name"
    name_en: "Project Name"        # ?
    url: "https://github.com/you/project"  # ?
    brief: "Brief summary"         # ? Markdown supported
    start: "2023-01"
    end: "2023-05"
    details:
      - "Implemented __distributed__ consensus with **Raft**"
      - "Achieved `50K ops/s` write throughput"

skills:                             # ? entire section optional
  - category: "Languages"
    items: ["Go", "Python", "TypeScript"]
  - category: "Frameworks"
    items: ["React", "Docker", "Kubernetes"]

awards:                             # ? entire section optional
  - name: "ACM-ICPC Silver Medal"
    date: "2022"
```

### 2. Preview

```bash
npm run dev
```

Open http://localhost:5173. Edit `contents/cv.yml` — the page updates instantly.

### 3. Export PDF

```bash
npm run export
```

PDF saved to `dist/resume.pdf`.

### 4. Markdown Support

`brief` and `details` fields support inline Markdown:

| Syntax | Result |
|--------|--------|
| `**bold**` | **bold** |
| `*italic*` | *italic* |
| `__underline__` | underlined |
| `` `code` `` | `monospace` |

### 5. Icons

**Built-in icons** use [Lucide](https://lucide.dev) (MIT). SVG files are stored in `public/icons/`.

**Custom icons** (for `customs` entries) support three forms:

| Form | Example |
|------|---------|
| Local file | `icon: "icons/blog.svg"` |
| Remote URL | `icon: "https://cdn.example.com/icon.svg"` |
| Data URI | `icon: "data:image/svg+xml;base64,..."` |

Omit `icon` and a default link icon is used.

---

## Configurations

All visual configuration is in `contents/settings.yml`.

### Color Scheme

```yaml
color_scheme: "navy"
```

Available schemes:

| Value | Style |
|-------|-------|
| `navy` | 深蓝，经典稳重 |
| `slate` | 石板灰，现代简约 |
| `forest` | 森林绿，清新自然 |
| `burgundy` | 勃艮第红，优雅大气 |
| `teal` | 青墨，低调内敛 |
| `charcoal` | 炭黑，极致简洁 |

Additional schemes can be added in `src/styles/theme.ts`.

### Font

```yaml
font:
  chinese: '"PingFang SC", "Microsoft YaHei", "Noto Sans SC", "Hiragino Sans GB", sans-serif'
  english: '"Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif'
```

**Three ways to use a custom font:**

1. **System font** — just reference the name (no setup needed):
   ```yaml
   font:
     chinese: '"LXGW WenKai", sans-serif'
   ```

2. **Local file** — place the font in `public/fonts/`, declare in `src/styles/global.css`:
   ```css
   @font-face {
     font-family: 'My Font';
     src: url('/fonts/my-font.ttf') format('truetype');
   }
   ```
   Then reference it in settings. Works offline, recommended for PDF export.

3. **CDN / Google Fonts** — add a `<link>` to `index.html`:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC&display=swap" rel="stylesheet">
   ```
   Then reference it in settings. Requires network access.

The browser tries fonts left to right; the last entry should always be a generic family (`sans-serif`, `serif`, `monospace`).

### Page Margins

Edit `src/styles/resume.css` — all spacing uses `mm` units for print accuracy:

| What | CSS Location | Default |
|------|-------------|---------|
| Top margin | `.resume-page { --page-padding-top }` | `15mm` |
| Bottom margin | `.resume-page { --page-padding-bottom }` | `10mm` |
| Left/right margin | `.resume-page { padding }` third/fourth value | `20mm` |
| Section gap | `.resume-section { margin-bottom }` | `3mm` |
| Entry gap | `.resume-entry { margin-bottom }` | `1.8mm` |
| Bullet line gap | `.resume-details li { margin-bottom }` | `0.4mm` |

### Typography

Edit `src/styles/theme.ts` to customize font sizes and weights:

| Element | Default Size | Default Weight |
|---------|-------------|----------------|
| Name | 24pt | 700 |
| Section title | 13pt | 600 |
| Item title | 11pt | 600 |
| Body | 9.5pt | 400 |
| Caption | 8pt | 400 |
