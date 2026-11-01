<script setup lang="ts">
import { withBase } from 'vitepress'

// 首页 features 下方的补充区块。注意保持 SSR 兼容：
// 任何 DOM / window 访问都必须放到 onMounted 里，或用 <ClientOnly> 包裹。
// withBase 会自动拼上配置里的 base，改 base 时不必再动这里。
// 注意：手写路径必须带 .html 后缀 —— 基于文件的路由会把 getting-started.md
// 编译成 getting-started.html，而去掉后缀需要服务器端配合（cleanUrls），
// GitHub Pages 上不保证，缺后缀会直接 404。
const startLink = withBase('/guide/getting-started.html')
</script>

<template>
  <div class="home-extra">
    <p>
      这个区块由 <code>docs/.vitepress/theme/Layout.vue</code> 通过
      <code>#home-features-after</code> 插槽注入，改它就能替换成你自己的内容。
    </p>
    <a class="home-extra__link" :href="startLink">开始写文档 →</a>
  </div>
</template>

<style scoped>
.home-extra {
  padding: 0 48px 48px;
  text-align: center;
  max-width: 1152px;
  margin: 0 auto;
}

.home-extra p {
  margin: 0 0 16px;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.home-extra__link {
  display: inline-block;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-contrast, #fff);
  background-color: var(--vp-c-brand-1);
  transition: background-color 0.25s;
}

.home-extra__link:hover {
  background-color: var(--vp-c-brand-2);
}

@media (max-width: 768px) {
  .home-extra {
    padding: 0 24px 32px;
  }
}
</style>
