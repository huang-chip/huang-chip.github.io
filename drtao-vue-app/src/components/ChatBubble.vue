<template>
  <div class="bubble-row" :class="{ me: isUser }">
    <div v-if="!isUser" class="avatar">
      <img src="/ui1.jpg" alt="bot" />
    </div>
    <div class="bubble" :class="{ me: isUser }">
      <MarkdownRender v-if="message.content" :content="message.content" :render-code-blocks-as-pre="true"/>
      <div v-else-if="!isUser" class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import MarkdownRender from 'vue-renderer-markdown'

defineProps({
  message: {
    type: Object,
    required: true
  },
  isUser: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.typing-indicator {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
}

.typing-indicator span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #909399;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(1) {
  animation-delay: -0.32s;
}

.typing-indicator span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes typing {
  0%,
  60%,
  100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  30% {
    transform: translateY(-10px);
    opacity: 1;
  }
}
</style>

