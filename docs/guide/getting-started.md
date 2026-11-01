# 快速开始

## 前置要求

- **Node.js 22 及以上**（VitePress 2.0 alpha 的硬性要求）
- 一个支持 Markdown 的编辑器
- 一个终端

```sh
node -v   # 需要 >= 22
```

## 安装

依赖已经装好，`package.json` 里的 `devDependencies` 包含 `vitepress` 与 `vue`。重新安装或换机器时执行：

```sh
npm install
```

::: warning 为什么需要 `"type": "module"`
VitePress 是**仅 ESM 包**。本仓库 `package.json` 已设置 `"type": "module"`，因此配置文件可以直接叫 `config.mts`。如果去掉这个字段，`.js` / `.ts` 会被 Node 按 CommonJS 解析而报错，此时得改用 `.mjs` / `.mts` 后缀。
:::

## 本地开发

:::code-group

```sh [npm]
npm run docs:dev
```

```sh [pnpm]
pnpm docs:dev
```
:::

启动后访问 `http://localhost:5173/doc/` —— 注意路径带着 `base`，直接开根路径会 404。

## 构建与预览

```sh
npm run docs:build     # 产物在 docs/.vitepress/dist
npm run docs:preview   # 本地静态服务器预览产物，默认 4173 端口
```

## 新增一页

1. 在 `docs/` 下建 `.md` 文件，例如 `docs/guide/foo.md`
2. 在 `docs/.vitepress/config.mts` 的 `sidebar` 对应分组里加一条 `{ text: 'Foo', link: '/guide/foo' }`
3. 若希望从顶部导航也能进，往 `nav` 里补一项

::: tip 死链会让构建失败
`npm run docs:build` 会检查内部链接是否指向存在的页面。写错链接直接报错中断，此时可临时用 `ignoreDeadLinks` 放行，但不建议长期开着。
:::

## 常用页面级 frontmatter

```md
---
title: 页面标题
description: 覆盖站点级 description
layout: doc        # doc | home | page | false
aside: false       # 关掉右侧大纲
editLink: false    # 关掉本页「在 GitHub 编辑此页」
lastUpdated: false
pageClass: custom-home
---
```

完整清单见 [本站配置速查](/reference/config#frontmatter-可用选项)。
