<template>
  <el-timeline>
    <el-timeline-item
      v-for="item in chapterData"
      :key="item.id"
      :timestamp="item.timestamp"
      placement="top"
    >
      <el-card>
        <h4>{{ item.content }}</h4>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>
<script setup>
import { ref } from 'vue'
import { chapter } from '@/api/user'
import { watchSwitchLang } from '@/utils/i18n'

const chapterData = ref([])
const getChapterData = async () => {
  const res = await chapter()
  chapterData.value = res
}
getChapterData()
watchSwitchLang(getChapterData)
</script>
<style lang="scss" scoped></style>
