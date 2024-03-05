import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useThemeStore } from './theme'

export const useCssVarStore = defineStore('cssVar', () => {
  const themeStore = useThemeStore()
  const cssVar = computed(() => themeStore.theme)

  return {
    cssVar
  }
})
