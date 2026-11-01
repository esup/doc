<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import HomeExtra from './components/HomeExtra.vue'

// 取默认主题的 Layout 组件，往里注入插槽
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <!-- 完整插槽清单见 https://vitepress.dev/zh/guide/extending-default-theme#%E5%B8%83%E5%B1%80%E6%8F%92%E6%A7%BD -->
    <template #home-features-after>
      <HomeExtra />
    </template>
  </Layout>
</template>
