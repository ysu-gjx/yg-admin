import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getItem, setItem } from '@/utils/storage'
import { MAIN_COLOR, DEFAULT_COLOR } from '@/constant'
import variables from '@/styles/variables.module.scss'
import { generateColors } from '@/utils/theme'

export const useThemeStore = defineStore('theme', () => {
  // state
  const mainColor = ref(getItem(MAIN_COLOR) || DEFAULT_COLOR)
  // 改变自定义主题颜色
  const theme = ref({
    ...variables,
    ...generateColors(getItem(MAIN_COLOR))
  })

  // actions
  const setMainColor = (color) => {
    const newTheme = generateColors(color)
    theme.value = { ...theme.value, ...newTheme }
    mainColor.value = color
    setItem(MAIN_COLOR, color)
  }

  return {
    mainColor,
    setMainColor,
    theme
  }
})
