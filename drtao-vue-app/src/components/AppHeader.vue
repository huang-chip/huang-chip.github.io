<template>
  <header class="header">
    <div class="brand">
      <div class="sunflower" aria-hidden="true">
        <img src="/ui1.jpg" alt="logo" />
      </div>
      <h1 v-if="!configStore.isMobile">小淘博士 · 知识科普</h1>
      <h1 v-else>小淘博士</h1>
    </div>
    <div class="header-actions">
      <!-- 移动端设置按钮 -->
      <button 
        v-if="configStore.isMobile" 
        class="btn secondary mobile-settings-btn" 
        @click="configStore.toggleSidebar"
        aria-controls="sidebar"
        :aria-expanded="configStore.sidebarOpen"
      >
        设置
      </button>
      <button class="btn secondary" @click="createNewSession">新增会话</button>
    </div>
  </header>
</template>

<script setup>
import { useChatStore } from '@/stores/chat'
import { useConfigStore } from '@/stores/config'

const chatStore = useChatStore()
const configStore = useConfigStore()

function createNewSession() {
  if (chatStore.messages.length > 0 && confirm('确认创建新会话？当前会话将自动保存到历史记录。')) {
    chatStore.createNewSession()
  } else if (chatStore.messages.length === 0) {
    chatStore.createNewSession()
  }
}
</script>

