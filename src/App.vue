<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup>
import { computed } from 'vue'
import { useCommonStore } from '@/store'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

const commonStore = useCommonStore()
const locale = computed(() => {
  return commonStore.language === 'zh' ? zhCn : en
})
</script>

<style scoped lang="scss"></style>
