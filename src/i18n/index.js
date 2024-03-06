import { createI18n } from 'vue-i18n'
import zhLocale from './lang/zh'
import enLocale from './lang/en'
import { getItem } from '@/utils/storage'
import { LANG } from '@/constant'

const messages = {
  en: {
    msg: {
      ...enLocale
    }
  },
  zh: {
    msg: {
      ...zhLocale
    }
  }
}

const getLanguage = () => {
  return getItem(LANG) || 'zh'
}

const i18n = createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  // 使用 v-html 不在报警告
  warnHtmlMessage: false,
  locale: getLanguage(),
  messages
})

export default i18n
