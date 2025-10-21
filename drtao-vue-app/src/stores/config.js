import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useConfigStore = defineStore('config', () => {
  // 从环境变量读取默认值
  const apiBase = ref(
    localStorage.getItem('api_base') || 
    import.meta.env.VITE_LLM_API_URL || 
    ''
  )
  
  const apiKey = ref(
    localStorage.getItem('api_key') || 
    import.meta.env.VITE_LLM_API_KEY || 
    ''
  )
  
  const apiModel = ref(
    localStorage.getItem('api_model') || 
    import.meta.env.VITE_LLM_DEFAULT_MODEL || 
    'deepseek-chat'
  )
  console.log(`apiBase:${apiBase.value}`)
  console.log(`apiKey:${apiKey.value}`)
  console.log(`apiModel:${apiModel.value}`)
  
  const apiReachable = ref(false)
  
  // 常用模型列表
  const availableModels = ref([
    { value: 'gpt-4o', label: 'GPT-4o (最新)' },
    { value: 'gpt-4o-mini', label: 'GPT-4o Mini (快速)' },
    { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
    { value: 'deepseek-chat', label: 'DeepSeek Chat' },
    { value: 'claude-3-5-sonnet-20241022', label: 'Claude 3.5 Sonnet' },
    { value: 'claude-3-haiku-20240307', label: 'Claude 3 Haiku' }
  ])
  
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

  // 移动端检测和状态管理
  const isMobile = ref(false)
  const sidebarOpen = ref(false)
  
  // 检测是否为移动端
  function checkMobile() {
    isMobile.value = window.matchMedia('(max-width: 860px)').matches
  }
  
  // 切换侧边栏状态
  function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value
    updateBodyScroll()
  }
  
  // 关闭侧边栏
  function closeSidebar() {
    sidebarOpen.value = false
    updateBodyScroll()
  }
  
  // 控制页面滚动锁定
  function updateBodyScroll() {
    if (isMobile.value && sidebarOpen.value) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
  
  // 监听窗口大小变化
  function initMobileDetection() {
    checkMobile()
    window.addEventListener('resize', () => {
      checkMobile()
      updateBodyScroll() // 窗口大小变化时重新检查滚动状态
    })
  }
  
  return { 
    apiBase, 
    apiKey, 
    apiModel, 
    apiReachable, 
    availableModels,
    isMobile,
    sidebarOpen,
    saveConfig,
    checkMobile,
    toggleSidebar,
    closeSidebar,
    initMobileDetection
  }
})

