<template>
  <el-card>
    <el-row>
      <el-button @click="format">格式化代码</el-button>
    </el-row>
    <el-row class="code-wrapper" :gutter="20">
      <el-col :span="12">
        <h2>JSON</h2>
        <MonacoEditor
          type="json"
          ref="jsonEditor"
          class="monaco-editor monaco-editor_response"
          :value="code"
          :read-only="false"
          editor-id="code-editor"
          @input="codeChange"
        />
      </el-col>
      <el-col :span="12">
        <h2>Typescript</h2>
        <MonacoEditor
          ref="tsEditor"
          type="ts"
          class="monaco-editor monaco-editor_response"
          :value="tsCode"
          :read-only="true"
          editor-id="code-editor2"
        />
      </el-col>
    </el-row>
  </el-card>
</template>
<script setup>
import MonacoEditor from '@/components/Monaco'
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'

const tsEditor = ref()
const jsonEditor = ref()
const code = ref('{}')

const tsCode = ref('')

const JsonToTs = async (value) => {
  const { run } = await import('json_typegen_wasm')

  return run(
    'Root',
    value,
    JSON.stringify({
      output_mode: 'typescript'
    })
  )
}
const codeChange = async (codeStr) => {
  code.value = codeStr
  try {
    JSON.parse(codeStr)
    const ts = await JsonToTs(codeStr)
    tsCode.value = `${ts}`
    tsEditor.value.onOpen(tsCode.value, 'update')
  } catch (e) {
    console.log('error', e)
  }
}
const format = () => {
  try {
    JSON.parse(code.value)
    jsonEditor.value.onOpen(code.value, 'update')
  } catch (e) {
    ElMessage.error('JSON格式错误，请检查')
  }
}
onMounted(async () => {
  codeChange(code.value)
})
</script>
<style lang="scss" scoped></style>
