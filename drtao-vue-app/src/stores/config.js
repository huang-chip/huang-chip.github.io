import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useConfigStore = defineStore('config', () => {
  // 配置项（延迟初始化）
  const apiBase = ref('')
  const apiKey = ref('')
  const apiModel = ref('deepseek-chat')
  const apiReachable = ref(false)
  const deepThinkingEnabled = ref(false)
  const defaultApiModel = ref('deepseek-chat')
  const selectedSubjectPrompt = ref('')
  
  // 初始化配置
  function initConfig() {
    try {
      // 优先级：部署平台环境变量 > localStorage > .env文件 > 默认值
      apiBase.value = 
        import.meta.env.VITE_LLM_API_URL || 
        localStorage.getItem('api_base') || 
        'https://api.deepseek.com'
      
      apiKey.value = 
        import.meta.env.VITE_LLM_API_KEY || 
        localStorage.getItem('api_key') || 
        'sk-e909141ca97c45e79c47f59ebd698015'
      
      const savedModel = 
        import.meta.env.VITE_LLM_DEFAULT_MODEL || 
        localStorage.getItem('api_model') || 
        'deepseek-chat'
      defaultApiModel.value = savedModel
      apiModel.value = savedModel
      
      // 调试信息
      console.log('=== 配置初始化 ===')
      console.log(`API Base: ${apiBase.value ? '已配置' : '未配置'}`)
      console.log(`API Key: ${apiKey.value ? '已配置' : '未配置'}`)
      console.log(`API Model: ${apiModel.value}`)
      console.log(`配置来源: ${import.meta.env.VITE_LLM_API_URL ? '环境变量' : localStorage.getItem('api_base') ? 'localStorage' : '默认值'}`)
      
      // 检查配置是否完整
      apiReachable.value = !!(apiBase.value && apiKey.value && apiModel.value)
      
      if (apiReachable.value) {
        console.log('✅ API配置完整，可以正常使用')
      } else {
        console.warn('⚠️ API配置不完整，请检查环境变量或localStorage')
      }
    } catch (error) {
      console.error('Failed to initialize config:', error)
    }
  }
  
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
    deepThinkingEnabled,
    defaultApiModel,
    selectedSubjectPrompt,
    isMobile,
    sidebarOpen,
    saveConfig,
    initConfig,
    checkMobile,
    toggleSidebar,
    closeSidebar,
    initMobileDetection
  }
})

