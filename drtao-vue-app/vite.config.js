import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,webp,woff,woff2,ttf,eot}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.deerapi\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 // 24 hours
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      includeAssets: ['favicon.ico', 'ui1.jpg', 'pwa-192x192.png', 'pwa-512x512.png', 'screenshot-desktop.png', 'screenshot-mobile.png'],
      manifest: {
        name: '小淘博士 - 知识科普大语言模型',
        short_name: '小淘博士',
        description: '面向青少年的知识科普问答，支持文字和语音交互',
        theme_color: '#FFA726',
        background_color: '#FFF8E6',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        screenshots: [
          {
            src: 'screenshot-desktop.png',
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide'
          },
          {
            src: 'screenshot-mobile.png',
            sizes: '720x1280',
            type: 'image/png',
            form_factor: 'narrow'
          }
        ],
        categories: ['education', 'productivity'],
        lang: 'zh-CN'
      }
    })
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    proxy: {
      '/api': {
        // target: 'https://api.deerapi.com',
        target: 'https://api.deepseek.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/v1'),
        configure: (proxy, options) => {
          proxy.on('proxyRes', (proxyRes, req, res) => {
            if (req.url.includes('chat/completions')) {
              proxyRes.headers['Cache-Control'] = 'no-cache'
              proxyRes.headers['Connection'] = 'keep-alive'
            }
          })
        }
      }
    }
  },
  base: '/'
})

