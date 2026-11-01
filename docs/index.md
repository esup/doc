---
layout: home

hero:
  name: ESUP 文档
  text: 用 Markdown 写，由 Vite 构建
  tagline: VitePress 2.0 alpha 驱动的静态文档站点
  image:
    src: /logo.svg
    alt: ESUP
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 什么是本站
      link: /guide/
    - theme: alt
      text: 在 GitHub 查看
      link: https://github.com/esup/doc

features:
  - icon: ⚡️
    title: 专注内容
    details: 只需 Markdown 即可创建文档站点，页面即文件，路由由目录结构推导。
  - icon: 🖖
    title: Vue 可定制
    details: Markdown 里可直接写 Vue 组件，也可通过布局插槽扩展默认主题。
  - icon: 🔍
    title: 内置本地搜索
    details: themeConfig.search.provider 设为 local，无需 Algolia 账号即可获得全文搜索。
  - icon: 🚀
    title: 一键部署
    details: 附带 GitHub Actions 工作流，产物输出到 docs/.vitepress/dist。
---
