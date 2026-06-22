# CV-Maker

面向中国高校学生的互联网技术岗校招与实习求职简历制作工具。基于 React + TypeScript + Vite 构建，提供可视化编辑器、实时预览和浏览器端 PDF 导出。

## Features

- **可视化编辑器** — 表单填写 + 实时预览，无需编写代码或 YAML
- **多项目管理** — 侧边栏创建、切换、复制、删除简历项目
- **浏览器 PDF 导出** — 打印 → 另存为 PDF，A4 格式
- **本地存储** — 数据全部保存在浏览器 localStorage，不上传服务器
- **6 套配色** — 深蓝(navy) / 石板灰(slate) / 森林绿(forest) / 勃艮第红(burgundy) / 青墨(teal) / 炭黑(charcoal)
- **中英双语** — 章节标题支持中文 / English 切换
- **图标系统** — 内置 Lucide 图标 + 自定义上传
- **Markdown** — 经历描述支持粗体、斜体、下划线、行内代码
- **响应式** — 桌面端和移动端均可使用

## Quick Start

```bash
npm install
npm run dev           # http://localhost:5173
```

首页（`/`）展示项目介绍和示例简历。点击「编辑器」或访问 `/editor` 开始制作。点击「打印 PDF」导出。

```bash
npm run build         # 生产构建到 dist/
npm run clean         # 清除构建缓存
```

## 项目结构

```
CV-Maker/
├── src/
│   ├── components/        # React 组件
│   │   └── editor/        # 可视化编辑器表单
│   ├── hooks/             # useLocalStorage / useProjectManager
│   ├── styles/            # CSS + 主题
│   ├── types/             # TypeScript 类型定义
│   └── data/              # 默认数据
├── public/
│   ├── icons/             # SVG 图标（Lucide）
│   └── images/            # 用户照片、favicon
├── docs/
│   ├── usage.md           # 使用指南
│   └── development.md     # 开发指南
├── .github/workflows/     # GitHub Pages 自动部署
└── package.json
```

## 页面路由

| 路由 | 说明 |
|------|------|
| `/` | 首页：项目介绍、功能卡片、示例简历 |
| `/editor` | 可视化编辑器：侧边栏 + 表单 + 实时预览 |

## 文档

- [使用指南](docs/usage.md) — 环境搭建、编辑、导出、项目管理
- [开发指南](docs/development.md) — 架构、自定义、二次开发

## License

[MIT License](./LICENSE)
