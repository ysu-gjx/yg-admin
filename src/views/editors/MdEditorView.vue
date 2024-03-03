<template>
  <el-card>
    <MdEditor :value="mdStr" :handleChange="handleChange" />
    <el-row style="margin-top: 40px; width: 100%">
      <MdViewer :value="mdStr" />
    </el-row>
  </el-card>
</template>
<script setup>
import { ref } from 'vue'
import MdEditor from '@/components/ByteMD/MdEditor.vue'
import MdViewer from '@/components/ByteMD/MdViewer.vue'

const mdStr = ref('')

const handleChange = (str) => {
  mdStr.value = str
}
</script>
<style lang="scss" scoped></style>
