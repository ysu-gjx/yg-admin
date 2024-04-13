<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup>
import { computed } from 'vue'
import { useCommonStore, useThemeStore, useUserStore } from '@/store'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { DEFAULT_COLOR } from '@/constant'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
import { watchSwitchLang } from '@/utils/i18n'

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

/**
 * 监听 语言变化，重新获取个人信息
 */
const userStore = useUserStore()
watchSwitchLang(() => {
  if (userStore.token) {
    userStore.getUserInfoAction()
  }
})
</script>

<style scoped lang="scss"></style>
