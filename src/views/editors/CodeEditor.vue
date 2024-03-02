<template>
  <div>
    <MonacoEditor
      ref="responseMock"
      type="js"
      class="monaco-editor monaco-editor_response"
      :value="code"
      :read-only="false"
      editor-id="code-editor"
      @input="codeChange"
    />
  </div>
</template>
<script setup>
import MonacoEditor from '@/components/Monaco'
import { ref } from 'vue'

const code = ref(
  JSON.stringify({
    code: 2
  })
)
const codeChange = (e) => {
  console.log('e', e)
}
</script>
<style lang="scss" scoped></style>
