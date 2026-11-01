# 部署

构建产物在 `docs/.vitepress/dist`，是纯静态文件，任何静态托管都能跑。本仓库已内置 GitHub Pages 的工作流。

## GitHub Pages（已配好）

`.github/workflows/deploy.yml` 会在推送到 `main` 时自动构建并发布。首次需要手动做两件事：

1. 仓库 **Settings → Pages → Build and deployment → Source** 选 **GitHub Actions**
2. 确认 `config.mts` 里的 `base` 与仓库名一致（部署到 `esup.github.io/doc/` 就是 `/doc/`）

::: warning fetch-depth: 0 不能随手删
本站开启了 `lastUpdated`，它靠 git 提交历史计算时间戳。改成浅克隆后每个页面的「最后更新于」会消失或报错。
:::

`deploy` job 的 `environment.name` 必须是 `github-pages`，且部署 step 要有 `id: deployment`，否则 `environment.url` 里引用的 `page_url` 输出取不到值。

::: warning Markdown 里写 Action 表达式会炸
行内代码（单个反引号）**不会**转义 Vue 的 `{{ }}` 插值语法，所以把 GitHub Actions 的表达式直接塞进行内代码里，会被当成真表达式去求值，构建时报 `Cannot read properties of undefined`。需要展示这类语法时，请用围栏代码块，或改写成不带花括号的描述。
:::

## 其他平台参数速查

| 平台 | 构建命令 | 输出目录 |
| --- | --- | --- |
| Netlify / Vercel / Cloudflare Pages / Render | `npm run docs:build` | `docs/.vitepress/dist` |
| GitLab Pages | `npm install && npm run docs:build` | 需把 `outDir` 设为 `../public`，产物目录写 `public` |
| Firebase Hosting | 同上 | `hosting.public` 指向 `docs/.vitepress/dist`，并把 `"ignore": []` 配上 |
| Surge | 同上 | `npx surge docs/.vitepress/dist` |

::: danger 不要开 Auto Minify
Netlify / Vercel 等平台的「自动压缩 HTML」会删掉对 Vue 有意义的注释，导致 hydration 不匹配报错。请在控制台里关掉它。
:::

## 自建 Nginx

```nginx
server {
  gzip on;
  gzip_disable "msie6";
  gzip_min_length 1100;
  gzip_comp_level 6;
  gzip_types text/plain text/css application/javascript application/json image/svg+xml;

  root /var/www/doc/dist;

  # 关键：不能 fallback 到 index.html，VitePress 不是普通 SPA
  location / {
    try_files $uri $uri.html $uri/ =404;
    error_page 404 /404.html;
    error_page 403 /404.html;
  }

  # 静态资源带内容哈希，可以激进缓存
  location ~* ^/doc/assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

::: warning 不要默认为 index.html
`try_files` 不能像其他 Vue 应用那样兜底到 `index.html`，否则页面状态会处于无效。
:::

## cleanUrls 的前提

想让 URL 去掉 `.html`，需要同时满足：配置里 `cleanUrls: true`，且服务器能把 `/foo` 解析到 `/foo.html`。GitHub Pages 不保证这一点，所以本站默认注释掉了 `cleanUrls`。

## 部署前自检

```sh
npm run docs:build && npm run docs:preview
```

`docs:preview` 会按 `base` 提供静态服务，默认端口 4173，访问 `http://localhost:4173/doc/`。
