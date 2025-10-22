<template>
  <div class="history-section">
    <div class="panel-title">历史记录</div>
    <div class="history-list">
      <div
        v-for="history in chatStore.histories"
        :key="history.id"
        class="history-item"
      >
        <div class="history-info" @click="loadHistory(history.id)">
          <div class="history-title">{{ history.title }}</div>
          <div class="history-time">{{ formatTime(history.timestamp) }}</div>
        </div>
        <button class="btn-delete" @click.stop="deleteHistory(history.id)" title="删除会话">
          删除
        </button>
      </div>
      <div v-if="chatStore.histories.length === 0" class="hint">
        暂无历史记录
      </div>
    </div>
  </div>
</template>

<script setup>
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()

function loadHistory(id) {
  if (confirm('加载历史记录将替换当前对话，确认继续？')) {
    chatStore.loadHistory(id)
  }
}

function deleteHistory(id) {
  if (confirm('确认删除这条历史记录？')) {
    chatStore.deleteHistory(id)
  }
}


function formatTime(timestamp) {
  return new Date(timestamp).toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.history-list {
  max-height: 300px;
  overflow-y: auto;
  margin: 10px 0;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  margin: 4px 0;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
}

.history-item:hover {
  background: var(--bubble-me);
}

.history-info {
  flex: 1;
}

.history-title {
  font-weight: 600;
  font-size: 13px;
  color: var(--text);
  margin-bottom: 4px;
}

.history-time {
  font-size: 11px;
  color: var(--muted);
}

.btn-delete {
  padding: 6px;
  font-size: 12px;
  color: #dc2626;
  background-color: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
}

.btn-delete:hover {
  transform: scale(1.05);
}
</style>

