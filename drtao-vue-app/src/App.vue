<template>
  <div class="app">
    <AppHeader />
    <section class="doc" role="main">
      <SidebarPanel />
      <div class="main">
        <ChatArea />
        <MessageInput />
      </div>
    </section>
    <!-- <div class="footer">© 2025 小淘博士 · 基于 Vue 3 + Vite 构建</div> -->
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import SidebarPanel from './components/SidebarPanel.vue'
import ChatArea from './components/ChatArea.vue'
import MessageInput from './components/MessageInput.vue'
</script>

