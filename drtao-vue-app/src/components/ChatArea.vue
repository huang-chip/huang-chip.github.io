<template>
  <div id="chat" class="chat" aria-live="polite" aria-label="聊天内容">
    <ChatBubble
      v-for="(message, index) in chatStore.messages"
      :key="index"
      :message="message"
      :is-user="message.role === 'user'"
    />
  </div>
</template>

<script setup>
import { onMounted, nextTick, watch } from 'vue'
import { useChatStore } from '@/stores/chat'
import ChatBubble from './ChatBubble.vue'

const chatStore = useChatStore()

// 自动滚动到底部
function scrollToBottom() {
  nextTick(() => {
    const chatEl = document.getElementById('chat')
    if (chatEl) {
      chatEl.scrollTop = chatEl.scrollHeight
    }
  })
}

// 监听消息变化，自动滚动
watch(() => chatStore.messages.length, () => {
  scrollToBottom()
})

onMounted(() => {
  // 添加欢迎消息
  if (chatStore.messages.length === 0) {
    chatStore.addMessage('assistant', '你好，我是小淘博士。有什么可以帮助你的吗？')
  }
})
</script>

