import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'

export const useSpeechStore = defineStore('speech', () => {
  const enabled = ref(true)
  const voices = ref([])
  const selectedVoice = ref('')
  
  // 加载可用语音
  function loadVoices() {
    if (!('speechSynthesis' in window)) return
    
    const availableVoices = speechSynthesis.getVoices()
    voices.value = availableVoices.filter(v => 
      /zh|cmn|Chinese/i.test(v.lang) || true
    )
    
    if (voices.value.length > 0 && !selectedVoice.value) {
      selectedVoice.value = voices.value[0].name
    }
  }
  
  // 朗读文本
  function speak(text) {
    if (!('speechSynthesis' in window) || !enabled.value) return
    
    // 停止之前的朗读
    speechSynthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text.replace(/\n+/g, ' '))
    
    // 选择语音
    const voice = voices.value.find(v => v.name === selectedVoice.value)
    if (voice) {
      utterance.voice = voice
    }
    
    utterance.rate = 1.02
    utterance.pitch = 1.05
    utterance.volume = 1
    
    speechSynthesis.speak(utterance)
  }
  
  // 初始化
  if ('speechSynthesis' in window) {
    speechSynthesis.onvoiceschanged = loadVoices
    loadVoices()
  }
  
  return {
    enabled,
    voices,
    selectedVoice,
    speak
  }
})

