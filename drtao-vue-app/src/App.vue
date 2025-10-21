<template>
  <div class="app">
    <AppHeader />
    <section class="doc" role="main">
      <SidebarPanel />
      <div class="main">
        <ChatArea />
        <MessageInput />
      </div>
    </section>
    <!-- <div class="footer">© 2025 小淘博士 · 基于 Vue 3 + Vite 构建</div> -->
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import AppHeader from './components/AppHeader.vue'
import SidebarPanel from './components/SidebarPanel.vue'
import ChatArea from './components/ChatArea.vue'
import MessageInput from './components/MessageInput.vue'
import { useConfigStore } from './stores/config'

const configStore = useConfigStore()

// 初始化移动端检测
onMounted(() => {
  configStore.initMobileDetection()
})
</script>

