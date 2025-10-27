import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChatStore = defineStore('chat', () => {
  // 当前会话消息列表
  const messages = ref([])
  
  // 当前会话ID（第一条AI响应的时间戳，新会话无AI响应时为null）
  const currentSessionId = ref(null)
  
  // 历史记录列表（延迟加载）
  const histories = ref([])
  
  // 是否已经添加欢迎消息
  const isWelcomeMessageAdded = ref(false)
  
  // 初始化历史记录
  function initHistories() {
    try {
      histories.value = JSON.parse(localStorage.getItem('chat_histories') || '[]')
      
      // 如果没有任何历史记录，添加欢迎消息
      if (histories.value.length === 0 && messages.value.length === 0) {
        addMessage('assistant', '你好，我是小淘博士。有什么可以帮助你的吗？')
      }else if(isWelcomeMessageAdded.value){
        addMessage('assistant', '你好，我是小淘博士。有什么可以帮助你的吗？')
        isWelcomeMessageAdded.value = false
      }
    } catch (error) {
      console.error('Failed to load chat histories:', error)
      histories.value = []
    }
  }
  
  // 添加消息
  function addMessage(role, content) {
    const timestamp = Date.now()
    messages.value.push({ 
      role, 
      content, 
      timestamp 
    })
    
    // 如果是第一条AI响应，设置当前会话ID
    if (role === 'assistant' && currentSessionId.value === null) {
      currentSessionId.value = timestamp
    }
    
    // 自动保存/更新历史记录
    autoSaveToHistory()
  }
  
  // 自动保存/更新历史记录
  function autoSaveToHistory() {
    if (messages.value.length === 0) return
    
    // 获取用户第一条消息作为标题
    const firstUserMessage = messages.value.find(msg => msg.role === 'user')
    const title = firstUserMessage?.content.slice(0, 30) || '新对话'
    
    // 获取最后一条消息的时间戳
    const lastMessageTime = getLastMessageTime()
    
    const historyData = {
      title,
      messages: [...messages.value],
      timestamp: lastMessageTime
    }
    
    if (currentSessionId.value) {
      // 更新现有会话
      const existingIndex = histories.value.findIndex(h => h.id === currentSessionId.value)
      if (existingIndex !== -1) {
        histories.value[existingIndex] = {
          id: currentSessionId.value,
          ...historyData
        }
      } else {
        // 如果找不到现有会话，创建新的
        histories.value.unshift({
          id: currentSessionId.value,
          ...historyData
        })
      }
    } else {
      // 新会话，暂时不保存（等待AI响应后设置ID）
      return
    }
    
    // 按最后一条消息时间降序排序
    histories.value.sort((a, b) => b.timestamp - a.timestamp)
    syncToLocalStorage()
  }
  
  // 获取最后一条消息的时间戳
  function getLastMessageTime() {
    if (messages.value.length === 0) return Date.now()
    return messages.value[messages.value.length - 1].timestamp
  }
  
  // 保存当前会话到历史记录（保留兼容性）
  function saveToHistory() {
    autoSaveToHistory()
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
      currentSessionId.value = id
    }
  }
  
  // 创建新会话
  function createNewSession() {
    // 如果有消息且没有保存过，先保存当前会话
    if (messages.value.length > 0 && currentSessionId.value === null) {
      // 为新会话分配临时ID
      currentSessionId.value = Date.now()
      autoSaveToHistory()
    }
    
    // 清空当前会话
    messages.value = []
    currentSessionId.value = null
  }
  
  // 清空当前会话（保留兼容性）
  function clearMessages() {
    messages.value = []
    currentSessionId.value = null
  }
  
  // 同步到 localStorage
  function syncToLocalStorage() {
    localStorage.setItem('chat_histories', JSON.stringify(histories.value))
  }
  
  return {
    messages,
    histories,
    currentSessionId,
    addMessage,
    saveToHistory,
    deleteHistory,
    loadHistory,
    clearMessages,
    createNewSession,
    initHistories
  }
})

