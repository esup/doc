import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import './custom.css'

// 这里是「扩展默认主题」而非「完全自定义主题」：
// extends 会先调用 DefaultTheme 的 enhanceApp，Layout 用带插槽的包装组件覆盖。
export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    // 需要全局注册组件时在此处：
    // app.component('MyGlobalComponent', MyGlobalComponent)
  },
} satisfies Theme
