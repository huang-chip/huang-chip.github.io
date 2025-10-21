# 小淘博士 Vite 重构与 PWA 上线规划

## 项目概述

将当前的单页面 HTML 应用重构为基于 Vite 的现代前端项目，解决跨域问题，并最终部署为 PWA 应用。

## 当前项目分析

### 现有功能
- ✅ 知识科普问答系统（面向青少年）
- ✅ 本地演示模式（基于正则匹配的知识库）
- ✅ OpenAI 兼容 API 接入（支持自定义 base/key/model）
- ✅ 语音朗读功能（Web Speech API）
- ✅ 响应式设计（移动端抽屉式侧边栏）
- ✅ LocalStorage 配置持久化
- ✅ Markdown 渲染（简易版）

### 存在的问题
1. **跨域问题**：前端直接调用第三方 API，遇到 CORS 限制
2. **安全问题**：API Key 明文硬编码在前端代码中
3. **可维护性差**：单文件 484 行代码，HTML/CSS/JS 混杂
4. **无模块化**：无法使用 ES Module、无法引入 npm 包
5. **无构建流程**：无法使用 TypeScript、PostCSS、代码压缩等
6. **无 PWA 支持**：无 Service Worker、无离线缓存、无桌面安装

---

## 重构规划

### 阶段一：Vite + Vue 3 项目初始化与基础架构搭建

#### 1.1 创建 Vue 3 + Vite 项目
```bash
npm create vite@latest drtao-app -- --template vue
cd drtao-app
npm install
```

#### 1.2 安装必要依赖
```bash
# 核心依赖
npm install vue-renderer-markdown  # Markdown 渲染（Vue 3 专用）
npm install pinia                  # 状态管理（替代 Vuex）

# 开发依赖
npm install -D vite-plugin-pwa     # PWA 支持
npm install -D unplugin-vue-components unplugin-auto-import  # 自动导入（可选）
```

#### 1.3 项目目录结构规划（Vue 3）
```
drtao-app/
├── public/                    # 静态资源
│   ├── ui1.jpg               # Logo 图片
│   ├── favicon.ico           # 网站图标
│   └── robots.txt            # SEO
├── src/
│   ├── assets/               # 资源文件
│   │   └── styles/           
│   │       ├── reset.css     # CSS Reset
│   │       ├── variables.css # CSS 变量（颜色主题）
│   │       ├── layout.css    # 布局样式
│   │       └── components.css # 组件样式
│   ├── components/           # Vue 组件
│   │   ├── AppHeader.vue     # 头部组件
│   │   ├── SidebarPanel.vue  # 侧边栏（设置面板）
│   │   ├── ChatArea.vue      # 聊天区域
│   │   ├── ChatBubble.vue    # 单条消息气泡
│   │   ├── MessageInput.vue  # 输入框组件
│   │   ├── HistoryList.vue   # 历史记录列表
│   │   └── DrawerMenu.vue    # 移动端抽屉组件
│   ├── stores/               # Pinia 状态管理
│   │   ├── chat.js           # 聊天状态（消息列表、历史记录）
│   │   ├── config.js         # 配置状态（API 配置）
│   │   └── speech.js         # 语音状态
│   ├── composables/          # Vue 组合式函数（Composables）
│   │   ├── useKnowledgeBase.js # 本地知识库
│   │   ├── useLLMApi.js      # LLM API 调用封装
│   │   ├── useSpeech.js      # 语音合成模块
│   │   └── useLocalStorage.js # LocalStorage 封装
│   ├── utils/                # 工具函数
│   │   ├── api.js            # API 请求工具
│   │   ├── storage.js        # 存储工具
│   │   └── helpers.js        # 辅助函数
│   ├── views/                # 页面视图（如需多页面）
│   │   └── MainView.vue      # 主视图
│   ├── App.vue               # 根组件
│   ├── main.js               # 入口文件
│   └── index.html            # HTML 模板
├── .env.example              # 环境变量示例
├── .env.local                # 本地环境变量（不提交）
├── .gitignore
├── vite.config.js            # Vite 配置
└── package.json
```

---

### 阶段二：Vue 3 组件化与状态管理

#### 2.1 样式拆分
将现有的 `<style>` 标签内容拆分为多个 CSS 文件：

**src/assets/styles/variables.css**
- 提取所有 CSS 变量（:root 部分）
- 支持主题切换的扩展性

**src/assets/styles/layout.css**
- `.app`、`.doc`、`.side`、`.main` 等布局类

**src/assets/styles/components.css**
- 按钮、输入框、气泡、抽屉等组件样式

**src/assets/styles/reset.css**
- 基础样式重置

#### 2.2 Pinia 状态管理（替代 localStorage 直接操作）

**src/stores/chat.js**
```javascript
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useChatStore = defineStore('chat', () => {
  // 当前会话消息列表
  const messages = ref([]);
  
  // 历史记录列表（从 localStorage 加载）
  const histories = ref(JSON.parse(localStorage.getItem('chat_histories') || '[]'));
  
  // 添加消息
  function addMessage(role, content) {
    messages.value.push({ role, content, timestamp: Date.now() });
  }
  
  // 保存当前会话到历史记录
  function saveToHistory() {
    if (messages.value.length === 0) return;
    const history = {
      id: Date.now(),
      title: messages.value[0]?.content.slice(0, 30) || '新对话',
      messages: [...messages.value],
      timestamp: Date.now()
    };
    histories.value.unshift(history);
    syncToLocalStorage();
  }
  
  // 删除历史记录
  function deleteHistory(id) {
    histories.value = histories.value.filter(h => h.id !== id);
    syncToLocalStorage();
  }
  
  // 加载历史记录
  function loadHistory(id) {
    const history = histories.value.find(h => h.id === id);
    if (history) {
      messages.value = [...history.messages];
    }
  }
  
  // 清空当前会话
  function clearMessages() {
    messages.value = [];
  }
  
  // 同步到 localStorage
  function syncToLocalStorage() {
    localStorage.setItem('chat_histories', JSON.stringify(histories.value));
  }
  
  return {
    messages,
    histories,
    addMessage,
    saveToHistory,
    deleteHistory,
    loadHistory,
    clearMessages
  };
});
```

**src/stores/config.js**
```javascript
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useConfigStore = defineStore('config', () => {
  const apiBase = ref(localStorage.getItem('api_base') || '');
  const apiKey = ref(localStorage.getItem('api_key') || '');
  const apiModel = ref(localStorage.getItem('api_model') || 'gpt-4o-mini');
  const apiReachable = ref(false);
  
  function saveConfig() {
    localStorage.setItem('api_base', apiBase.value);
    localStorage.setItem('api_key', apiKey.value);
    localStorage.setItem('api_model', apiModel.value);
  }
  
  return { apiBase, apiKey, apiModel, apiReachable, saveConfig };
});
```

#### 2.3 Vue 组合式函数（Composables）

**src/composables/useLLMApi.js**
```javascript
import { useConfigStore } from '@/stores/config';

export function useLLMApi() {
  const configStore = useConfigStore();
  
  // 调用 LLM API（实时流式响应）
  async function callLLM(userMessage, onChunk) {
    const isDev = import.meta.env.DEV;
    const baseUrl = isDev ? '/api' : configStore.apiBase;
    const url = `${baseUrl}/chat/completions`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${configStore.apiKey}`
      },
      body: JSON.stringify({
        model: configStore.apiModel,
        messages: [
          { role: 'system', content: '你是小淘博士...' },
          { role: 'user', content: userMessage }
        ],
        stream: true  // 开启流式响应
      })
    });
    
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      onChunk(chunk);  // 实时回调
    }
  }
  
  return { callLLM };
}
```

**src/composables/useKnowledgeBase.js**
```javascript
// 本地知识库
export function useKnowledgeBase() {
  const knowledgeBase = [
    {q:/天空.*蓝/, a:'主要因为瑞利散射...'},
    // ... 更多知识
  ];
  
  function localAnswer(query) {
    for (const item of knowledgeBase) {
      if (item.q.test(query)) return item.a;
    }
    return `演示模式下的回答：${query}`;
  }
  
  return { localAnswer };
}
```

#### 2.4 Vue 组件示例

**src/components/ChatBubble.vue**
```vue
<template>
  <div class="bubble-row" :class="{ me: isUser }">
    <div v-if="!isUser" class="avatar">
      <img src="/ui1.jpg" alt="bot" />
    </div>
    <div class="bubble" :class="{ me: isUser }">
      <MarkdownRender :markdown="message.content" />
    </div>
  </div>
</template>

<script setup>
import MarkdownRender from 'vue-renderer-markdown';

defineProps({
  message: Object,
  isUser: Boolean
});
</script>
```

**src/components/HistoryList.vue**
```vue
<template>
  <div class="history-list">
    <div class="panel-title">历史记录</div>
    <div v-for="history in chatStore.histories" :key="history.id" class="history-item">
      <div class="history-info" @click="loadHistory(history.id)">
        <div class="history-title">{{ history.title }}</div>
        <div class="history-time">{{ formatTime(history.timestamp) }}</div>
      </div>
      <button class="btn-delete" @click="deleteHistory(history.id)">删除</button>
    </div>
  </div>
</template>

<script setup>
import { useChatStore } from '@/stores/chat';

const chatStore = useChatStore();

function loadHistory(id) {
  chatStore.loadHistory(id);
}

function deleteHistory(id) {
  if (confirm('确认删除这条历史记录？')) {
    chatStore.deleteHistory(id);
  }
}

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleString('zh-CN');
}
</script>
```

---

### 阶段三：解决跨域问题与实时通信（核心重点）

#### 3.1 Vite 开发环境代理配置（支持流式响应）

**vite.config.js**
```javascript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      // PWA 配置见阶段五
    })
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    proxy: {
      // 代理 API 请求到目标服务器，解决开发环境跨域
      // ⚠️ 关键：配置流式响应支持
      '/api': {
        target: '___PROXY_TARGET___', // 待填空：如 https://api.deerapi.com
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/v1'),
        configure: (proxy, options) => {
          // 支持 SSE 流式响应
          proxy.on('proxyRes', (proxyRes, req, res) => {
            if (req.url.includes('chat/completions')) {
              proxyRes.headers['Cache-Control'] = 'no-cache';
              proxyRes.headers['Connection'] = 'keep-alive';
            }
          });
        }
      }
    }
  }
});
```

#### 3.2 实时流式通信实现

**src/composables/useLLMApi.js（完整版）**
```javascript
import { useConfigStore } from '@/stores/config';

export function useLLMApi() {
  const configStore = useConfigStore();
  
  /**
   * 调用 LLM API（支持流式实时响应）
   * @param {string} userMessage 用户消息
   * @param {Function} onChunk 实时回调函数
   */
  async function callLLMStream(userMessage, onChunk) {
    const isDev = import.meta.env.DEV;
    // 开发环境走代理，生产环境走 Cloudflare Workers
    const baseUrl = isDev ? '/api' : configStore.apiBase;
    const url = `${baseUrl}/chat/completions`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${configStore.apiKey}`
      },
      body: JSON.stringify({
        model: configStore.apiModel,
        messages: [
          { 
            role: 'system', 
            content: '你是"小淘博士"，面向青少年的科普助教...' 
          },
          { role: 'user', content: userMessage }
        ],
        stream: true,  // ⚠️ 关键：开启流式响应
        temperature: 0.7
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }
    
    // 读取流式响应
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;
          
          try {
            const json = JSON.parse(data);
            const content = json.choices?.[0]?.delta?.content;
            if (content) {
              onChunk(content);  // 实时回调每个文字片段
            }
          } catch (e) {
            console.warn('解析 JSON 失败:', e);
          }
        }
      }
    }
  }
  
  return { callLLMStream };
}
```

**使用示例（在 Vue 组件中）**
```javascript
import { useLLMApi } from '@/composables/useLLMApi';
import { useChatStore } from '@/stores/chat';

const { callLLMStream } = useLLMApi();
const chatStore = useChatStore();

async function sendMessage(text) {
  // 添加用户消息
  chatStore.addMessage('user', text);
  
  // 添加空的 AI 消息（用于实时追加）
  const aiMessageIndex = chatStore.messages.length;
  chatStore.addMessage('assistant', '');
  
  try {
    // 调用流式 API
    await callLLMStream(text, (chunk) => {
      // 实时追加内容
      chatStore.messages[aiMessageIndex].content += chunk;
    });
  } catch (error) {
    console.error('LLM 调用失败:', error);
    chatStore.messages[aiMessageIndex].content = '❌ 请求失败：' + error.message;
  }
}
```

#### 3.3 生产环境跨域解决方案（必须实施）

**⚠️ 重要：生产环境必须部署代理服务，否则无法访问 API！**

**推荐方案：Cloudflare Workers 代理（免费、支持流式）**

**worker.js**
```javascript
// Cloudflare Workers 代理脚本
export default {
  async fetch(request, env) {
    // 处理 CORS 预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      });
    }
    
    const url = new URL(request.url);
    // 将请求转发到实际 API（待填空）
    const targetUrl = '___API_TARGET___' + url.pathname;  // 如：https://api.deerapi.com/v1/chat/completions
    
    // 复制原请求
    const newRequest = new Request(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body
    });
    
    // 转发请求
    const response = await fetch(newRequest);
    
    // 复制响应并添加 CORS 头
    const newResponse = new Response(response.body, response);
    newResponse.headers.set('Access-Control-Allow-Origin', '*');
    newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // ⚠️ 关键：保持流式响应的 Content-Type
    if (response.headers.get('Content-Type')?.includes('text/event-stream')) {
      newResponse.headers.set('Cache-Control', 'no-cache');
      newResponse.headers.set('Connection', 'keep-alive');
    }
    
    return newResponse;
  }
};
```

**部署步骤（见下方人工操作清单）**

#### 3.4 环境变量配置

**.env.example**
```env
# 开发环境代理目标（在 vite.config.js 中使用）
VITE_PROXY_TARGET=https://api.deerapi.com

# 生产环境 API 地址（Cloudflare Workers 地址）
VITE_API_BASE=___YOUR_WORKERS_URL___
VITE_DEFAULT_MODEL=gpt-4o-mini
```

**.env.local（本地开发，不提交）**
```env
VITE_PROXY_TARGET=https://api.deerapi.com
VITE_API_BASE=https://your-worker.username.workers.dev
```

---

### 阶段四：环境变量与安全配置

#### 4.1 环境变量使用

**src/stores/config.js（集成环境变量）**
```javascript
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useConfigStore = defineStore('config', () => {
  // 从环境变量读取默认值
  const apiBase = ref(
    localStorage.getItem('api_base') || 
    import.meta.env.VITE_API_BASE || 
    ''
  );
  const apiKey = ref(localStorage.getItem('api_key') || '');
  const apiModel = ref(
    localStorage.getItem('api_model') || 
    import.meta.env.VITE_DEFAULT_MODEL || 
    'gpt-4o-mini'
  );
  const apiReachable = ref(false);
  
  function saveConfig() {
    localStorage.setItem('api_base', apiBase.value);
    localStorage.setItem('api_key', apiKey.value);
    localStorage.setItem('api_model', apiModel.value);
  }
  
  return { apiBase, apiKey, apiModel, apiReachable, saveConfig };
});
```

#### 4.2 安全配置原则
- ❌ **永远不要**在前端代码或环境变量中存储 API Key
- ✅ 由用户在设置面板中输入，存储在 localStorage
- ✅ 生产环境必须通过 Cloudflare Workers 等代理转发请求
- ✅ 移除所有硬编码的 API Key（包括 `DEFAULT_KEY_PARTS`）

---

### 阶段五：PWA 配置

#### 5.1 安装和配置 vite-plugin-pwa

**vite.config.js**
```javascript
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'ui1.jpg', 'robots.txt'],
      manifest: {
        name: '小淘博士 - 知识科普大语言模型',
        short_name: '小淘博士',
        description: '面向青少年的知识科普问答，文字+语音，支持接入大语言模型接口',
        theme_color: '#FFA726',
        background_color: '#FFF8E6',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        // 配置缓存策略
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\./,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 // 1 小时
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ]
});
```

#### 5.2 准备 PWA 图标
- 使用 ui1.jpg 生成 192x192、512x512 尺寸的 PNG 图标
- 工具推荐：https://realfavicongenerator.net/
- 放置到 `public/` 目录下

#### 5.3 添加 PWA 安装提示

**src/modules/pwa-install.js**
```javascript
export function initPWAInstall() {
  let deferredPrompt;
  
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallButton();
  });
  
  function showInstallButton() {
    const btn = document.createElement('button');
    btn.textContent = '安装应用';
    btn.className = 'btn pwa-install-btn';
    btn.onclick = async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log('PWA 安装结果:', outcome);
        deferredPrompt = null;
      }
    };
    document.querySelector('.header-actions').appendChild(btn);
  }
}
```

---

### 阶段六：构建与部署

#### 6.1 修改 package.json 脚本
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  },
  "devDependencies": {
    "gh-pages": "^6.0.0"
  }
}
```

#### 6.2 配置 GitHub Pages 部署

**vite.config.js** 添加 base 路径
```javascript
export default defineConfig({
  base: '___REPO_NAME___',  // 待填空：如 '/' 或 '/仓库名/'
  // ... 其他配置
});
```

#### 6.3 构建优化
```javascript
// vite.config.js
export default defineConfig({
  build: {
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true  // 生产环境移除 console
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['marked', 'dompurify']  // 第三方库单独打包
        }
      }
    }
  }
});
```

#### 6.4 部署流程

**GitHub Pages 自动部署**
```bash
# 本地构建并推送
npm run build
npm install -D gh-pages
npm run deploy
```

**或使用 GitHub Actions 自动化**

**.github/workflows/deploy.yml**
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

### 阶段七：优化与增强

#### 7.1 性能优化
- ✅ 代码分割（动态 import）
- ✅ 图片优化（使用 WebP 格式）
- ✅ 懒加载（聊天记录虚拟滚动）
- ✅ Service Worker 缓存策略

#### 7.2 用户体验优化
- ✅ 添加加载动画
- ✅ 优化移动端交互
- ✅ 支持暗色模式
- ✅ 添加快捷键支持（Ctrl+K 聚焦输入框）

#### 7.3 功能增强
- ✅ 聊天记录导出（JSON/Markdown）
- ✅ 多会话管理
- ✅ 自定义知识库
- ✅ 错误重试机制

#### 7.4 SEO 优化
- ✅ 添加 meta 标签（og:image、twitter:card）
- ✅ 生成 sitemap.xml
- ✅ 添加 robots.txt
- ✅ 使用语义化 HTML

---

## 🔧 人工操作清单（开始实施前请填写）

在开始自动化实施之前，请先完成以下准备工作并填写相关信息：

【写给我自己：全部都是用github第三方登陆的】

### 1. 基础信息配置

| 序号 | 配置项 | 说明 | 待填写内容 | 状态 |
|------|--------|------|-----------|------|
| 1 | GitHub 仓库名 | 你的项目仓库名称 | https://github.com/huang-chip/huang-chip.github.io | 完成 |
| 2 | GitHub 用户名 | 你的 GitHub 用户名 | `huang-chip` | 完成 |
| 3 | 项目部署路径 | GitHub Pages base 路径 | `/` | 完成 |
| 4 | LLM API 提供商 | 使用的 API 服务商 | `deepseek-chat` | 完成 |
| 5 | API 地址 | 实际 API 地址（用于开发代理） | `https://api.deerapi.com` | 完成 |

### 2. Cloudflare Workers 配置（生产环境跨域代理）

| 序号 | 操作步骤 | 详细说明 | 待填写/确认 | 状态 |
|------|----------|----------|------------|------|
| 1 | 注册 Cloudflare 账号 | 访问 https://dash.cloudflare.com/sign-up | 账号邮箱: `694327101@qq.com` | ⬜ 未完成 |
| 2 | 创建 Worker | 进入 Workers & Pages，点击"创建应用程序" | Worker 名称: `doctor-tao` | ⬜ 未完成 |
| 3 | 复制 worker.js 代码 | 将阶段三的 worker.js 代码粘贴到编辑器 | - | ⬜ 未完成 |
| 4 | 填写 API 目标地址 | 替换 `___API_TARGET___` 为实际地址 | API Target: `_______________` | ⬜ 未完成 |
| 5 | 部署 Worker | 点击"保存并部署" | -后续再执行，目前的代码部署未成功 | ⬜ 未完成 |
| 6 | 获取 Worker URL | 复制生成的 Worker 地址 | Worker URL: `doctor-tao.694327101.workers.dev` | ⬜ 未完成 |

**示例填写：**
- Worker 名称: `drtao-api-proxy`
- API Target: `https://api.deerapi.com/v1`
- Worker URL: `https://drtao-api-proxy.你的用户名.workers.dev`

### 3. PWA 图标准备

| 序号 | 操作步骤 | 工具/方法 | 文件路径 | 状态 |
|------|----------|----------|---------|------|
| 1 | 准备原始图标 | 使用 docs/ui1.jpg 或设计新图标 | `public/ui1.jpg` | ⬜ 未完成 |
| 2 | 生成 192x192 图标 | https://realfavicongenerator.net/ | `public/pwa-192x192.png` | ⬜ 未完成 |
| 3 | 生成 512x512 图标 | 同上 | `public/pwa-512x512.png` | ⬜ 未完成 |
| 4 | 生成 favicon.ico | 同上 | `public/favicon.ico` | ⬜ 未完成 |

### 4. 环境变量文件配置

需要创建 `.env.local` 文件（不提交到 Git），内容模板如下：

```env
# 开发环境代理目标
VITE_PROXY_TARGET=___填写_API_地址___

# 生产环境 API 地址（Cloudflare Workers URL）
VITE_API_BASE=___填写_Worker_URL___

# 默认模型
VITE_DEFAULT_MODEL=gpt-4o-mini
```

**填写示例：**
```env
VITE_PROXY_TARGET=https://api.deerapi.com
VITE_API_BASE=https://drtao-api-proxy.你的用户名.workers.dev
VITE_DEFAULT_MODEL=gpt-4o-mini
```

| 序号 | 变量名 | 待填写内容 | 状态 |
|------|--------|-----------|------|
| 1 | VITE_PROXY_TARGET | `https://api.deerapi.com` | 完成 |
| 2 | VITE_API_BASE | `doctor-tao.694327101.workers.dev` | 完成 |
| 3 | VITE_DEFAULT_MODEL | `deepseek-chat` | 完成 |
| 4 | API-key | sk-2MK6C7uQB8UeJsXVWnBOHKQGlXsGop7dS3K1FWPjvOEzk5YP | 完成 |

### 5. vite.config.js 配置待填空项

```javascript
export default defineConfig({
  base: '___填写___',  // 如：'/' 或 '/drtao.github.io/'
  server: {
    proxy: {
      '/api': {
        target: '___填写___',  // 如：https://api.deerapi.com
        // ...
      }
    }
  }
});
```

| 序号 | 配置项 | 待填写内容 | 状态 |
|------|--------|-----------|------|
| 1 | base | `/api` | ⬜ 未完成 |
| 2 | proxy.target | `https://api.deerapi.com` | ⬜ 未完成 |

### 6. GitHub Actions 部署配置（可选）不选

如果使用 GitHub Actions 自动部署：

| 序号 | 操作步骤 | 说明 | 状态 |
|------|----------|------|------|
| 1 | 启用 GitHub Pages | 仓库 Settings → Pages → Source 选择 gh-pages 分支 | ⬜ 未完成 |
| 2 | 配置 Actions 权限 | Settings → Actions → General → Workflow permissions 选择 Read and write | ⬜ 未完成 |
| 3 | 创建 workflow 文件 | 复制阶段六的 deploy.yml 到 `.github/workflows/` | ⬜ 未完成 |
| 4 | 推送代码触发部署 | `git push` 后自动触发 | ⬜ 未完成 |

### 7. 自定义域名配置（可选）

| 序号 | 操作步骤 | 说明 | 待填写 | 状态 |
|------|----------|------|--------|------|
| 1 | 购买域名 | 如 Cloudflare、阿里云等 | 域名: `_______________` | ⬜ 未完成 |
| 2 | DNS 配置 | 添加 CNAME 记录指向 `用户名.github.io` | - | ⬜ 未完成 |
| 3 | GitHub Pages 配置 | Settings → Pages → Custom domain 填写域名 | - | ⬜ 未完成 |
| 4 | 启用 HTTPS | 勾选 "Enforce HTTPS" | - | ⬜ 未完成 |

---

### ✅ 准备完成检查表

在开始自动化执行前，请确认以下项目已完成：

- [x] 已填写完整的基础信息配置（仓库名、用户名等）
- [ ] 已注册 Cloudflare 账号并创建 Worker
- [ ] 已获取 Worker URL 并填写到环境变量
- [ ] 已准备好 PWA 图标（至少 192x192 和 512x512）
- [ ] 已创建 `.env.local` 文件并填写完整
- [ ] 已确认 API 地址可访问（测试过接口连通性）
- [ ] 已启用 GitHub Pages 和 Actions 权限（如使用自动部署）

**👉 完成以上准备后，回复"准备完成"，我将自动化执行后续步骤！**

---

## 实施步骤总结

### 第一周：基础架构
1. ✅ 创建 Vite 项目
2. ✅ 搭建目录结构
3. ✅ 拆分 CSS 文件
4. ✅ 配置 Vite proxy
5. ✅ 验证开发环境运行

### 第二周：模块化重构
1. ✅ 拆分 JavaScript 模块
2. ✅ 创建组件函数
3. ✅ 使用 marked.js 替代简易 Markdown
4. ✅ 配置环境变量
5. ✅ 移除硬编码 API Key

### 第三周：PWA 与部署
1. ✅ 配置 vite-plugin-pwa
2. ✅ 生成 PWA 图标
3. ✅ 测试 Service Worker
4. ✅ 部署到 GitHub Pages
5. ✅ 配置自定义域名（可选）

### 第四周：解决跨域问题
1. ✅ 创建 Cloudflare Workers 代理（推荐）
2. ✅ 或使用 Vercel Edge Functions
3. ✅ 修改生产环境 API 调用
4. ✅ 测试线上跨域访问

### 第五周：优化与上线
1. ✅ 性能优化与测试
2. ✅ PWA 安装测试（移动端）
3. ✅ SEO 优化
4. ✅ 正式上线

---

## 关键技术点

### 1. Vite Proxy 解决开发环境跨域
```javascript
// vite.config.js
server: {
  proxy: {
    '/api': {
      target: 'https://api.deerapi.com',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '/v1')
    }
  }
}
```

### 2. Cloudflare Workers 解决生产环境跨域
- 免费套餐：10 万次请求/天
- 边缘计算，全球加速
- 5 分钟快速部署

### 3. vite-plugin-pwa 零配置 PWA
- 自动生成 Service Worker
- 支持离线缓存
- 自动更新策略

### 4. 环境变量管理
- 开发环境：`.env.local`（不提交）
- 生产环境：GitHub Secrets 或 Vercel 环境变量

---

## 风险与注意事项

### 1. API Key 安全
- ❌ 永远不要在前端代码中硬编码 API Key
- ✅ 使用后端代理转发请求
- ✅ 或让用户自己输入 Key（存储在 localStorage）

### 2. 跨域问题
- 开发环境：Vite Proxy 解决
- 生产环境：必须使用后端代理（Cloudflare Workers/Vercel Functions）

### 3. PWA 要求
- 必须使用 HTTPS（GitHub Pages 默认支持）
- 需要 manifest.json 和 Service Worker
- 图标尺寸必须符合规范（192x192、512x512）

### 4. 兼容性
- Service Worker 不支持 IE
- Web Speech API 浏览器支持度：Chrome/Edge（完全支持），Safari（部分支持），Firefox（不支持）

---

## 参考资源

### 官方文档
- Vite：https://vitejs.dev/
- vite-plugin-pwa：https://vite-pwa-org.netlify.app/
- Cloudflare Workers：https://workers.cloudflare.com/

### 工具
- PWA 图标生成：https://realfavicongenerator.net/
- Lighthouse PWA 审计：Chrome DevTools
- Marked.js：https://marked.js.org/

### 部署平台
- GitHub Pages：https://pages.github.com/
- Vercel：https://vercel.com/
- Netlify：https://www.netlify.com/
- Cloudflare Pages：https://pages.cloudflare.com/

---

## 总结

通过本次重构，将实现以下目标：

### ✅ 核心功能实现

1. **解决跨域问题（重中之重）**
   - 开发环境：Vite Proxy 自动转发
   - 生产环境：Cloudflare Workers 代理（免费、稳定、支持流式）
   - 确保与远端大模型实时通信，无延迟

2. **Vue 3 现代化架构**
   - 使用 Vue 3 Composition API 替代传统 DOM 操作
   - Pinia 状态管理（消息、历史记录、配置）
   - 组件化设计，易于维护和扩展

3. **Markdown 渲染优化**
   - 使用 `vue-renderer-markdown` 第三方库
   - 替代 v-html + marked 方案
   - 更好的安全性和渲染效果

4. **历史记录管理**
   - 保存在 localStorage，持久化存储
   - 每条记录带删除按钮
   - 支持点击加载历史对话

5. **PWA 完整支持**
   - 离线缓存、桌面安装
   - Service Worker 自动更新
   - 原生应用般的体验

6. **安全优化**
   - 移除所有硬编码 API Key
   - 用户输入存储在 localStorage
   - 生产环境强制走代理服务

### 📋 关键技术方案

| 技术选型 | 方案 | 理由 |
|---------|------|------|
| 前端框架 | Vue 3 | 响应式、组件化、生态成熟 |
| 状态管理 | Pinia | 轻量、TypeScript 友好 |
| Markdown | vue-renderer-markdown | Vue 3 原生支持 |
| 构建工具 | Vite | 快速、现代化 |
| 跨域方案 | Cloudflare Workers | 免费、边缘计算、支持流式 |
| 部署平台 | GitHub Pages | 免费、HTTPS、稳定 |
| PWA 插件 | vite-plugin-pwa | 零配置、自动生成 |

### 🔥 跨域问题终极解决方案

```
开发环境流程：
浏览器 → Vite Dev Server (localhost:5173)
       → Vite Proxy (/api → https://api.deerapi.com/v1)
       → 远端 API
       → 实时流式响应返回

生产环境流程：
浏览器 → GitHub Pages (https://用户名.github.io)
       → Cloudflare Workers (https://worker.workers.dev)
       → 远端 API
       → 实时流式响应返回

✅ 全程无跨域问题
✅ 支持流式实时通信
✅ 免费且稳定
```

### 📅 实施周期

预计重构周期：**4-5 周**

- **第 1 周**：基础架构 + Vue 3 项目搭建
- **第 2 周**：组件化开发 + 状态管理
- **第 3 周**：PWA 配置 + 部署
- **第 4 周**：Cloudflare Workers 配置 + 跨域解决
- **第 5 周**：优化测试 + 正式上线

完成后将拥有一个：
- ✅ 成熟的、可扩展的、生产级别的前端应用
- ✅ 完全解决跨域问题的实时通信系统
- ✅ 支持 PWA 的现代化 Web 应用
- ✅ 易于维护和二次开发的代码架构

---

## 🚀 下一步行动

1. **填写上方"人工操作清单"**中的所有待填空项
2. **准备 Cloudflare Workers**（必须！否则生产环境无法使用）
3. **准备 PWA 图标**（192x192、512x512 尺寸）
4. **创建 `.env.local` 文件**并填写环境变量
5. **确认所有检查项**都已完成
6. **回复"准备完成"**，我将自动化执行后续步骤！

**重要提醒：**
- ⚠️ Cloudflare Workers 是解决跨域的**唯一**生产方案，必须配置
- ⚠️ 不配置代理服务，线上环境将**无法调用 API**
- ⚠️ 请优先完成 Cloudflare Workers 的注册和配置

