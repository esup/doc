# 什么是本站

这是一套用 [VitePress](https://vitepress.dev/zh/) 搭建的文档站点，仓库为 [`esup/doc`](https://github.com/esup/doc)。

## 它是怎么工作的

VitePress 把 `docs/` 目录下的每个 `.md` 文件编译成同路径的 `.html`，即**基于文件的路由**：

| 文件 | 访问路径 |
| --- | --- |
| `docs/index.md` | `/doc/` |
| `docs/guide/getting-started.md` | `/doc/guide/getting-started.html` |
| `docs/reference/config.md` | `/doc/reference/config.html` |

导航栏、侧边栏、页面大纲都不靠约定，而是在 `docs/.vitepress/config.mts` 里显式声明，所以新增一页需要同步改侧边栏。

## 目录结构

```
.
├─ .github/workflows/deploy.yml   # GitHub Pages 自动部署
├─ docs/
│  ├─ .vitepress/
│  │  ├─ config.mts               # 站点与主题配置
│  │  ├─ theme/
│  │  │  ├─ index.ts              # 主题入口（扩展默认主题）
│  │  │  ├─ Layout.vue            # 注入插槽的布局包装组件
│  │  │  ├─ custom.css            # 覆盖 CSS 变量
│  │  │  └─ components/           # 自定义组件
│  │  ├─ dist/                    # 构建产物（已 gitignore）
│  │  └─ cache/                   # 开发缓存（已 gitignore）
│  ├─ public/                     # 静态资源，原样拷贝到产物根
│  ├─ index.md                    # 首页
│  ├─ guide/
│  └─ reference/
└─ package.json
```

## 下一步

- 本地跑起来看效果：[快速开始](/guide/getting-started)
- 了解可用的 Markdown 语法：[Markdown 扩展](/guide/markdown)
- 推到线上：[部署](/guide/deploying)
- 想改配置：[本站配置速查](/reference/config)
