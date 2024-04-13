<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <div class="international-icon">
      <el-tooltip :effect="effect" :content="$t('msg.navBar.lang')">
        <svg-icon id="guide-lang" icon="language"></svg-icon>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh" :disabled="language === 'zh'"
          >中文</el-dropdown-item
        >
        <el-dropdown-item command="en" :disabled="language === 'en'">
          English
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCommonStore } from '@/store'
import { ElMessage } from 'element-plus'

const commonStore = useCommonStore()
const i18n = useI18n()
defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator: (val) => ['dark', 'light'].includes(val)
  }
})

const language = computed(() => commonStore.language)

const handleSetLanguage = (lang) => {
  i18n.locale.value = lang
  commonStore.setLanguage(lang)
  ElMessage.success(i18n.t('msg.toast.switchLangSuccess'))
}
</script>
<style lang="scss" scoped></style>
