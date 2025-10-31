<template>
  <!-- 移动端背景遮罩 - 始终存在，通过 show class 控制显示 -->
  <div 
    class="backdrop" 
    :class="{ 'show': configStore.isMobile && configStore.sidebarOpen }"
    @click="configStore.closeSidebar"
  ></div>
  
  <aside 
    class="side" 
    :class="{ 'drawer': configStore.isMobile, 'show': configStore.isMobile && configStore.sidebarOpen }"
    aria-label="设置"
  >
    <div v-show="false">
      <div class="panel-title">连接大模型</div>
      <div class="setting">
        <label>API 地址</label>
        <input
          v-model="configStore.apiBase"
          class="input"
          placeholder="如 https://api.openai.com/v1"
        />
        
        <label>API Key（保存在浏览器本地）</label>
        <input
          v-model="configStore.apiKey"
          class="input"
          type="password"
          placeholder="sk-..."
        />
        
        <label>模型名</label>
        <select v-model="configStore.apiModel" class="select">
          <option v-for="model in configStore.availableModels" :key="model.value" :value="model.value">
            {{ model.label }}
          </option>
        </select>
        
        <button class="btn" @click="saveConfig">保存配置</button>
        
        <div class="hint">未设置即本地演示；配置后走 API。</div>
        <div class="status" :class="statusClass">
          {{ statusText }}
        </div>
      </div>

      <hr style="border:none;border-top:2px dashed var(--border)" />
    </div>
    <div class="panel-title">语音设置</div>
    <div class="setting" style="display:flex;flex-direction:row;justify-content: space-between;">
      <label style="display:flex;align-items:center;gap:6px">
        <input
          v-model="speechStore.enabled"
          type="checkbox"
          style="transform:scale(1.1); accent-color:var(--orange);"
        />
        启用朗读
      </label>
      <label style="display:flex;align-items:center;gap:6px">
        <input
          v-model="configStore.deepThinkingEnabled"
          type="checkbox"
          style="transform:scale(1.1); accent-color:var(--orange);"
        />
        深度思考模式
      </label>
      <!-- 语音选择，暂时禁用 -->
      <div v-show="false">
        <select v-model="speechStore.selectedVoice" class="select">
          <option v-for="voice in speechStore.voices" :key="voice.name" :value="voice.name">
            {{ voice.name }} ({{ voice.lang }})
          </option>
        </select>
      </div>
    </div>

    <hr style="border:none;border-top:2px dashed var(--border)" />

    <HistoryList />
  </aside>
</template>

<script setup>
import { computed, onMounted, onUnmounted, watch } from 'vue'
import { useConfigStore } from '@/stores/config'
import { useSpeechStore } from '@/stores/speech'
import HistoryList from './HistoryList.vue'

const configStore = useConfigStore()
const speechStore = useSpeechStore()

// 监听语音开关状态变化
watch(() => speechStore.enabled, (newValue, oldValue) => {
  // 当从启用变为禁用时，停止当前语音
  if (oldValue === true && newValue === false) {
    speechStore.stopSpeech()
  }
})

// 监听深度思考模式状态变化
watch(() => configStore.deepThinkingEnabled, (newValue) => {
  if (newValue) {
    // 切换到深度思考模式时，保存当前模型并切换到 deepseek-reasoner
    if (configStore.apiModel !== 'deepseek-reasoner') {
      configStore.defaultApiModel = configStore.apiModel
      configStore.apiModel = 'deepseek-reasoner'
    }
  } else {
    // 取消深度思考模式时，恢复为默认模型
    configStore.apiModel = configStore.defaultApiModel
  }
})

function saveConfig() {
  configStore.saveConfig()
  alert('配置已保存！')
}

const statusText = computed(() => {
  return configStore.apiReachable 
    ? `API 模式（${configStore.apiModel}）`
    : '演示模式'
})

const statusClass = computed(() => {
  return configStore.apiReachable ? 'success' : 'muted'
})

// ESC 键关闭侧边栏
function handleKeydown(event) {
  if (event.key === 'Escape' && configStore.sidebarOpen) {
    configStore.closeSidebar()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

