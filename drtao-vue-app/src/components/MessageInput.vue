<template>
  <div class="composer">
    <input
      v-model="inputText"
      class="input"
      placeholder="和小淘博士聊聊科学吧… 回车发送"
      @keydown.enter="sendMessage"
    />
    <button class="btn" @click="sendMessage" :disabled="loading">
      {{ loading ? '思考中...' : '发送' }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useChatStore } from '@/stores/chat'
import { useLLMApi } from '@/composables/useLLMApi'
import { useKnowledgeBase } from '@/composables/useKnowledgeBase'
import { useSpeechStore } from '@/stores/speech'

const chatStore = useChatStore()
const { callLLMStream } = useLLMApi()
const { localAnswer } = useKnowledgeBase()
const speechStore = useSpeechStore()

const inputText = ref('')
const loading = ref(false)

async function sendMessage() {
  const text = inputText.value.trim()
  if (!text || loading.value) return

  // 添加用户消息
  chatStore.addMessage('user', text)
  inputText.value = ''
  loading.value = true

  try {
    // 添加空的 AI 消息（用于实时追加，但不自动保存历史）
    const aiMessageIndex = chatStore.messages.length
    chatStore.addMessage('assistant', '', false)

    // 调用 LLM API 或本地知识库
    const useApi = chatStore.messages.length > 1 // 简化判断
    
    if (useApi) {
      // 获取历史消息（排除当前用户消息和即将添加的AI消息）
      const historyMessages = chatStore.messages.slice(0, -1) // 排除刚添加的用户消息
      
      // 流式调用 API
      await callLLMStream(text, (chunk) => {
        chatStore.messages[aiMessageIndex].content += chunk
      }, historyMessages)
    } else {
      // 本地知识库
      const answer = localAnswer(text)
      chatStore.messages[aiMessageIndex].content = answer
    }

    // AI 响应完成后，保存历史会话
    chatStore.saveToHistory()

    // 语音朗读
    if (speechStore.enabled) {
      speechStore.speak(chatStore.messages[aiMessageIndex].content)
    }
  } catch (error) {
    console.error('发送消息失败:', error)
    const lastIndex = chatStore.messages.length - 1
    chatStore.messages[lastIndex].content = '❌ 请求失败：' + error.message
    // 即使失败也要保存历史
    chatStore.saveToHistory()
  } finally {
    loading.value = false
  }
}
</script>

