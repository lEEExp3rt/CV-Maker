# Usage Guide

## Environment Setup

### Prerequisites

- **Node.js** >= 20
- **npm** >= 9

Check your versions:

```bash
node --version   # should be v18.x or higher
npm --version    # should be 9.x or higher
```

If you need to install or upgrade Node.js:

- **macOS**: `brew install node` or download from [nodejs.org](https://nodejs.org)
- **Windows**: download installer from [nodejs.org](https://nodejs.org)
- **Linux**: use [nvm](https://github.com/nvm-sh/nvm) — `nvm install 22 && nvm use 22`

### Install Project

```bash
git clone https://github.com/lEEExp3rt/CV-Maker cv-maker
cd cv-maker
npm install
```

### Docker

If you prefer Docker, no Node.js installation is needed.

**Build the image:**

```bash
docker build -t cv-maker -f .devcontainer/Dockerfile .
```

**Development (live preview):**

```bash
docker run -p 5173:5173 -v $(pwd)/contents:/workspace/contents cv-maker dev
```

Open http://localhost:5173. The `-v` flag mounts your local `contents/` so editing YAML files triggers hot reload. The `-p` flag forwards the dev server port.

**Export PDF:**

```bash
docker run --rm \
  -v "$(pwd)/contents:/workspace/contents" \
  -v "$(pwd)/dist:/workspace/dist" \
  cv-maker export
```

**Other commands:**

```bash
docker run cv-maker build          # production build only (no PDF)
docker run cv-maker clean          # clean build artifacts
docker run -it cv-maker bash       # interactive shell for debugging
```

**VSCode Dev Container (easiest):**

Open the project in VSCode → click "Reopen in Container". The dev server starts automatically on port 5173 with `contents/` mounted directly. No manual Docker commands needed.

**Clean up:**

```bash
docker rmi cv-maker              # remove the built image
docker container prune           # remove stopped containers
docker system prune -a           # full cleanup
```

> The Docker image includes Chromium (for Puppeteer) and Noto CJK fonts (for Chinese PDF rendering) automatically. No extra font setup needed.

**Speed up in mainland China:**

The image build pulls from Docker Hub, Debian mirrors, and npm — all slow by default in mainland China. To accelerate, create a `docker-compose.yml` or pass build args. The simplest approach: add a `.npmrc` for npm mirror, then rebuild:

```bash
# Create .npmrc for npm mirror (Tencent / Aliyun)
echo "registry=https://registry.npmmirror.com" > .npmrc

# Rebuild, apt sources mirror via sed in Dockerfile
docker build -t cv-maker -f .devcontainer/Dockerfile .
```

For apt and Docker Hub mirrors, configure your Docker daemon (`/etc/docker/daemon.json`):

```json
{
  "registry-mirrors": ["https://docker.1ms.run"]
}
```

Then restart Docker: `sudo systemctl restart docker`.

### Fonts for PDF Export

For Chinese PDF export without Docker, ensure Chinese fonts are installed:

- **macOS**: PingFang SC (built-in)
- **Windows**: Microsoft YaHei (built-in)
- **Linux**: `sudo apt install fonts-noto-cjk`

## Recommended Workflow

You'll likely need multiple resumes — one for each company or position. Here are two clean ways to manage them:

### Git branches (recommended for developers)

Clone once, one branch per resume:

```bash
git clone https://github.com/lEEExp3rt/CV-Maker cv-maker
cd cv-maker
npm install

# Create a branch for each target
git checkout -b resume/alibaba
# edit contents/cv.yml → commit

git checkout -b resume/bytedance
# edit contents/cv.yml → commit
```

Switch branches to switch resumes. Each branch has its own `cv.yml`, photo, and settings — fully isolated.

### Docker containers (no Git needed)

One named container per resume, **without volume mounts** to keep data isolated:

```bash
docker build -t cv-maker -f .devcontainer/Dockerfile .

# Resume for Alibaba
docker run -d --name cv-alibaba -p 5173:5173 cv-maker dev

# Resume for ByteDance (different port)
docker run -d --name cv-bytedance -p 5174:5173 cv-maker dev
```

> **Important:** do NOT use `-v` volume mounts with this approach. Each container keeps its own copy of `contents/` inside — edit files via `docker exec -it cv-alibaba bash` or `docker cp`.

To switch resumes, just start the container you need:

```bash
docker start cv-alibaba     # → http://localhost:5173
docker start cv-bytedance   # → http://localhost:5174
```

Export PDF from any container:

```bash
docker exec cv-alibaba npm run export
docker cp cv-alibaba:/workspace/dist/resume.pdf ./resume-alibaba.pdf
```

### Clean up old containers

```bash
docker stop cv-alibaba cv-bytedance
docker rm cv-alibaba cv-bytedance
```

---

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

### Language

```yaml
language: "zh"    # "zh" (中文) or "en" (English)
```

Controls section titles and labels. When set to `"en"`, all Chinese text in section headings is removed (e.g., "教育背景 EDUCATION" → "EDUCATION", "核心课程" → "Core Courses").

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
