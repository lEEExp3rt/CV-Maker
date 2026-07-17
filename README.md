# CV-Maker

面向中国高校学生的互联网技术岗校招与实习求职简历制作工具。基于 React + TypeScript + Vite 构建，提供可视化编辑器、实时预览和浏览器端 PDF 导出。

## Features

- **可视化编辑器** — 表单填写 + 实时预览，无需编写代码
- **多项目管理** — 侧边栏创建、切换、复制、删除简历项目
- **浏览器 PDF 导出** — 打印 → 另存为 PDF，A4 格式
- **本地存储** — 数据全部保存在浏览器 localStorage，不上传服务器
- **6 套配色** — 深蓝(navy) / 石板灰(slate) / 森林绿(forest) / 勃艮第红(burgundy) / 青墨(teal) / 炭黑(charcoal)
- **中英双语** — 章节标题支持中文 / English 切换
- **图标系统** — 内置 Remix Icon 图标 + 自定义上传
- **Markdown** — 经历描述支持粗体、斜体、下划线、行内代码，可组合嵌套
- **拖拽排序** — 所有列表条目支持拖拽改变顺序
- **匿名模式** — 一键隐藏姓名、联系方式、学校、公司等隐私信息
- **导入校验** — JSON 导入自动检测格式错误和字段缺失
- **响应式** — 桌面端和移动端均可使用

## Quick Start

```bash
npm install
npm run dev           # http://localhost:5173
```

首页（`/`）展示项目介绍和示例简历。点击「编辑器」或访问 `/editor` 开始制作。点击「打印 PDF」导出。

## Pages

| Route | Description |
|-------|-------------|
| `/` | 首页：项目介绍、功能卡片、示例简历 |
| `/editor` | 可视化编辑器：侧边栏 + 表单 + 实时预览 |

## Documentation

- [使用指南](docs/usage.md) — 编辑器功能、表单填写、导入导出
- [开发指南](docs/development.md) — 架构、环境搭建、二次开发、部署

## Contributing

有问题或建议？欢迎提交 [Issue](https://github.com/lEEExp3rt/CV-Maker/issues) 或 [Pull Request](https://github.com/lEEExp3rt/CV-Maker/pulls)。

## License

[MIT License](./LICENSE)
