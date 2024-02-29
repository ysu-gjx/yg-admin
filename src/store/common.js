import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getItem, setItem } from '@/utils/storage'
import { LANG } from '@/constant'

export const useCommonStore = defineStore('common', () => {
  //  控制左侧菜单收缩
  const sidebarOpened = ref(true)
  // 语言国际化
  const language = ref(getItem(LANG) || 'zh')

  // actions
  const triggerSidebarOpened = () => {
    sidebarOpened.value = !sidebarOpened.value
  }
  const setLanguage = (lang) => {
    setItem(LANG, lang)
    language.value = lang
  }
  return {
    sidebarOpened,
    triggerSidebarOpened,
    language,
    setLanguage
  }
})
