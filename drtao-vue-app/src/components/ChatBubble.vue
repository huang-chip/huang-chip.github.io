<template>
  <div class="bubble-row" :class="{ me: isUser }">
    <div v-if="!isUser" class="avatar">
      <img src="/ui1.jpg" alt="bot" />
    </div>
    <div class="bubble" :class="{ me: isUser }">
      <MarkdownRender :content="message.content" />
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

