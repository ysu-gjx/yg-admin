<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup>
import { computed } from 'vue'
import { useCommonStore, useThemeStore } from '@/store'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { DEFAULT_COLOR } from '@/constant'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'

const commonStore = useCommonStore()
const locale = computed(() => {
  return commonStore.language === 'zh' ? zhCn : en
})

const themeStore = useThemeStore()
const initTheme = async () => {
  if (themeStore.mainColor === DEFAULT_COLOR) return

  const newStyle = await generateNewStyle(themeStore.mainColor)
  writeNewStyle(newStyle)
}
initTheme()
</script>

<style scoped lang="scss"></style>
