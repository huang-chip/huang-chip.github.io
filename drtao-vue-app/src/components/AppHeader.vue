<template>
  <header class="header">
    <div class="brand">
      <div class="sunflower" aria-hidden="true">
        <img src="/ui1.jpg" alt="logo" />
      </div>
      <h1>小淘博士 · 知识科普</h1>
    </div>
    <div class="header-actions">
      <button class="btn secondary" @click="clearChat">清空对话</button>
    </div>
  </header>
</template>

<script setup>
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()

function clearChat() {
  if (confirm('确认清空当前对话？')) {
    chatStore.clearMessages()
  }
}
</script>

