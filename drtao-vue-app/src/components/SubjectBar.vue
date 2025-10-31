<template>
  <div class="subject-bar" tabindex="0">
    <div
      v-for="subject in subjects"
      :key="subject.text"
      class="subject-section"
      :class="{ 'selected': selectedSubject?.text === subject.text }"
      :title="subject.title"
      @click="selectSubject(subject)"
    >
      <span class="emoji">{{ subject.emoji }}</span>
      <span class="label">{{ subject.text }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useConfigStore } from '@/stores/config'

const configStore = useConfigStore()

const subjects = [
  {
    text: '宇宙',
    title: '宇宙与天文',
    prompt: '你是一位宇宙与天文领域的权威专家。请用通俗、生动、富有想象力的语言，像讲故事一样回答有关宇宙起源、星球、银河、黑洞等奥秘的问题。思路清晰，先直接给出答案，再用生活中的比喻解释原因，让青少年听懂、觉得有趣；如果适合，可以提出进一步思考，比如“你知道宇宙有多大吗？”等启发性问题。',
    emoji: '🪐'
  },
  {
    text: '自然',
    title: '自然科学',
    prompt: '你是一位自然科学领域的专家导师。用鲜活的例子和贴近生活的故事，深入浅出地解答自然界的各种现象，如气象变化、动植物生长、四季轮回等，让青少年能理解背后的科学原理，激发他们对大自然好奇心和探索欲。',
    emoji: '🌲'
  },
  {
    text: '生物',
    title: '生物科学',
    prompt: '你是一名经验丰富的生物学家，用孩子能理解的语言讲述动物、植物、人类身体等生物知识。把枯燥的科学变成趣味故事和实际例子，帮青少年看到生命世界的神奇和多样，还可以引导他们思考“生命为什么这样？”等有意思的问题。',
    emoji: '🦋'
  },
  {
    text: '物理',
    title: '物理科学',
    prompt: '你是物理学界的优秀老师。请用贴近日常生活的例子和简单实验，向青少年详细解释物理概念和原理（如力、电、光、声等），让抽象的物理变得具体有趣。讲解时生动活泼，举身边的小物品做比喻，让知识易懂不枯燥。',
    emoji: '⚛️'
  },
  {
    text: '化学',
    title: '化学科学',
    prompt: '你是一位富有创意的化学专家。通过妙趣横生的例子，比如厨房里的反应、彩虹的形成、小苏打和醋等，阐述化学中的现象和原理。让青少年知道化学和生活密不可分，激发他们的探索兴趣。可以提出生活中能观察到的小实验。',
    emoji: '🧪'
  },
  {
    text: '地理',
    title: '地理学',
    prompt: '你是充满激情的地理老师，用地图和有趣的小故事，讲解地球地形、气候变化、奇特的地理现象和国家分布等。注重结合生活经历和世界事件，帮助青少年建立空间观念，培养他们全球视野。',
    emoji: '🗺️'
  },
  {
    text: '历史',
    title: '历史',
    prompt: '你是一位讲故事高手的历史老师。讲述中国和世界历史上的重大事件和人物时，注重故事性和趣味性，把冰冷的年代变成鲜活的场景。让青少年明白历史和我们生活的关系，启发他们从不同角度思考历史。',
    emoji: '🏺'
  },
  {
    text: '诗歌',
    title: '古诗与诗歌',
    prompt: '你是古诗文与诗歌领域的专家。用亲切、形象的语言为青少年介绍古诗词和现代诗歌，帮助他们理解诗意、意境和写作背景，穿插典故和诗人生平故事，还可以引导他们试着赏析甚至自己创作诗句。',
    emoji: '📜'
  },
  {
    text: '通用',
    title: '通用提示词',
    prompt: '',
    emoji: '💭'
  }
]

const selectedSubject = ref(null)

// 初始化：默认选中"通用"
onMounted(() => {
  const defaultSubject = subjects.find(s => s.text === '通用')
  if (defaultSubject) {
    selectSubject(defaultSubject)
  }
})

function selectSubject(subject) {
  selectedSubject.value = subject
  configStore.selectedSubjectPrompt = subject.prompt || ''
}
</script>

<style scoped>
.subject-bar {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  background: rgba(255,255,255,0); /* 透明底色 */
  scrollbar-width: thin;
  scrollbar-color: #ffa72633 transparent;
  user-select: none;
  -webkit-overflow-scrolling: touch;
}
.subject-bar::-webkit-scrollbar {
  height: 6px;
  background: transparent;
}
.subject-bar::-webkit-scrollbar-thumb {
  background: #ffa72633;
  border-radius: 3px;
}
.subject-section {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  padding: 6px 18px 6px 12px;
  border-radius: 16px;
  background: rgba(255,255,255,0.30);
  backdrop-filter: blur(2px);
  font-weight: 500;
  font-size: 16px;
  color: #353434;
  transition: background 0.15s, border-color 0.15s;
  cursor: pointer;
  border: 1px solid transparent;
  box-sizing: border-box;
}
.subject-section:hover {
  background: rgba(255,167,38,0.09);
}
.subject-section.selected {
  background: rgba(255,167,38,0.25);
  border-color: rgba(255,167,38,0.4);
}
.emoji {
  font-size: 1.3em;
  margin-right: 7px;
}
.label {
  white-space: nowrap;
}
</style>

