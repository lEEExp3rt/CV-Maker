# Configuration Guide

This document describes all configuration options available in CV-Maker.

## Content Configuration (`contents/cv.yml`)

This is the main file where you fill in your resume content. All fields marked with `?` are optional.

### `personal_info`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Your full name (displayed as the resume title) |
| `photo` | string | No | Path to photo, e.g. `"images/me.jpg"` (place image in `public/`) |
| `contact` | object | Yes | Contact information, see below |

#### `contact`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | Email address |
| `phone` | string | Yes | Phone number |
| `homepage` | string | No | Personal website URL |
| `github` | string | No | GitHub profile URL |
| `customs` | array | No | Additional entries — links or plain text, see below |

#### `contact.customs` entries

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `label` | string | Yes | Internal identifier (not displayed) |
| `url` | string | Yes | Display text. If starts with `http://` or `https://`, rendered as a clickable link |
| `icon` | string | No | Icon image. Supports local path, `http(s)://` URL, or `data:` URI |

##### Supported icon formats

| Form | Example |
|------|---------|
| Local file | `icon: "icons/blog.svg"` (relative to `public/`) |
| Remote URL | `icon: "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/rss.svg"` |
| Data URI | `icon: "data:image/svg+xml;base64,..."` |

If `icon` is not specified, a default link icon will be used.

**Example:**

```yaml
personal_info:
  name: "张三"
  photo: "images/me.jpg"
  contact:
    email: "zhangsan@zju.edu.cn"
    phone: "+86-138-0000-0000"
    homepage: "https://zhangsan.dev"
    github: "https://github.com/zhangsan"
    customs:
      - label: "Blog"
        url: "https://zhangsan.dev/blog"
        icon: "icons/blog.svg"
      - label: "微信"
        url: "zhangsan_123"
```

**Built-in icons:** email, phone, homepage, and GitHub entries are automatically rendered with icons. No configuration needed.

#### Icon Reference

Built-in icons are from [Lucide](https://lucide.dev) (MIT licensed). SVG files are stored locally at `public/icons/`:

| Entry | Icon file |
|-------|-----------|
| Email | `mail.svg` |
| Phone | `phone.svg` |
| Homepage | `globe.svg` |
| GitHub | `github.svg` |

#### Custom icons (`customs`)

Each `customs` entry supports an optional `icon` field:

- **Local icon:** place the SVG/PNG file under `public/` and reference it by path, e.g. `icon: "icons/blog.svg"`
- **Remote icon:** use a full URL, e.g. `icon: "https://example.com/icon.svg"`

You can download additional icons from [Lucide](https://lucide.dev/icons) and save them to `public/icons/`.

### `educations` (array)

Each entry:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `school` | string | Yes | School name (Chinese) |
| `school_en` | string | No | School name (English) |
| `degree` | string | Yes | Degree, e.g. `"本科"`, `"硕士"` |
| `major` | string | Yes | Major/field of study |
| `start` | string | Yes | Start date, e.g. `"2020-09"` |
| `end` | string | Yes | End date, e.g. `"2024-06"` |
| `gpa` | string | No | GPA, e.g. `"3.9/4.0"` |
| `ranking` | string | No | Class ranking, e.g. `"3/120"` |
| `courses` | array | No | List of core course names |

### `internships` (array)

Each entry:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `company` | string | Yes | Company name (Chinese) |
| `company_en` | string | No | Company name (English) |
| `department` | string | No | Department/team, displayed before role |
| `brief` | string | No | Brief summary. Supports inline Markdown: `**bold**`, `*italic*`, `__underline__`, `` `code` `` |
| `role` | string | Yes | Job title |
| `start` | string | Yes | Start date |
| `end` | string | Yes | End date |
| `details` | array | Yes | Bullet-point descriptions. Supports the same Markdown as `brief` |

### `projects` (array)

Each entry:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Project name (Chinese) |
| `name_en` | string | No | Project name (English) |
| `url` | string | No | Project URL, displayed with a link icon |
| `brief` | string | No | Brief summary. Supports same Markdown as internship |
| `start` | string | Yes | Start date |
| `end` | string | Yes | End date |
| `details` | array | Yes | Bullet-point descriptions. Supports the same Markdown |

### `skills` (array, optional)

Each entry:

| Field | Type | Description |
|-------|------|-------------|
| `category` | string | Skill category label |
| `items` | array | List of skills in this category |

### `awards` (array, optional)

Each entry:

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Award name |
| `date` | string | Award date/year |

---

## Display Settings (`contents/settings.yml`)

### `color_scheme`

Choose one of:

- `"navy"` — 深蓝，经典稳重
- `"slate"` — 石板灰，现代简约
- `"forest"` — 森林绿，清新自然
- `"burgundy"` — 勃艮第红，优雅大气
- `"teal"` — 青墨，低调内敛
- `"charcoal"` — 炭黑，极致简洁

### `font` (optional)

Customize Chinese and English font families:

```yaml
font:
  chinese: '"PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif'
  english: '"Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif'
```

**Defaults:**

| Language | Default Font Stack |
|----------|-------------------|
| Chinese | `"PingFang SC", "Microsoft YaHei", "Noto Sans SC", "Hiragino Sans GB", sans-serif` |
| English | `"Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif` |

### Font Configuration

There are three ways to use a custom font:

#### 1. System font (no setup required)

If the font is already installed on your OS, just reference it by name in `contents/settings.yml`:

```yaml
font:
  chinese: '"苹方", "PingFang SC", sans-serif'
  english: '"Inter", sans-serif'
```

Common built-in fonts: PingFang SC (macOS), Microsoft YaHei (Windows), Noto Sans CJK (Linux).

#### 2. Local font file

Place the font file in `public/fonts/`, then declare it in `src/styles/global.css`:

```css
@font-face {
  font-family: 'LXGW WenKai';
  src: url('/fonts/LXGWWenKai-Regular.ttf') format('truetype');
}
```

Then reference it in `contents/settings.yml`:

```yaml
font:
  chinese: '"LXGW WenKai", sans-serif'
```

This works offline and is recommended for PDF export. The Docker image copies all files under `public/`, so local fonts are included automatically.

#### 3. CDN / Google Fonts (online)

Add a `<link>` to `index.html` inside `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC&display=swap" rel="stylesheet">
```

Then reference it in `contents/settings.yml`:

```yaml
font:
  chinese: '"Noto Sans SC", sans-serif'
```

Requires network access. PDF export in Docker may fail if the CDN is unreachable — for offline use, prefer method 1 or 2.

#### Fallback mechanism

The browser tries fonts from left to right. The last entry should always be a generic family (`sans-serif`, `serif`, `monospace`) to guarantee text renders even if all named fonts are unavailable.

---

## Typography

The resume uses a 4-level typographic hierarchy. Edit `src/styles/theme.ts` to customize:

| Element | CSS Variable | Default | Weight |
|---------|-------------|---------|--------|
| Name (title) | `--fs-name` | 24pt | 700 (bold) |
| Section titles | `--fs-section` | 13pt | 600 (semi-bold) |
| Item titles | `--fs-item` | 11pt | 600 (semi-bold) |
| Body text | `--fs-body` | 9.5pt | 400 (normal) |
| Captions/dates | `--fs-small` | 8pt | 400 (normal) |

## Spacing Reference

All spacing values are in `src/styles/resume.css`. To adjust any value, search for the CSS variable or class name listed below.

### Page Margins

| What | Where | Default |
|------|-------|---------|
| Top padding (screen + print) | `.resume-page { --page-padding-top }` | `15mm` |
| Bottom padding | `.resume-page { --page-padding-bottom }` | `10mm` |
| Left/right padding | `.resume-page { padding }` third/fourth value | `20mm` |

### Section Spacing

| What | CSS class | Default |
|------|-----------|---------|
| Gap between sections | `.resume-section { margin-bottom }` | `3mm` |
| Section title bottom margin | `.resume-section-title { margin-bottom }` | `2mm` |
| Section title underline padding | `.resume-section-title { padding-bottom }` | `1mm` |

### Entry Spacing (within sections)

| What | CSS class | Default |
|------|-----------|---------|
| Gap between entries | `.resume-entry { margin-bottom }` | `1.8mm` |
| Entry header bottom margin | `.resume-entry-header { margin-bottom }` | `0.8mm` |
| Brief bottom margin | `.resume-entry-brief { margin-bottom }` | `1.2mm` |
| Bullet line gap | `.resume-details li { margin-bottom }` | `0.4mm` |
| Courses top margin | `.resume-courses { margin-top }` | `0.5mm` |

### Header Spacing

| What | CSS class | Default |
|------|-----------|---------|
| Header bottom margin | `.resume-header { margin-bottom }` | `3mm` |
| Name bottom margin | `.resume-name { margin-bottom }` | `3mm` |

### Other

| What | CSS class | Default |
|------|-----------|---------|
| Skills category gap | `.resume-skills-list { gap }` | `1.5mm` |
| Award item gap | `.resume-awards-list li { margin-bottom }` | `0.8mm` |

All values use `mm` units for print accuracy. Reducing these values makes the layout more compact; increasing them adds breathing room.
