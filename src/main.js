import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlugin from './plugins/element'
import SvgIconPlugin from '@/icons'

import './styles/index.scss'

// 登录鉴权
import './permission'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(pinia).use(ElementPlugin).use(SvgIconPlugin).use(router).mount('#app')
