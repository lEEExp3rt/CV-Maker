# Configuration Guide

This document describes all configuration options available in CV-Maker.

## Content Configuration (`contents/cv.yaml`)

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

### `education` (array)

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

### `internship` (array)

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
| `brief` | string | No | Brief summary. Supports same Markdown as internship |
| `role` | string | Yes | Your role in the project |
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

## Display Settings (`contents/settings.yaml`)

### `color_scheme`

Choose one of:

- `"navy"` — Classic dark navy blue theme (default)
- `"slate"` — Modern slate gray theme

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

### Chinese Font Notes

For optimal PDF rendering (especially in Docker/Puppeteer), ensure the font is installed on the system:

- **macOS**: PingFang SC is built-in
- **Windows**: Microsoft YaHei is built-in
- **Linux/Docker**: Noto Sans CJK is installed in the Docker image (`fonts-noto-cjk`)
- **Web-safe fallback**: `sans-serif` ensures text always renders

---

## Page Layout

The resume is designed for A4 paper (210mm × 297mm). Typography scales are tuned to fit one page comfortably:

| Element | Size | Weight |
|---------|------|--------|
| Name (title) | 24pt | 700 (bold) |
| Section titles | 13pt | 600 (semi-bold) |
| Item titles | 11pt | 600 (semi-bold) |
| Body text | 9.5pt | 400 (normal) |
| Captions/dates | 8pt | 400 (normal) |

These are not directly configurable via YAML, but can be changed in `src/styles/theme.ts` for advanced customization.
