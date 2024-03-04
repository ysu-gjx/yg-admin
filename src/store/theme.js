import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getItem, setItem } from '@/utils/storage'
import { MAIN_COLOR, DEFAULT_COLOR } from '@/constant'

export const useThemeStore = defineStore('theme', () => {
  // state
  const mainColor = ref(getItem(MAIN_COLOR) || DEFAULT_COLOR)

  // actions
  const setMainColor = (color) => {
    mainColor.value = color
    setItem(MAIN_COLOR, color)
  }

  return {
    mainColor,
    setMainColor
  }
})
