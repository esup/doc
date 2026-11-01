import { defineConfig } from 'vitepress'

// 站点级配置参考：https://vitepress.dev/zh/reference/site-config
// 默认主题配置参考：https://vitepress.dev/zh/reference/default-theme-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'ESUP 文档',
  description: '由 Vite 和 Vue 驱动的文档站点',

  // 部署在 https://<user>.github.io/<repo>/ 时必须是 '/<repo>/'，且首尾都要带斜杠。
  // 若部署到域名根路径或自定义域名，请改回 '/'。
  base: '/doc/',

  // 基于 git 提交历史生成每页最后更新时间；CI 中需 fetch-depth: 0
  lastUpdated: true,

  // cleanUrls: true, // 去掉 .html 后缀，需要服务器配合（Nginx: try_files $uri $uri.html $uri/ =404）

  markdown: {
    lineNumbers: true,
  },

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'ESUP',

    nav: [
      { text: '指南', link: '/guide/', activeMatch: '/guide/' },
      { text: '参考', link: '/reference/config', activeMatch: '/reference/' },
      {
        text: 'v2 alpha',
        items: [
          { text: '本站文档', link: '/guide/' },
          { text: 'VitePress 官方文档', link: 'https://vitepress.dev/zh/' },
        ],
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '简介',
          collapsed: false,
          items: [
            { text: '什么是本站', link: '/guide/' },
            { text: '快速开始', link: '/guide/getting-started' },
          ],
        },
        {
          text: '写作',
          collapsed: false,
          items: [
            { text: 'Markdown 扩展', link: '/guide/markdown' },
            { text: '部署', link: '/guide/deploying' },
          ],
        },
      ],
      '/reference/': [
        {
          text: '参考',
          items: [{ text: '本站配置速查', link: '/reference/config' }],
        },
      ],
    },

    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一页', next: '下一页' },

    editLink: {
      pattern: 'https://github.com/esup/doc/edit/main/docs/:path',
      text: '在 GitHub 编辑此页',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/esup/doc' }],

    footer: {
      message: '基于 MIT 许可发布',
      copyright: `Copyright © 2026-${new Date().getFullYear()} ESUP`,
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { altText: '搜索', text: '搜索' },
          modal: {
            noResultsText: '无法找到相关结果',
            displayDetails: '显示详细列表',
            resetButtonTitle: '清除查询条件',
            backButtonTitle: '关闭搜索',
            placeholder: '搜索文档',
          },
        },
      },
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: { dateStyle: 'short', timeStyle: 'medium' },
    },

    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    langMenuLabel: '切换语言',
  },
})
