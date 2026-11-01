# doc

基于 [VitePress](https://vitepress.dev/zh/) `2.0.0-alpha.21` 的文档站点。

## 快速开始

```bash
node -v          # 需要 >= 22
npm install
npm run docs:dev # http://localhost:5173/doc/
```

> 注意路径里带 `base`（`/doc/`），访问根路径会 404。

## 命令

| 命令 | 作用 |
| --- | --- |
| `npm run docs:dev` | 开发服务器，热更新 |
| `npm run docs:build` | 生产构建，产物在 `docs/.vitepress/dist` |
| `npm run docs:preview` | 本地静态预览产物，默认 4173 端口 |

## 目录

```
docs/
├─ .vitepress/
│  ├─ config.mts        # 站点与主题配置（nav / sidebar / outline / 搜索）
│  └─ theme/            # 扩展默认主题：Layout 插槽 + CSS 变量
├─ public/              # 静态资源
├─ index.md             # 首页（layout: home）
├─ guide/               # 指南
└─ reference/           # 参考
```

新增一页后，记得在 `docs/.vitepress/config.mts` 的 `sidebar` 里补一条，否则该页不会出现在侧边栏。

## 部署

推送到 `main` 后由 `.github/workflows/deploy.yml` 自动发布到 GitHub Pages。首次需在仓库 **Settings → Pages → Source** 选择 **GitHub Actions**，并确认 `config.mts` 中的 `base` 与仓库名一致。

详见 [docs/guide/deploying.md](docs/guide/deploying.md)。
