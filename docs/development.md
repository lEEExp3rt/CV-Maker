# Development Guide

## Project Structure

```
CV-Maker/
├── src/
│   ├── EditorApp.tsx          # 编辑器主布局
│   ├── HomePage.tsx           # 首页
│   ├── DemoPage.tsx           # 示例简历数据（导出常量）
│   ├── Resume.tsx             # 简历渲染组件（编辑器+首页共用）
│   ├── main.tsx               # 入口，路由分发
│   ├── components/
│   │   ├── Layout.tsx         # 顶部导航栏
│   │   ├── ScalableWrapper.tsx# 响应式简历缩放
│   │   ├── HeaderLeft.tsx     # 标题行 meta 布局（换行检测）
│   │   ├── MarkdownText.tsx   # 行内 Markdown 渲染
│   │   ├── Icons.tsx          # 内置图标组件
│   │   ├── PersonalInfo.tsx   # 个人信息展示
│   │   ├── Education.tsx      # 教育背景展示
│   │   ├── Internship.tsx     # 实习经历展示
│   │   ├── Projects.tsx       # 项目经历展示
│   │   ├── Skills.tsx         # 专业技能展示
│   │   ├── Awards.tsx         # 获奖情况展示
│   │   └── editor/
│   │       ├── PersonalInfoEditor.tsx
│   │       ├── EducationEditor.tsx
│   │       ├── InternshipEditor.tsx
│   │       ├── ProjectEditor.tsx
│   │       ├── SkillsEditor.tsx
│   │       ├── AwardsEditor.tsx
│   │       ├── ProjectSidebar.tsx  # 项目列表侧边栏
│   │       ├── Modal.tsx           # 通用弹窗
│   │       └── IconPicker.tsx      # 图标选择器
│   ├── hooks/
│   │   ├── useLocalStorage.ts      # 通用 localStorage 钩子
│   │   └── useProjectManager.ts    # 多项目管理
│   ├── styles/
│   │   ├── resume.css              # 简历布局+打印样式
│   │   ├── editor.css              # 编辑器布局+响应式
│   │   ├── theme.ts                # 配色方案+排版
│   │   └── global.css              # 全局重置
│   ├── types/
│   │   ├── resume.ts               # 简历数据类型
│   │   └── project.ts              # 项目管理类型
│   └── data/
│       └── defaults.ts             # 默认空简历数据
├── public/
│   ├── icons/                      # SVG 图标（Lucide）
│   └── images/                     # 用户照片
├── contents/                       # 保留：旧版 YAML 文件
├── docs/
├── .devcontainer/
├── .github/workflows/deploy.yml    # GitHub Pages 部署
└── package.json
```

## Architecture

### Page Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `HomePage` | 首页 |
| `/editor` | `EditorApp` | 可视化编辑器 |

路由分发在 `src/main.tsx` 中，通过 `window.location.pathname` 判断。

### Data Flow

```
useLocalStorage
  └─► useProjectManager (projects CRUD)
       └─► EditorApp (state + form dispatch)
            ├─► ProjectSidebar (project switching)
            ├─► Editor forms (PersonalInfoEditor etc.)
            └─► Resume (shared with HomePage demos)
```

### Key Principles

**localStorage 持久化**：`useLocalStorage` 是一个封装了 `useState` + `localStorage` 的通用钩子。每次 `setState` 时自动同步到 `localStorage.setItem()`，首次渲染时从 `localStorage.getItem()` 恢复。数据以 JSON 格式存储。

**多项目管理**：`useProjectManager` 在 `useLocalStorage` 之上实现了项目集合的 CRUD：

- 存储 key：`cv-maker-projects`
- 数据结构：`{ active: "project-id", projects: [{ id, title, createdAt, updatedAt, data }] }`
- 首次加载时自动迁移旧版 `cv-maker-data` 单 key 格式
- 至少保证一个项目存在

**组件复用**：`Resume.tsx` 被编辑器和首页 demo 共用。同一个组件接收不同的 `data` prop 即可渲染不同内容。编辑器通过 `EditorApp` 传入当前项目的 `activeProject.data`，首页通过 `DemoPage` 传入硬编码的 `DEMO_NO_PHOTO` / `DEMO_WITH_PHOTO`。

**响应式缩放**：`ScalableWrapper` 使用 `ResizeObserver` 监测容器宽度，按 A4 原始宽度（210mm ≈ 794px）等比缩放简历内容，实现自适应。

## Environment Setup

### Prerequisites

- **Node.js** >= 20
- **npm** >= 9

```bash
node --version
npm --version
```

### Install

```bash
git clone https://github.com/lEEExp3rt/CV-Maker
cd CV-Maker
npm install
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | 开发服务器 http://localhost:5173 |
| `npm run build` | TypeScript 检查 + 生产构建到 dist/ |
| `npm run preview` | 本地预览生产构建 |
| `npm run clean` | 清除 dist/、node_modules/、.vite/ |

## Docker

### Build & Run

```bash
docker build -t cv-maker -f .devcontainer/Dockerfile .
docker run -p 5173:5173 -v $(pwd)/public:/workspace/public cv-maker dev
docker run -v $(pwd)/dist:/workspace/dist cv-maker build
docker run -it cv-maker bash
```

### VSCode Dev Container

打开项目 → 点击「Reopen in Container」。`.devcontainer/devcontainer.json` 自动配置端口转发和依赖安装。

### Dockerfile

基于 `node:22-slim`，安装 `fonts-noto-cjk` 用于中文渲染。不含 Chromium/Puppeteer（PDF 导出已改用浏览器打印）。

## How to Customize

### Add a Color Scheme

1. 在 `src/styles/theme.ts` 的 `colorSchemes` 中添加定义
2. 在 `src/types/resume.ts` 的 `ColorScheme` 类型中添加名称
3. 在 `src/EditorApp.tsx` 设置栏添加 `<option>`

### Add a Resume Section

1. 在 `src/types/resume.ts` 中定义类型接口，添加到 `ResumeData`
2. 在 `src/components/` 创建展示组件（复用 `.resume-section`、`.resume-entry` 等 CSS 类）
3. 在 `src/components/editor/` 创建表单编辑器组件
4. 在 `src/Resume.tsx` 注册展示，在 `src/EditorApp.tsx` 注册表单和 tab

### Customize Typography

编辑 `src/styles/theme.ts` 的 `typography` 对象：

```ts
export const typography = {
  name: { fontSize: '24pt', fontWeight: 700, lineHeight: 1.3 },
  sectionTitle: { fontSize: '13pt', fontWeight: 600, lineHeight: 1.4 },
  itemTitle: { fontSize: '11pt', fontWeight: 600, lineHeight: 1.4 },
  body: { fontSize: '9.5pt', fontWeight: 400, lineHeight: 1.5 },
  small: { fontSize: '8pt', fontWeight: 400, lineHeight: 1.4 },
}
```

### Customize Page Margins

编辑 `src/styles/resume.css`：

| What | CSS Location | Default |
|------|-------------|---------|
| Top margin | `.resume-page { --page-padding-top }` | `15mm` |
| Bottom margin | `.resume-page { --page-padding-bottom }` | `10mm` |
| Left/right margin | `.resume-page { padding }` | `20mm` |
| Section gap | `.resume-section { margin-bottom }` | `3mm` |
| Entry gap | `.resume-entry { margin-bottom }` | `1.8mm` |

### Add or Replace Icons

1. 将 SVG 保存到 `public/icons/`
2. 在 `src/components/Icons.tsx` 中添加导出
3. 编辑器预设图标在 `src/components/editor/IconPicker.tsx` 的 `BUILTIN` 数组

## Deployment

### GitHub Pages

推送到 `main` 分支 → GitHub Actions 自动构建并部署。

工作流：`.github/workflows/deploy.yml`
- `BASE_PATH=/CV-Maker/` 环境变量设置 Vite base path
- 构建产物上传为 Pages artifact
- 自动部署到 `github-pages` 环境

### Static Hosting

`dist/` 目录为纯静态文件，可直接部署到任何静态托管服务（Nginx / Vercel / Netlify 等）。
