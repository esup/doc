# 本站配置速查

配置集中在 `docs/.vitepress/config.mts`，主题定制在 `docs/.vitepress/theme/`。本页只列本站实际用到的项，完整能力以 [官方参考](https://vitepress.dev/zh/reference/site-config) 为准。

## 站点级

| 选项 | 本站值 | 说明 |
| --- | --- | --- |
| `lang` | `zh-CN` | 影响 `<html lang>` 与部分本地化 |
| `title` | `ESUP 文档` | 浏览器标题与导航栏标题 |
| `description` | — | 渲染成 `<meta name="description">` |
| `base` | `/doc/` | **子路径部署必设，首尾都要带 `/`** |
| `lastUpdated` | `true` | 由 git 提交历史生成 |
| `cleanUrls` | 注释关闭 | 需要服务器端 URL 重写配合 |
| `ignoreDeadLinks` | 未设 | 死链默认让构建失败 |

## 默认主题

| 选项 | 说明 |
| --- | --- |
| `nav` | 顶部导航；`activeMatch` 控制高亮，`items` 生成下拉 |
| `sidebar` | 对象形式按路径前缀分组（`/guide/`、`/reference/`） |
| `sidebar[].collapsed` | 不填=不可折叠；`true`=可折叠且默认收起；`false`=可折叠但默认展开 |
| `outline` | 右侧大纲级别，本站 `[2, 3]`，`label: '本页目录'` |
| `aside` | 右侧栏整体开关，也可 `'left'` |
| `docFooter` | 上/下页按钮文案 |
| `editLink.pattern` | `:path` 会被替换成页面相对路径 |
| `search.provider` | `local`（内置 MiniSearch，无需 Algolia）或 `algolia` |
| `footer` | ⚠️ **只在没有侧边栏的页面显示**，所以它只在首页可见 |
| `socialLinks` | 导航栏社交图标 |
| `darkModeSwitchLabel` 等 | 一系列界面文案的汉化项 |

## 主题与 CSS

本站走的是「扩展默认主题」而不是「替换默认主题」：

```
theme/index.ts        extends DefaultTheme + 覆盖 Layout
theme/Layout.vue      通过 #home-features-after 插槽注入组件
theme/custom.css      覆盖 --vp-c-brand-* / --vp-font-family-*
theme/components/     自定义 Vue 组件
```

::: warning theme/index.ts 一旦出现就接管主题
即使你只写了一行 `export default DefaultTheme`，也请保持从 `vitepress/theme` 导入的是默认主题本体，否则整站样式会变成你自己的 Layout。
:::

可注入的常用插槽：`doc-top` `doc-bottom` `doc-before` `doc-after` `aside-outline-before` `aside-outline-after` `layout-top` `layout-bottom` `nav-bar-title-after` `home-features-after` `not-found`。

## Markdown 与构建

```ts
markdown: {
  lineNumbers: true,   // 代码块显示行号
}
```

还可以在这里透传原始配置：`markdown` 接受 markdown-it 与 Shiki 的选项，`vite` 接受原生 Vite 配置，`vue` 接受 `@vitejs/plugin-vue` 选项。构建钩子有 `buildEnd` `postRender` `transformHead` `transformHtml` `transformPageData`，本站用 `transformHead` 的场景是给自托管字体加 preload。

## frontmatter 可用选项

写在各页 YAML 头里，可覆盖站点级/主题级配置：

| 选项 | 类型 / 默认 | 用途 |
| --- | --- | --- |
| `layout` | `doc`（默认）/ `home` / `page` / `false` | `page` 无默认样式但仍会显示侧边栏；`false` 完全无布局 |
| `title` / `titleTemplate` / `description` | — | 覆盖站点级同名项 |
| `head` | `HeadConfig[]` | 追加在站点级 `head` **之后** |
| `navbar` / `sidebar` / `footer` | `true` | 单页开关导航栏、侧边栏、页脚 |
| `aside` | `true` | `false` 关大纲，`'left'` 换到左侧 |
| `outline` | `2` | 覆盖 `themeConfig.outline.level` |
| `editLink` / `lastUpdated` | `true` | 单页开关 |
| `pageClass` | — | 配合 `theme/custom.css` 写单页样式 |
| `hero` / `features` | — | 仅 `layout: home` 生效 |

::: tip layout 还能写组件名
`layout: foo` 会渲染全局注册名为 `foo` 的组件。做法是在 `theme/index.ts` 的 `enhanceApp({ app })` 里 `app.component('foo', Foo)`，这就是「自定义布局」的实现路径。
:::

## 运行时 API

在 `.md` 里和主题组件里都可用（`use*` 系列只能在 `<script setup>` 中调用）：

```vue
<script setup>
import { useData, useRouter, withBase } from 'vitepress'
const { page, frontmatter, theme, isDark } = useData()
const router = useRouter()
</script>

<template>
  <p>{{ page.relativePath }} — {{ theme.siteTitle }}</p>
  <img :src="withBase('/logo.svg')" />
  <ClientOnly>
    <OnlyOnBrowser />
  </ClientOnly>
</template>
```

`useData()` 返回的字段全部是 `Ref`；`useRouter()` 提供 `go()` 以及 `onBeforeRouteChange` / `onAfterRouteChange` 等钩子，前两个钩子返回 `false` 可取消导航。
