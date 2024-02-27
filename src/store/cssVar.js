import { defineStore } from 'pinia'
import { computed } from 'vue'
import variables from '@/styles/variables.module.scss'

export const useCssVarStore = defineStore('cssVar', () => {
  const cssVar = computed(() => variables)

  return {
    cssVar
  }
})
