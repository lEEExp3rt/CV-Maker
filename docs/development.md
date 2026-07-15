# Development Guide

## Environment Setup

### Prerequisites

- **Node.js** >= 20
- **npm** >= 9

```bash
node --version
npm --version
```

### Install & Run

```bash
git clone https://github.com/lEEExp3rt/CV-Maker
cd CV-Maker
npm install
npm run dev        # http://localhost:5173
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | 开发服务器 |
| `npm run build` | TypeScript 检查 + 生产构建到 dist/ |
| `npm run preview` | 本地预览生产构建 |
| `npm run clean` | 清除 dist/、node_modules/、.vite/ |

### Docker

```bash
docker build -t cv-maker -f .devcontainer/Dockerfile .
docker run -p 5173:5173 -v $(pwd)/public:/workspace/public cv-maker dev
docker run -v $(pwd)/dist:/workspace/dist cv-maker build
docker run -it cv-maker bash
```

VSCode 用户：打开项目 → 点击「Reopen in Container」，`.devcontainer/devcontainer.json` 自动配置端口转发和依赖安装。

Dockerfile 基于 `node:22-slim`，安装 `fonts-noto-cjk` 用于中文渲染。

#### Accelerating Docker Image Building in China Mainland

构建镜像时下载 apt 包和 npm 包较慢，两项配置可加速：

1. **npm 镜像** — 取消 `.npmrc` 中的注释：

   ```text
   registry=https://registry.npmmirror.com
   ```

2. **apt 镜像** — 取消 `.devcontainer/Dockerfile` 第 4 行注释：

   ```dockerfile
   RUN sed -i 's/deb.debian.org/mirrors.aliyun.com/g' /etc/apt/sources.list.d/debian.sources
   ```

## Architecture

### Project Structure

```text
src/
├── components/       # React 组件（展示 + 编辑器表单）
│   └── editor/       # 可视化编辑器表单组件
├── hooks/            # useLocalStorage / useProjectManager
├── styles/           # CSS + 主题配置
├── types/            # TypeScript 类型定义
└── data/             # 默认数据
public/
├── icons/            # SVG 图标（Remix Icon）
└── images/           # 用户照片
docs/                 # 项目文档
contents/             # 保留：旧版 YAML 文件
.github/workflows/    # GitHub Pages 自动部署
```

- **components/** — 展示组件（`Resume.tsx` 等）被编辑器和首页 demo 共用；`editor/` 子目录包含每个简历模块的表单编辑器
- **hooks/** — `useLocalStorage` 是通用 localStorage 持久化钩子；`useProjectManager` 在其上实现多项目 CRUD
- **styles/** — `resume.css` 控制简历布局和打印样式；`editor.css` 控制编辑器布局和响应式；`theme.ts` 定义配色方案和排版比例
- **types/** — 简历数据类型（`resume.ts`）和项目管理类型（`project.ts`）

### Key Principles

- **localStorage 持久化** — `useLocalStorage` 封装 `useState` + `localStorage`，每次 `setState` 自动同步，首次渲染从存储恢复
- **多项目管理** — `useProjectManager` 存储 key 为 `cv-maker-projects`，结构 `{ active, projects: [{ id, title, data }] }`；首次加载自动迁移旧版单 key 格式
- **组件复用** — `Resume.tsx` 接收 `data` prop，编辑器和首页 demo 共用同一组件
- **响应式缩放** — `ScalableWrapper` 用 `ResizeObserver` 监测容器宽度，按 A4 宽度等比缩放
- **路由** — `main.tsx` 通过 `window.location.pathname` 分发到 `HomePage` / `EditorApp` / `DocsPage`
- **Markdown 渲染** — `MarkdownPage.tsx` 用逐行 tokenize 解析，支持组合格式嵌套，`?raw` 导入 `.md` 文件
- **导入校验** — `validate.ts` 检查必填字段和类型，`envelope.ts` 处理 JSON 元数据封装与前向兼容
- **匿名模式** — `anonymize.ts` 根据选项对简历数据进行字段替换，预览和导出同时生效
- **拖拽排序** — `DraggableList.tsx` 通用拖拽组件，基于 HTML5 Drag API，支持嵌套列表

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
| Left/right | `.resume-page { padding }` | `20mm` |
| Section gap | `.resume-section { margin-bottom }` | `3mm` |
| Entry gap | `.resume-entry { margin-bottom }` | `1.8mm` |

### Add or Replace Icons

1. 将 SVG 保存到 `public/icons/`
2. 在 `src/components/Icons.tsx` 中添加导出
3. 编辑器预设图标在 `src/components/editor/IconPicker.tsx` 的 `BUILTIN` 数组

## Deployment

### GitHub Pages

推送到 `main` 分支 → GitHub Actions 自动构建并部署。

工作流 `.github/workflows/deploy.yml` 使用 `BASE_PATH=/CV-Maker/` 构建，产物上传为 Pages artifact 并自动发布。

### Static Hosting

`dist/` 目录为纯静态文件，可直接部署到 Nginx / Vercel / Netlify 等任意静态托管服务。
