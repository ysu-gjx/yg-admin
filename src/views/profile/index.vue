<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <project-card :features="featureData" class="user-card" />
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
              <feature />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter">
              <chapter />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.author')" name="author">
              <author />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import ProjectCard from './components/ProjectCard.vue'
// eslint-disable-next-line no-unused-vars
import Feature from './components/Feature.vue'
import Chapter from './components/Chapter.vue'
import Author from './components/Author.vue'
// import { useI18n } from 'vue-i18n'
import { feature } from '@/api/user'
import { watchSwitchLang } from '@/utils/i18n'

const activeName = ref('feature')

// const { t } = useI18n()
const featureData = ref([])
// 获取功能数据
const getFeatureData = async () => {
  const res = await feature()
  featureData.value = res
}
getFeatureData()
watchSwitchLang(getFeatureData)
</script>
<style lang="scss" scoped>
.my-container {
  .user-card {
    margin-right: 20px;
  }
}
</style>
