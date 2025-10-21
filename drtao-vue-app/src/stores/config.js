import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfigStore = defineStore('config', () => {
  // 从环境变量读取默认值
  const apiBase = ref(
    localStorage.getItem('api_base') || 
    import.meta.env.VITE_API_BASE || 
    ''
  )
  
  const apiKey = ref(localStorage.getItem('api_key') || '')
  
  const apiModel = ref(
    localStorage.getItem('api_model') || 
    import.meta.env.VITE_DEFAULT_MODEL || 
    'deepseek-chat'
  )
  
  const apiReachable = ref(false)
  
  function saveConfig() {
    localStorage.setItem('api_base', apiBase.value)
    localStorage.setItem('api_key', apiKey.value)
    localStorage.setItem('api_model', apiModel.value)
    
    // 简单判断是否配置完整
    apiReachable.value = !!(apiBase.value && apiKey.value && apiModel.value)
  }
  
  // 初始化时检查配置
  if (apiBase.value && apiKey.value && apiModel.value) {
    apiReachable.value = true
  }
  
  return { 
    apiBase, 
    apiKey, 
    apiModel, 
    apiReachable, 
    saveConfig 
  }
})

