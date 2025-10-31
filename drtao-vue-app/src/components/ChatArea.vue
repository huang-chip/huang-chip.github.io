<template>
  <div 
    ref="chatContainer" 
    id="chat" 
    class="chat" 
    aria-live="polite" 
    aria-label="聊天内容"
    @scroll="handleUserScroll"
  >
  <SubjectBar/>
  <ChatBubble
    v-for="(message, index) in chatStore.messages"
    :key="index"
    :message="message"
    :is-user="message.role === 'user'"
  />
  </div>
</template>

<script setup>
import { onMounted, nextTick, watch, ref, TrackOpTypes } from 'vue'
import { useChatStore } from '@/stores/chat'
import ChatBubble from './ChatBubble.vue'
import SubjectBar from './SubjectBar.vue'

const chatStore = useChatStore()
const chatContainer = ref(null)

// 简化的滚动状态管理
const isUserScrolling = ref(false)
const scrollTimeout = ref(null)

// 检查是否在底部
function isAtBottom() {
  if (!chatContainer.value) return false
  const { scrollTop, scrollHeight, clientHeight } = chatContainer.value
  return scrollHeight - scrollTop - clientHeight < 20 // 20px 容差
}

// 平滑滚动到底部
function scrollToBottom() {
  if (!chatContainer.value) return
  
  requestAnimationFrame(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTo({
        top: chatContainer.value.scrollHeight,
        behavior: 'smooth'
      })
    }
  })
}

// 处理用户滚动事件
function handleUserScroll() {
  isUserScrolling.value = true
  
  // 清除之前的定时器
  if (scrollTimeout.value) {
    clearTimeout(scrollTimeout.value)
  }
  
  // 500ms后认为用户停止滚动
  scrollTimeout.value = setTimeout(() => {
    isUserScrolling.value = false
  }, 500)
}

// 处理新消息滚动
function handleNewMessage() {
  // 如果用户没有在滚动，或者用户在底部，则自动滚动
  if (!isUserScrolling.value || isAtBottom()) {
    scrollToBottom()
  }
}

// 强制滚动到底部（用于用户发送新消息时）
function forceScrollToBottom() {
  // 清空用户滚动状态
  isUserScrolling.value = false
  if (scrollTimeout.value) {
    clearTimeout(scrollTimeout.value)
    scrollTimeout.value = null
  }
  
  // 强制滚动到底部
  scrollToBottom()
}

// 监听消息数量变化（新消息添加）
watch(() => chatStore.messages.length, (newLength, oldLength) => {
  nextTick(() => {
    // 如果有新消息且最后一条是用户消息，强制滚动
    if (newLength > oldLength && chatStore.messages[newLength - 1]?.role === 'user') {
      forceScrollToBottom()
    } else {
      handleNewMessage()
    }
  })
  // console.log('消息数量变化,newLength', newLength, 'oldLength', oldLength)
})

// 监听消息内容变化（流式输出）
watch(() => chatStore.messages, () => {
  nextTick(() => {
    handleNewMessage()
  })
  // console.log('消息内容变化')
}, { deep: true })

onMounted(() => {
  // 组件挂载时不需要添加欢迎消息，由store统一管理
})
</script>

