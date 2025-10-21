# 小淘博士 PWA 应用

这是一个基于Vue 3的PWA（渐进式Web应用），提供知识科普问答功能。

## 功能特性

- 🎯 面向青少年的知识科普问答
- 🗣️ 支持文字和语音交互
- 📱 PWA支持，可安装到手机桌面
- 🔄 离线缓存，网络不佳时也能使用
- 🎨 响应式设计，适配各种设备

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## PWA部署到GitHub Pages

### 自动部署（推荐）

1. 确保GitHub仓库已启用GitHub Pages
2. 推送代码到main分支，GitHub Actions会自动构建并部署

### 手动部署

```bash
# 安装依赖
npm install

# 构建并部署到GitHub Pages
npm run deploy
```

## PWA功能

- **可安装**：在支持的浏览器中，用户可以点击地址栏的安装按钮将应用添加到桌面
- **离线访问**：通过Service Worker缓存资源，离线时也能使用基础功能
- **全屏显示**：安装后打开无浏览器地址栏，体验接近原生App
- **自动更新**：应用会自动检测并更新到最新版本

## 浏览器支持

- ✅ Chrome/Edge (Android/Desktop)
- ✅ Firefox (Android/Desktop)  
- ✅ Safari (iOS/macOS) - 基础功能支持
- ✅ Samsung Internet

## 技术栈

- Vue 3 + Composition API
- Pinia (状态管理)
- Vite (构建工具)
- Vite PWA Plugin (PWA支持)
- Workbox (Service Worker)

## 许可证

MIT License