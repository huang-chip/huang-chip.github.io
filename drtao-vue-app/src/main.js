import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// 导入全局样式
import './assets/styles/reset.css'
import './assets/styles/variables.css'
import './assets/styles/layout.css'
import './assets/styles/components.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')

