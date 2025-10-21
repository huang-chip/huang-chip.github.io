# 小淘博士 - Vue 3 版本

面向青少年的知识科普问答系统，基于 Vue 3 + Vite + Pinia 构建。

## 特性

- ✅ Vue 3 Composition API
- ✅ Pinia 状态管理
- ✅ 流式 LLM API 调用（实时响应）
- ✅ 历史记录管理（可删除）
- ✅ Markdown 渲染（vue-renderer-markdown）
- ✅ 语音朗读（Web Speech API）
- ✅ PWA 支持
- ✅ 响应式设计

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env.local` 并填写配置：

```env
VITE_PROXY_TARGET=https://api.deerapi.com
VITE_API_BASE=https://your-worker.workers.dev
VITE_DEFAULT_MODEL=deepseek-chat
```

### 3. 运行开发服务器

```bash
npm run dev
```

访问 http://localhost:5173

### 4. 构建生产版本

```bash
npm run build
```

## 目录结构

```
drtao-vue-app/
├── src/
│   ├── components/     # Vue 组件
│   ├── stores/         # Pinia 状态管理
│   ├── composables/    # 组合式函数
│   ├── assets/         # 样式和资源
│   ├── App.vue         # 根组件
│   └── main.js         # 入口文件
├── public/             # 静态资源
├── vite.config.js      # Vite 配置
└── package.json
```

## 配置说明

### Vite Proxy（开发环境）

开发环境使用 Vite Proxy 解决跨域问题，配置在 `vite.config.js` 中。

### Cloudflare Workers（生产环境）

生产环境需要部署 Cloudflare Workers 代理，参考 `重构为Vite项目规划.md` 中的配置。

## 功能说明

### 历史记录

- 保存在 localStorage
- 每条记录可单独删除
- 点击加载历史对话

### API 调用

- 支持流式实时响应
- 开发/生产环境自动切换
- 本地演示模式

## License

MIT

