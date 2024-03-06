<template>
  <el-card>
    <el-row style="align-items: center; margin-bottom: 12px">
      切换语言
      <el-select v-model="language" placeholder="Select" style="width: 240px">
        <el-option
          v-for="item in options"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-row>
    <Monaco v-model="code" :language="language" />
  </el-card>
</template>
<script setup>
import Monaco from '@/components/Monaco/indexVue.vue'
import { ref } from 'vue'

const code = ref('')
const language = ref('javascript')
const options = [
  'javascript',
  'typescript',
  'java',
  'html',
  'css',
  'cpp',
  'json'
]
</script>
<style lang="scss" scoped></style>
