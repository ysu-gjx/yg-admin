import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommonStore = defineStore('common', () => {
  const sidebarOpened = ref(true)

  // actions
  const triggerSidebarOpened = () => {
    sidebarOpened.value = !sidebarOpened.value
  }
  return {
    sidebarOpened,
    triggerSidebarOpened
  }
})
