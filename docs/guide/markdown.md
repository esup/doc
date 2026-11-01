# Markdown 扩展

本页既是语法速查，也是本站渲染效果的自检页。

## 标题锚点

每个标题会自动生成锚点，如 `#自定义容器`。中文标题的锚点会被转成拼音/编码形式，因此**跨页链接锚点容易出错**，建议锚点用英文标题，或直接链到页面而不带 `#`。

## 自定义容器

::: info
纯信息，不带颜色倾向。
:::

::: tip
推荐做法。标题可自定义。
:::

::: warning
需要注意的坑，默认标题是「警告」。
:::

::: danger
会导致严重后果的操作。
:::

::: details
点击展开的折叠块，适合放长配置。
:::

::: raw
容器内部不会再做 Markdown 解析。
:::

## 代码块

行高亮（`{2,4}`）与聚焦（`// [!code focus]`）：

```ts{2,4}
export default defineConfig({
  lang: 'zh-CN',
  base: '/doc/',
  lastUpdated: true,
})
```

```ts
const a = 1
// [!code focus:2]
const b = 2
```

diff 与错误/警告标注：

```ts
export function hello() {
  console.log('world')
}
```

```ts
export function hello() {
  // [!code --]
  const old = true
  // [!code ++]
  const isNew = true
}
```

```ts
export function hello() {
  // [!code error]
  throw new Error('nope')
  // [!code warning]
  console.warn('careful')
}
```

代码组：

:::code-group

```sh [npm]
npm run docs:dev
```

```sh [pnpm]
pnpm docs:dev
```

```sh [yarn]
yarn docs:dev
```

```sh [bun]
bun docs:dev
```
:::

## 表格与 Emoji

| 语法 | 说明 |
| --- | --- |
| `:---:` | 居中对齐 |
| `---:` | 右对齐 |
| 单元格内 `` `code` `` | 正常渲染 |

支持 Emoji 短代码：:rocket: :+1: :white_check_mark:

## 目录表

[[toc]]

## 在 Markdown 里用 Vue

`<script setup>` 和 `<style>` 可以直接写在 `.md` 里，因为 VitePress 会把 `.md` 编译成 Vue SFC：

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<button class="vp-doc-button" @click="count++">已点击 {{ count }} 次</button>

<style>
.vp-doc-button {
  padding: 6px 16px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  cursor: pointer;
}
</style>

也可以导入自定义组件，路径相对 `.md` 文件本身：

```md
<script setup>
import HomeExtra from '../.vitepress/theme/components/HomeExtra.vue'
</script>

<HomeExtra />
```

## 未启用的能力

- **LaTeX 数学公式**：需要 `markdown.math: true` 并额外安装 `markdown-it-mathjax3`，本站当前未开启。
- **文件嵌入**（`<<< @/snippets/foo.js`）：语法可用，但被嵌入的文件必须存在，否则构建报错。

## 相关

- 想调这些渲染效果的样式与配置，见 [本站配置速查](/reference/config#markdown-与构建)
