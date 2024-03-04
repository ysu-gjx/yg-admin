<template>
  <el-card>
    <el-button @click="handleOpen" style="margin-bottom: 10px"
      >测试命令式弹窗</el-button
    >
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
import MessageBox from './MessageBox'

const mdStr = ref('')

const handleChange = (str) => {
  mdStr.value = str
}

const handleOpen = () => {
  MessageBox(
    {
      type: 'warning',
      title: 'this is title',
      content: 'hello world'
    },
    () => {
      console.log('closed')
    }
  )
}
</script>
<style lang="scss" scoped></style>
