import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlugin from './plugins/element'
import SvgIconPlugin from '@/icons'
import i18n from '@/i18n'

import './styles/index.scss'

// 登录鉴权
import './permission'
import * as EleIcons from '@element-plus/icons-vue'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

for (const name in EleIcons) {
  app.component(name, EleIcons[name])
}

app
  .use(pinia)
  .use(ElementPlugin)
  .use(SvgIconPlugin)
  .use(router)
  .use(i18n)
  .mount('#app')
