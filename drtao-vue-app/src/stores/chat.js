import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChatStore = defineStore('chat', () => {
  // 当前会话消息列表
  const messages = ref([])
  
  // 历史记录列表（延迟加载）
  const histories = ref([])
  
  // 初始化历史记录
  function initHistories() {
    try {
      histories.value = JSON.parse(localStorage.getItem('chat_histories') || '[]')
    } catch (error) {
      console.error('Failed to load chat histories:', error)
      histories.value = []
    }
  }
  
  // 添加消息
  function addMessage(role, content) {
    messages.value.push({ 
      role, 
      content, 
      timestamp: Date.now() 
    })
  }
  
  // 保存当前会话到历史记录
  function saveToHistory() {
    if (messages.value.length === 0) return
    
    const history = {
      id: Date.now(),
      title: messages.value[0]?.content.slice(0, 30) || '新对话',
      messages: [...messages.value],
      timestamp: Date.now()
    }
    
    histories.value.unshift(history)
    syncToLocalStorage()
  }
  
  // 删除历史记录
  function deleteHistory(id) {
    histories.value = histories.value.filter(h => h.id !== id)
    syncToLocalStorage()
  }
  
  // 加载历史记录
  function loadHistory(id) {
    const history = histories.value.find(h => h.id === id)
    if (history) {
      messages.value = [...history.messages]
    }
  }
  
  // 清空当前会话
  function clearMessages() {
    messages.value = []
  }
  
  // 同步到 localStorage
  function syncToLocalStorage() {
    localStorage.setItem('chat_histories', JSON.stringify(histories.value))
  }
  
  return {
    messages,
    histories,
    addMessage,
    saveToHistory,
    deleteHistory,
    loadHistory,
    clearMessages,
    initHistories
  }
})

