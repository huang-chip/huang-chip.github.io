<template>
  <div 
    ref="chatContainer" 
    id="chat" 
    class="chat" 
    aria-live="polite" 
    aria-label="聊天内容"
    @scroll="handleUserScroll"
  >
    <ChatBubble
      v-for="(message, index) in chatStore.messages"
      :key="index"
      :message="message"
      :is-user="message.role === 'user'"
    />
  </div>
</template>

<script setup>
import { onMounted, nextTick, watch, ref } from 'vue'
import { useChatStore } from '@/stores/chat'
import ChatBubble from './ChatBubble.vue'

const chatStore = useChatStore()
const chatContainer = ref(null)

// 用户滚动状态管理
const isUserScrolling = ref(false)
const scrollTimeout = ref(null)
const shouldAutoScroll = ref(true)

// 检查是否在底部
function isAtBottom() {
  if (!chatContainer.value) return false
  const { scrollTop, scrollHeight, clientHeight } = chatContainer.value
  return scrollHeight - scrollTop - clientHeight < 10 // 10px 容差
}

// 自动滚动到底部
function scrollToBottom() {
  if (!chatContainer.value) return
  nextTick(() => {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  })
}

// 处理用户滚动事件
function handleUserScroll() {
  // 用户开始滚动
  isUserScrolling.value = true
  shouldAutoScroll.value = isAtBottom()
  
  // 清除之前的定时器
  if (scrollTimeout.value) {
    clearTimeout(scrollTimeout.value)
  }
  
  // 设置定时器，在用户停止滚动后重置状态
  scrollTimeout.value = setTimeout(() => {
    isUserScrolling.value = false
    // 如果用户在底部，恢复自动滚动
    if (isAtBottom()) {
      shouldAutoScroll.value = true
    }
  }, 2000) // 2秒后认为用户停止滚动
}

// 处理新消息
function handleNewMessage() {
  if (!isUserScrolling.value && shouldAutoScroll.value) {
    scrollToBottom()
  }
}

// 监听消息数量变化
watch(() => chatStore.messages.length, () => {
  handleNewMessage()
})

// 监听消息内容变化（用于流式输出）
watch(() => chatStore.messages, () => {
  handleNewMessage()
}, { deep: true })

onMounted(() => {
  // 只有在没有任何历史记录且当前消息为空时才添加欢迎消息
  if (chatStore.messages.length === 0 && chatStore.histories.length === 0) {
    chatStore.addMessage('assistant', '你好，我是小淘博士。有什么可以帮助你的吗？')
  }
})
</script>

