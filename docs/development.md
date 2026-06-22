# 开发指南

## 架构总览

CV-Maker 是一个单页 React 应用，包含两个路由：

| 路由 | 组件 | 说明 |
|------|------|------|
| `/` | `HomePage` | 首页：项目介绍、功能卡片、示例简历 |
| `/editor` | `EditorApp` | 可视化编辑器：侧边栏 + 表单 + 实时预览 |

### 数据流（编辑器）

```
useLocalStorage（localStorage 持久化）
  └─► useProjectManager（多项目增删改查）
       └─► EditorApp（状态管理 + 表单调度）
            ├─► ProjectSidebar（项目切换）
            ├─► 编辑器表单（PersonalInfo / Education / ...）
            └─► Resume（预览，与首页 demo 共用）
```

### 关键文件

| 路径 | 用途 |
|------|------|
| `src/EditorApp.tsx` | 编辑器主布局：侧边栏 + 表单面板 + 预览 |
| `src/HomePage.tsx` | 首页 |
| `src/DemoPage.tsx` | 示例简历数据（导出常量供首页引用） |
| `src/Resume.tsx` | 简历渲染组件（编辑器和首页共用） |
| `src/components/Layout.tsx` | 顶部导航栏 |
| `src/components/editor/*.tsx` | 每个简历模块一个表单组件 |
| `src/components/editor/ProjectSidebar.tsx` | 项目列表侧边栏（可拖拽调整宽度） |
| `src/components/editor/Modal.tsx` | 确认/导入/导出弹窗 |
| `src/components/editor/IconPicker.tsx` | 图标选择器（预设 + URL + 上传） |
| `src/components/ScalableWrapper.tsx` | 响应式简历缩放容器 |
| `src/components/HeaderLeft.tsx` | 标题行内 meta 布局（带换行检测） |
| `src/components/MarkdownText.tsx` | 行内 Markdown 渲染 |
| `src/components/Icons.tsx` | 内置图标组件 |
| `src/hooks/useLocalStorage.ts` | 通用 localStorage 钩子 |
| `src/hooks/useProjectManager.ts` | 多项目增删改查逻辑 |
| `src/styles/resume.css` | 简历布局、打印样式、间距 |
| `src/styles/editor.css` | 编辑器布局、表单、侧边栏、响应式 |
| `src/styles/theme.ts` | 配色方案、排版比例 |
| `src/types/resume.ts` | TypeScript 接口定义 |
| `src/types/project.ts` | 项目管理类型定义 |

## 开发环境

```bash
npm install
npm run dev        # 开发服务器 http://localhost:5173
npm run build      # 生产构建到 dist/
npm run clean      # 清除 dist/、node_modules/、.vite/
```

## 操作指南

### 新增配色方案

1. 在 `src/styles/theme.ts` 的 `colorSchemes` 中添加定义
2. 在 `src/types/resume.ts` 的 `ColorScheme` 类型中添加名称
3. 在 `src/EditorApp.tsx` 设置栏中添加 `<option>`

### 新增简历模块

1. 在 `src/types/resume.ts` 中定义类型
2. 在 `src/components/editor/` 中创建表单组件
3. 创建展示组件（或复用 `HeaderLeft` 和共享 CSS 类）
4. 在 `src/Resume.tsx` 中注册展示组件，在 `src/EditorApp.tsx` 中注册表单和选项卡

### 添加或替换图标

1. 将 SVG 保存到 `public/icons/`
2. 在 `src/components/Icons.tsx` 中添加导出
3. 编辑器图标选择器的预设项在 `src/components/editor/IconPicker.tsx` 的 `BUILTIN` 数组中

### 理解项目管理

`useProjectManager`（`src/hooks/useProjectManager.ts`）：
- 所有项目存储在 `cv-maker-projects` localStorage key 下
- 提供增删改查：`createProject`、`duplicateProject`、`deleteProject`、`renameProject`
- 首次加载时自动迁移旧的 `cv-maker-data` 数据
- 每个项目包含：`id`、`title`、`createdAt`、`updatedAt`、`data`

### 修改简历布局

- **间距**：`src/styles/resume.css`，所有值使用 `mm` 单位
- **排版**：`src/styles/theme.ts` 的 `typography` 对象
- **打印/PDF**：`resume.css` 和 `editor.css` 中的 `@media print`

## GitHub Pages

推送到 `main` 分支 → GitHub Actions 使用 `BASE_PATH=/CV-Maker/` 构建 → 部署到 Pages。工作流配置位于 `.github/workflows/deploy.yml`。
